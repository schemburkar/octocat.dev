import Avatar from '../components/avatar'
import DateFormatter from '../components/date-formatter'
import CoverImage from '../components/CoverImage'
import PostTitle from '../components/post-title'
import PostLink from './PostLink'
import { IItemData } from '../lib/FileFormat'

export default function PostHeader({ title, coverImage, date, author, type, slug, aspectRatio = 2 / 1 }: PostHeaderProps) {
  return (
    <>
      <PostTitle>
        <PostLink type={type} slug={slug} className="hover:underline">{title}</PostLink>
      </PostTitle>

      <div className=" mx-auto flex  mb-6 items-center">
        <div className="block flex-grow">
          {author && author.name && <Avatar name={author.name} picture={author.picture} />}
        </div>
        <div className="text-md">
          {date && <DateFormatter dateString={date} />}
        </div>
      </div>
      <div className="mb-8 md:mb-16 max-w-5xl m-auto">
        {coverImage &&
          <CoverImage rounded={false} title={title || ''} src={coverImage}  type={type}
           aspectRatio={aspectRatio} maxHeight={0.85} responsive={false} className={'text-center'} />
        }
      </div>
    </>
  )
}

type PostHeaderProps = IItemData & {
  aspectRatio?: number
}