import { notFound } from "next/navigation";
import { rehype } from "rehype";
import rehypeHighlight from "rehype-highlight";
import { ArchiveBanner } from "./ArchiveBanner";
import PostBody from "./post-body";
import PostHeader from "./post-header";
import { getDataAPIByType } from "../lib/data-api";
import markdownToHtml from "../lib/markdownToHtml";
import { Metadata } from "next";
import { BaseUrl } from "../lib/baseUrl";
import { Description, Title } from "../lib/constants";

const Post = async ({ type, slug }: PostParams) => {
    if (!type || !slug) notFound();

    let post = await getDataAPIByType(type).getItemsBySlug(slug, [
        'title',
        'date',
        'slug',
        'author',
        'content',
        'ogImage',
        'coverImage',
        'coverImageAspectRatio',
        'isArchive',
        'excerpt'
    ])
    const content = await markdownToHtml(post.content || '', { anchorLinkClassName: 'link-anchor', clobberPrefix: '' })

    const parsedContent = await rehype()
        .data('settings', { fragment: true })
        .use(rehypeHighlight)
        .process(content)

    post = {
        ...post,
        content: typeof parsedContent.value === "string" ? parsedContent.value : "",
    };


    return <  >
        <article>
            <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
                type={post.type}
                slug={post.slug}
                aspectRatio={post.coverImageAspectRatio || (2 / 1)}
            />
            {post.isArchive && <ArchiveBanner />}
            <PostBody content={post.content || ''} />
        </article>
    </>
}

type PostParams = {
    type: "posts" | "pages"
    slug: string[]
}

export default Post;

export async function generateMetadataForPost({ type, slug }: PostParams): Promise<Metadata> {
    let post = await getDataAPIByType(type).getItemsBySlug(slug, [
        'title',
        'date',
        'slug',
        'author',
        'ogImage',
        'coverImage',
        'isArchive',
        'excerpt'
    ])
    const title = `${Title} - ${Description}`;
    const imageUrl = post && post.ogImage && post.ogImage.url ? new URL(post.ogImage.url, BaseUrl).toString() : '';

    const metadata: Metadata = {
        title: `${post.title} | ${Title} - ${Description}`,
        description: post.excerpt,
        openGraph: {
            type: "article",
            url: `${BaseUrl}/${encodeURIComponent(post.type)}/${post.slug.map(a => encodeURIComponent(a)).join('/')}`,
            title: `${post.title} | ${Title} - ${Description}`,
            description: post.excerpt,
            siteName: title,
            images: [{
                url: imageUrl,
            }],
            locale: 'en',
            publishedTime: post.date ? (typeof post.date === 'string' ? new Date(post.date) : post.date)?.toISOString() : undefined
        },


        twitter: {
            creator: '@shubhan3009',
            title: `${post.title} | ${Title} - ${Description}`,
            site: Title,
            card: "summary_large_image",
            images: imageUrl,
            description: post.excerpt,
        },

    }

    return metadata;
};