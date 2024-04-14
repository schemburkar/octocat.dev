import { getDataAPIByType } from "../../../lib/data-api";
import { IItemData, IItemDataForSearch } from "../../../lib/FileFormat";

export const getSearchItems = async (): Promise<IItemDataForSearch[]> => {
    const a = getDataAPIByType("posts").getAllItems(['title', 'date', 'slug', 'excerpt']);
    const b = getDataAPIByType('pages').getAllItems(['title', 'date', 'slug', 'excerpt']);

    const [allPosts, pages] = await Promise.all([a, b]);

    const items = allPosts.concat(pages).map(mapSearchItem);
    return items;
};

const mapSearchItem = (item: IItemData): IItemDataForSearch => {
    const { title, excerpt, date, slug, type, content } = item;
    return ({
        title, excerpt, date, slug, type,
        search: {
            title: title?.toLowerCase(), slug: slug.join('/').toLowerCase(), excerpt: excerpt?.toLowerCase(),
            content: content ? content.toLowerCase() : null,
        }
    });
}