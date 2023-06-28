export type SearchResult = {
    title?: MarkedString[];
    date?: Date;
    slug: string[];
    excerpt?: MarkedString[];
    type: string;
};


type MarkedString = {
    text: string
    marked?: boolean
}