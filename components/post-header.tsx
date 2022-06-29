import Avatar from '../components/avatar'
import DateFormatter from '../components/date-formatter'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'
import Link from 'next/link'
import { useScreenHeight } from './useScreenHeight'
import { IItemData } from '../lib/FileFormat'

export default function PostHeader({ title, coverImage, date, author, type, slug, aspectRatio = 2 / 1 }: PostHeaderProps) {
  const size = useScreenHeight(aspectRatio, 0.85);
  return (
    <>
      <PostTitle>
        <Link as={`/${type}/${slug}`} href={`[slug]`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </PostTitle>

      <div className=" mx-auto flex  mb-6 items-center">
        <div className="block flex-grow">
          {author && author.name && <Avatar name={author.name} picture={author.picture} />}
        </div>
        <div className="text-lg">
          {date && <DateFormatter dateString={date} />}
        </div>
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        {coverImage &&
          <CoverImage title={title || ''} src={coverImage} height={size.height}
            width={size.width} responsive={false} className={'text-center'} />
        }
      </div>
    </>
  )
}

type PostHeaderProps = IItemData & {
  aspectRatio?: number
}