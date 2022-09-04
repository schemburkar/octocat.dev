import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostLink from './PostLink'
import { IItemData } from '../lib/FileFormat'

type PostPreviewProps = {
  post: IItemData
  classes?: string
}
const PostPreview = ({ post, classes }: PostPreviewProps) => {
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
    <article className={`shadow-md md:shadow-none shadow-gray-200 dark:shadow-gray-800 rounded-md ${classes || ''}`}>
      {coverImage && <div className="mb-5">
        <CoverImage
          slug={slug}
          title={title || ''}
          src={coverImage}
          height={278}
          width={556}
          type={type}
        />
      </div>}
      <h3 className="text-3xl mb-3 leading-snug px-4 md:p-0">
        <PostLink type={type} slug={slug}>
          <a className="hover:underline">{title}</a>
        </PostLink>
      </h3>
      <div className="text-lg mb-4  px-4 md:p-0">
        {date && <DateFormatter dateString={date} />}
      </div>
      <p className="text-lg leading-relaxed mb-4  px-4 md:p-0">{excerpt}</p>
      <div className=' px-4 py-3 md:px-0'>
        <Avatar name={author?.name} picture={author?.picture} />

      </div>
    </article>
  )
}

export default PostPreview;

