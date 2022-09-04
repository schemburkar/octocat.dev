import { readFile, readdir } from 'fs/promises'
import { join, sep } from 'path'
import matter from 'gray-matter'
import { Fileformats, ItemTypes, Fields, IItemData, ItemType } from './FileFormat'


type filepath = {
  name: string
  dir?: string
}

async function* readDirectory(path: string, parentPath?: string): AsyncGenerator<string[]> {
  const dirents = await readdir(path, { withFileTypes: true });
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      yield* readDirectory(join(path, dirent.name), dirent.name);
    } else {
      yield parentPath ? [parentPath, dirent.name] : [dirent.name];
    }
  }
}

export class DataAPI {
  path: string = '';
  directory: string;
  fileFormat: Fileformats;
  itemType: ItemTypes;

  constructor({ path, itemType = "posts", fileFormat = "md" }: { path: string; itemType?: ItemTypes; fileFormat?: Fileformats }) {
    this.path = path;
    this.directory = join(process.cwd(), path);
    this.fileFormat = fileFormat;
    this.itemType = itemType;
  }

  getSlugs = () => readDirectory(this.directory);

  getItemsBySlug = async (slugs: string[], fields: Fields[] = []) => {
    const regex = new RegExp(`[.]${this.fileFormat}$`);
    const paths = slugs.slice(0, slugs.length - 1);
    const [slug] = slugs.slice(slugs.length - 1);
    const realSlug = slug.replace(regex, '');
    const fullPath = join(this.directory, paths.join(sep), `${realSlug}.${this.fileFormat}`);
    const fileContents = await readFile(fullPath);
    const { data, content } = matter(fileContents)

    const items: IItemData = { type: ItemType[this.itemType] as any, slug: [] };

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
      if (field === 'slug') {
        items[field] = [...paths, realSlug]
      }
      if (field === 'content') {
        items[field] = content
      }

      if (typeof data[field] !== 'undefined') {
        //@ts-ignore
        items[field] = data[field]
      }
    })

    return items
  }

  getAllItems = async (fields: Fields[] = []) => {
    const slugs = await this.getSlugs()


    const posts = await getItems(slugs, (slug) => this.getItemsBySlug(slug, fields));

    //const posts = await Promise.all(promises);
    // sort posts by date in descending order
    return posts.sort((post1, post2) => (post1.date && post2.date && (post1.date > post2.date) ? -1 : 1))

  }
}

const getItems = async <T, V = T>(items: AsyncGenerator<T>, callback: (value: T) => Promise<V>): Promise<V[]> => {
  let result: V[] = [];
  for await (const value of items) {
    result.push(await callback(value));
  }
  return result;
}

const postsData = new DataAPI({ path: '_posts' });
const pagesData = new DataAPI({ path: '_pages', itemType: 'pages' });

export const getDataAPIByType = (type: ItemTypes) => {
  switch (type) {
    case "pages": return pagesData;
    case "posts": return postsData;
  }
}