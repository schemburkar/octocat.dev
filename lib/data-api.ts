import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { Fileformats, ItemTypes, Fields, IItemData, ItemType } from './FileFormat'

const readFile = (path: string) => {
  const promise = new Promise<string>((resolve, reject) =>
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    })
  )
  return promise;
}


const readDirectory = (path: string) => {
  const promise = new Promise<string[]>((resolve, reject) =>
    fs.readdir(path, (err, files) => {
      if (err) reject(err);
      else resolve(files);
    })
  )
  return promise;
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

  getItemsBySlug = async (slug: string, fields: Fields[] = []) => {
    const regex = new RegExp(`\.${this.fileFormat}$`);
    const realSlug = slug.replace(regex, '')
    const fullPath = join(this.directory, `${realSlug}.${this.fileFormat}`);
    const fileContents = await readFile(fullPath);
    const { data, content } = matter(fileContents)

    const items: IItemData = { type: ItemType[this.itemType] }

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
      if (field === 'slug') {
        items[field] = realSlug
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

    const promises = slugs
      .map((slug) => this.getItemsBySlug(slug, fields));

    const posts = await Promise.all(promises);
    // sort posts by date in descending order
    return posts.sort((post1, post2) =>  (post1.date  && post2.date  && (post1.date > post2.date) ? -1 : 1))

  }
}


const postsData = new DataAPI({ path: '_posts' });
const pagesData = new DataAPI({ path: '_pages', itemType: 'pages' });

export const getDataAPIByType = (type: ItemTypes) => {
  switch (type) {
    case "pages": return pagesData;
    case "posts": return postsData;
  }
}