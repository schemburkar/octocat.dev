import PostPreview from './post-preview'
import TextPost from './text-post'
import { MorePosts } from '../lib/constants'
import { IItemData } from '../lib/FileFormat'

export default function MoreStories({ posts }: MoreStoriesProps) {
  return (
    <>
      <h2 className="mb-8 text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
        {MorePosts}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-10 md:gap-y-16 mb-32">
        {posts.map((post, i) => (

          post.coverImage ?
            <PostPreview
              key={i}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
              type={post.type}
            />
            :
            <TextPost key={i}
              title={post.title}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
              type={post.type} />
        ))}
      </div>
    </>
  )
}

type MoreStoriesProps = { posts: IItemData[] }
