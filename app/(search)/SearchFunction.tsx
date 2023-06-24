import { IItemDataForSearch } from "../../lib/FileFormat"
import { SearchResult } from "./SearchResult";
import { readFile } from 'fs/promises'

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

const getItems = async (): Promise<IItemDataForSearch[]> => {
    const path = `${process.cwd()}/public/search.json`;
    return JSON.parse(await readFile(path, 'utf-8'));
}


