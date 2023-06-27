import { IItemDataForSearch } from "../../lib/FileFormat";
import { readFile } from 'fs/promises';

export const getSearchItems = async (): Promise<IItemDataForSearch[]> => {
    const path = `${process.cwd()}/public/search.json`;
    return JSON.parse(await readFile(path, 'utf-8'));
};
