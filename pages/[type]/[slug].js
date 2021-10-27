import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getDataAPIByType } from '../../lib/data-api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { CMS_NAME, Description, Title } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import { rehype } from 'rehype'
import rehypeHighlight from 'rehype-highlight'

export default function Post({ post, morePosts, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview} >
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {post.title} | {Title} - {Description}
                </title>
                {post.ogImage && post.ogImage.url && <meta property="og:image" content={post.ogImage.url} />}
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
                type={post.type}
                slug={post.slug}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const post = await getDataAPIByType(params.type).getItemsBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  const parsedContent = await rehype()
    .data('settings', { fragment: true })
    .use(rehypeHighlight)
    .process(content)

  return {
    props: {
      post: {
        ...post,
        content: parsedContent.value,
      },
    },
  }
}

export async function getStaticPaths() {
  const [posts, pages] = await Promise.all([getDataAPIByType("posts").getAllItems(['slug']), getDataAPIByType("pages").getAllItems(['slug'])]);
  return {
    paths: posts.concat(pages).map((post) => {
      return {
        params: {
          slug: post.slug,
          type: post.type
        },
      }
    }),
    fallback: false,
  }
}
