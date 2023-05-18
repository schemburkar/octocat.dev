'use server'
import { getDataAPIByType } from "../../lib/data-api"
import { IItemData, IItemDataForSearch } from "../../lib/FileFormat"
import { SearchResult } from "./SearchResult";

const search = async (searchText: string): Promise<SearchResult[]> => {

    const allItems: IItemDataForSearch[] = await getItems();
    const escapeRegExp = searchText.toLowerCase().trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escapeRegExp})`, 'i')
    const filterItems = allItems.filter(item =>
        (item.search.title?.indexOf(searchText) || -1) >= 0 ||
        (item.search.slug?.indexOf(searchText) || -1) >= 0 ||
        (item.search.excerpt?.indexOf(searchText) || -1) >= 0 ||
        (item.search.content?.indexOf(searchText) || -1) >= 0
    ).map(item => {
        const title = item.title?.split(regex).filter(String).map((part: string, i: number) => regex.test(part) ? { text: part, marked: true } : { text: part })
        const excerpt = item.excerpt?.split(regex).filter(String).map((part: string, i: number) => regex.test(part) ? { text: part, marked: true } : { text: part })

        const { slug, date, type } = item
        return { title, excerpt, slug, date, type }
    })
    return filterItems;
}

export default search;

const getItems = async () => {

    const a = getDataAPIByType("posts").getAllItems([
        'title',
        'date',
        'slug',
        'excerpt'
    ]);
    const b = getDataAPIByType('pages').getAllItems(['title', 'date', 'slug', 'excerpt']);

    const [allPosts, pages] = await Promise.all([a, b]);

    const items = allPosts.concat(pages).map(mapItem);

    return items;
}

const mapItem = (item: IItemData): IItemDataForSearch => {
    const { title, excerpt, date, slug, type, content } = item;
    return ({
        title, excerpt, date, slug, type,
        search: {
            title: title?.toLowerCase(), slug: slug.join('/').toLowerCase(), excerpt: excerpt?.toLowerCase(),
            content: content ? content.toLowerCase() : null,
        }
    });
}


