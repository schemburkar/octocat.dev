import { ReactNode } from "react";

const FileFormat = {
  md: "md",
  json: "json",
};
export const ItemType = {
  posts: 'posts',
  pages: 'pages'
};
export type IItemData = {
  title?: string;
  date?: Date;

  slug?: string;
  author?: IItemAuthor;
  coverImage?: string;
  excerpt?: string;

  content?: string;
  type: string;
  isHeroPost?: boolean
};
type IItemAuthor = {
  name?: string;
  picture?: string;
};
export type ItemTypes = keyof typeof ItemType;
export type Fileformats = keyof typeof FileFormat;
export type Fields = keyof IItemData;


export type IItemDataForSearch = {
  title?:  string;
  date?: Date;
  slug?: string;
  excerpt?: string;
  type: string;
  search: {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string|null;
  }
};