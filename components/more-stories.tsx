import PostPreview from './post-preview'
import TextPost from './text-post'
import { IItemData } from '../lib/FileFormat'

// const mapGrid = (items: IItemData[], renderer: (item: IItemData, index: number, span: boolean) => JSX.Element) => {
//   let counter = 0;
//   return items.map((p, index, posts) => {
//     if (!p.coverImage) counter = -1;
//     const span = counter % 2 == 0 && (index + 1 == posts.length || !posts[index + 1].coverImage);
//     if (span) counter = -1;

//     counter++;
//     return renderer(p, index, span);
//   });
// };



export default function MoreStories({ posts, title }: MoreStoriesProps) {
  return (
    <>
      <h2 className="mb-8 text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-20 xl:gap-x-32 gap-y-10 md:gap-y-[5rem] mb-32">

        {posts.map((post, i) => (

          (post.coverImage) ?
            <PostPreview
              key={i}
              post={post}
              prefetch={i<=2}
            />
            :
            <TextPost key={i}
              title={post.title}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
              type={post.type}
              prefetch={i<=2}
            />
        ))}
      </div>
    </>
  )
}

type MoreStoriesProps = { posts: IItemData[], title: string }
