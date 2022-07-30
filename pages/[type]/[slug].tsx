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
import { Suspense } from 'react'
import { IItemData, ItemTypes } from '../../lib/FileFormat'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'

type InferStaticPathsProps<T> = T extends GetStaticPaths<infer P> ? (P extends ParsedUrlQuery & infer ResultType ? ResultType : never) : never;


const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  if (!post || (!router.isFallback && !post?.slug)) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout  >
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <Suspense fallback={null}>
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
                aspectRatio={post.coverImageAspectRatio || (2 / 1)}
              />
              <PostBody content={post.content || ''} />
            </article>
          </Suspense>
        )}
      </Container>
    </Layout>
  )
}


export const getStaticProps: GetStaticProps<{ post?: IItemData }, InferStaticPathsProps<typeof getStaticPaths>> = async ({ params }) => {
  if (!params || !params.type || !params.slug) return { notFound: true };
  let post = await getDataAPIByType(params.type).getItemsBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
    'coverImageAspectRatio'
  ])
  const content = await markdownToHtml(post.content || '')

  const parsedContent = await rehype()
    .data('settings', { fragment: true })
    .use(rehypeHighlight)
    .process(content)

  post = {
    ...post,
    content: typeof parsedContent.value === "string" ? parsedContent.value : "",
  };

  return {
    props: { post },
  }
}

export const getStaticPaths: GetStaticPaths<ParsedUrlQuery & { slug?: string, type?: ItemTypes }> = async () => {
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
export default Post;