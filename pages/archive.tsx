import Container from '../components/container'
import MoreStories from '../components/more-stories'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getDataAPIByType } from '../lib/data-api'
import Head from 'next/head'
import { ArchivePosts, Description, HOME_OG_IMAGE_URL, Title } from '../lib/constants'
import { IItemData } from '../lib/FileFormat'
import { Suspense } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

type PageProps = { allPosts: IItemData[], pages: IItemData[] }
const Index = ({ allPosts, pages }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const morePosts = allPosts.filter(a => a.isHeroPost !== true && a.isArchive === true);

  return (
    <Suspense fallback={null}>
      <Layout>
        <Head>
          <title>{Title} - {Description}</title>
          <meta property="og:image" content={HOME_OG_IMAGE_URL} />
        </Head>
        <Container compact>
          <Intro pages={pages} search />
          <section>
            {morePosts.length > 0 && <MoreStories title={ArchivePosts} posts={morePosts} />}
          </section>
        </Container>
      </Layout>
    </Suspense>
  )
}

export default Index;
export const getStaticProps: GetStaticProps<PageProps> = async () => {
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
  const b = getDataAPIByType('pages').getAllItems(['title', 'slug']);
  const [allPosts, pages] = await Promise.all([a, b]);
  return {
    props: { allPosts, pages },
  }
}
