import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getDataAPIByType } from '../lib/data-api'
import Head from 'next/head'
import { Description, Title } from '../lib/constants'
import { IItemData } from '../lib/FileFormat'
import { saveSiteMap } from '../components/sitemap'

type InDexProps = { allPosts: IItemData[], pages: IItemData[] }
const Index = ({ allPosts, pages }: InDexProps) => {
  const heroPosts = allPosts.filter(a => a.isHeroPost === true);
  const morePosts = allPosts.filter(a => a.isHeroPost !== true);

  return (
    <>
      <Layout>
        <Head>
          <title>{Title} - {Description}</title>
        </Head>
        <Container>
          <Intro pages={pages} search />
          {heroPosts.map(heroPost =>
            <HeroPost key={heroPost.slug}
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
              type={heroPost.type}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export default Index;
export async function getStaticProps() {

  const a = getDataAPIByType("posts").getAllItems([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'isHeroPost'
  ]);
  const b = getDataAPIByType('pages').getAllItems(['title', 'slug']);

  const [allPosts, pages] = await Promise.all([a, b]);

  await saveSiteMap([allPosts, pages]);

  return {
    props: { allPosts, pages },
  }
}
