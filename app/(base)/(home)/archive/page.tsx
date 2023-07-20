import MoreStories from '../../../../components/more-stories'
import { getDataAPIByType } from '../../../../lib/data-api'
import { ArchivePosts } from '../../../../lib/constants'
import { IItemData } from '../../../../lib/FileFormat'

type PageProps = { archivePosts: IItemData[] }
const Index = async () => {

    const { archivePosts } = await getStaticProps()
    return (<>
        <>
            <section>
                {archivePosts.length > 0 && <MoreStories title={ArchivePosts} posts={archivePosts} />}
            </section>
            
        </>
    </>
    )
}

export default Index;

const getStaticProps = async (): Promise<PageProps> => {

    const allPosts = await getDataAPIByType("posts").getAllItems([
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
    const archivePosts = allPosts.filter(a => a.isArchive === true);

    return {
        archivePosts
    }
}

