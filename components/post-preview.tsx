import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostLink from './PostLink'
import { IItemData } from '../lib/FileFormat'

type PostPreviewProps = {
  post: IItemData
  classes?: string
  prefetch?:boolean
}
const PostPreview = ({ post, classes, prefetch }: PostPreviewProps) => {
  const {
    title,
    coverImage,
    date,
    excerpt,
    author,
    slug,
    type,
  } = post;
  return (
    <article className={` shadow-md md:shadow-none dark:shadow-none dark:bg-[#050505] md:bg-transparent dark:md:bg-transparent rounded-md ${classes || ''}`}>
      {coverImage && <div className="mb-5">
        <CoverImage prefetch={prefetch}
          slug={slug}
          title={title || ''}
          src={coverImage}
          height={278}
          width={556}
          type={type}
        />
      </div>}
      <h3 className="text-2xl mb-3 leading-snug px-4 md:p-0">
        <PostLink prefetch={prefetch} type={type} slug={slug} className="hover:underline">{title}</PostLink>
      </h3>
      <div className="text-sm mb-4  px-4 md:p-0">
        {date && <DateFormatter dateString={date} />}
      </div>
      <p className="text-md leading-relaxed mb-4  px-4 md:p-0">{excerpt}</p>
      <div className=' px-4 py-1 md:px-0'>
        <Avatar name={author?.name} picture={author?.picture} />

      </div>
    </article>
  )
}

export default PostPreview;

