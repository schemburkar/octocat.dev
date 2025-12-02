import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './CoverImage'
import PostLink from './PostLink'
import { IItemData } from '../lib/FileFormat'

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  type,
  aspectRatio = 2 / 1
}: HeroPostProps) {
  return (
    <article className='shadow-md shadow-gray-200 dark:shadow-gray-800 md:shadow-none  mb-10 md:mb-0 rounded-md'>
      <header className="mb-8 md:mb-14">
        {coverImage && <CoverImage prefetch
          title={title || ''}
          src={coverImage}
          slug={slug || ''}
          aspectRatio={aspectRatio}
          type={type}
          responsive={false} className={'text-center'}
        />}
      </header>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-5 md:mb-28 px-4 pb-4 md:p-0">
        <span>
          <h3 className="mb-4 text-3xl lg:text-5xl leading-tight">
            <PostLink type={type} slug={slug} className="hover:underline">{title}</PostLink>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            {date && <DateFormatter dateString={date} />}
          </div>
        </span>
        {author && <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </div>}
      </div>
    </article>
  )
}

type HeroPostProps = IItemData & {
  aspectRatio?: number
}