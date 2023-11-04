
import { readFile, writeFile, mkdir, readdir } from 'fs/promises';
import path, { join } from 'path';
const saveStyles = async (themePath: string, prefix?: string, targetPath: string = '/styles') => {
    const target = path.join(process.cwd(), targetPath);
    const content = await readFile(path.join(process.cwd(), 'node_modules', themePath));

    const targetThemePath = path.join(target, themePath);
    await mkdir(path.dirname(targetThemePath), { recursive: true });

    const styleContent = prefix ? `.${prefix} {  ${content} }` : content;
    await writeFile(targetThemePath, styleContent, { encoding: 'utf-8', flag: 'w+' });
};

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


export const savePage = async (type: string, slug: string[]) => {
    const dir = `${process.cwd()}/app/(base)/(home)/(posts)/${type}/${slug.join('/')}`;
    await mkdir(dir, { recursive: true });
    const filePath = `${dir}/page.tsx`;
    await writeFile(filePath, `
import Post, { generateMetadataForPost} from "@components/PostPage";
import { Metadata } from "next";

export const viewport = {
    themeColor: '#000',
}

const Page = ()=>{
    return <Post  slug={[${slug.map(s => `'${s}'`).join(',')}]} type={'${type}'}  />
} 
export default Page;

export async function generateMetadata(): Promise<Metadata> { return generateMetadataForPost({type: '${type}',slug:  [${slug.map(s => `'${s}'`).join(',')}]})};

type PostParams = {
    params: {
        type: "posts" | "pages"
        slug: string[]
    }
}`, "utf8");
}


const savePostPage = async () => {
    let slugs = await readDirectory("_posts");
    const regex = new RegExp(`[.]md$`);

    for await (const slug of slugs) {
        const realSlugs = slug.map(a => a.replace(regex, ''));
        await savePage("posts", realSlugs);
    }

    slugs = await readDirectory("_pages");

    for await (const slug of slugs) {
        const realSlugs = slug.map(a => a.replace(regex, ''));
        await savePage("pages", realSlugs);
    }
}

await saveStyles('highlight.js/scss/github.scss');
await saveStyles('highlight.js/scss/github-dark.scss', 'dark');
await savePostPage();