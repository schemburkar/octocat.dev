import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import { useScreenHeight } from './useScreenHeight'
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
  const size = useScreenHeight(aspectRatio);
  return (
    <article className='shadow-md shadow-gray-200 dark:shadow-gray-800 md:shadow-none  mb-10 md:mb-0 rounded-md'>
      <header className="mb-8 md:mb-16">
        {coverImage && <CoverImage
          title={title || ''}
          src={coverImage}
          slug={slug || ''}
          height={size.height}
          width={size.width}
          type={type}
          responsive={false} className={'text-center'}
        />}
      </header>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-5 md:mb-28 px-4 pb-4 md:p-0">
        <span>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link as={`/${type}/${slug}`} href={`[type]/[slug]`}>
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date} />
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