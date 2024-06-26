import MoreStories from '../../../components/more-stories'
import HeroPost from '../../../components/hero-post'
import { getDataAPIByType } from '../../../lib/data-api'
import { ArchivePosts } from '../../../lib/constants'
import { IItemData, IItemDataForSearch } from '../../../lib/FileFormat'
import { saveSiteMap } from '../../../components/sitemap'
import { saveFeedXML, saveSearchData } from '../../../components/feed'
import Link from 'next/link'

type PageProps = { heroPosts: IItemData[], morePosts: IItemData[], archivePosts: number, pages: IItemData[] }
const Index = async () => {

    const { heroPosts, morePosts, archivePosts, pages } = await getStaticProps()
    return (<>
        <>
            <section>
                {heroPosts.map((heroPost, i) =>
                    <HeroPost key={i}
                        title={heroPost.title}
                        coverImage={heroPost.coverImage}
                        date={heroPost.date}
                        author={heroPost.author}
                        slug={heroPost.slug}
                        excerpt={heroPost.excerpt}
                        type={heroPost.type}
                        aspectRatio={heroPost.coverImageAspectRatio || (2 / 1)}
                    />
                )}
            </section>
            <section>
                {morePosts.length > 0 && <MoreStories title={''} posts={morePosts} />}
            </section>
            <section>
                <h2 className="md:inline-block md:mb-8 text-4xl md:text-6xl font-bold tracking-tighter leading-tight hover:underline">
                    <Link prefetch={false} href={'/archive'}>
                        {ArchivePosts}
                    </Link>

                </h2>
                <span className='block my-5 md:inline md:mx-5 md:my-0 hover:underline text-2xl'>
                    <Link prefetch={false}  href={'/archive'}>See all {archivePosts} posts from archive</Link></span>
            </section>
        </>
    </>
    )
}

export default Index;

const getStaticProps = async (): Promise<PageProps> => {

    const a = getDataAPIByType("posts").getAllItems([
        'title',
        'date',
        'slug',
        'author',
        'coverImage',
        'excerpt',
        'isHeroPost',
        'coverImageAspectRatio',
        'isArchive'
    ]);
    const b = getDataAPIByType('pages').getAllItems(['title', 'date', 'slug', 'excerpt']);

    const [allPosts, pages] = await Promise.all([a, b]);

    await saveSiteMap([allPosts, pages]);
    await saveFeedXML([allPosts, pages]);
    
    const heroPosts = allPosts.filter(a => a.isHeroPost === true && a.isArchive !== true);
    const morePosts = allPosts.filter(a => a.isHeroPost !== true && a.isArchive !== true);

    const archivePosts = allPosts.filter(a => a.isArchive === true).length;

    return {
        heroPosts, morePosts: [...orderPostsForDisplay(morePosts)], archivePosts, pages
    }
}


function* orderPostsForDisplay(posts: IItemData[]) {
    for (let index = 0; index < posts.length; index++) {
        const element = posts[index];
        if (index % 2 !== 0 && !posts[index].coverImage && index + 1 < posts.length) {
            yield posts[index + 1];
            index++;
        }
        yield element;
    }
}
