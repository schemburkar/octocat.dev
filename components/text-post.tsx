import Avatar from './avatar'
import DateFormatter from './date-formatter'
import Link from 'next/link'
import { IItemData } from '../lib/FileFormat'

const TextPost = ({
  title,
  date,
  excerpt,
  author,
  slug,
  type
}: IItemData) => {
  return (
    <article className="md:col-start-1 md:col-end-3 shadow-md md:shadow-none shadow-gray-200 dark:shadow-gray-800 rounded-md" >
      <h3 className=" md:mb-4 text-3xl lg:text-4xl leading-snug px-4 py-3 md:p-0">
        <Link as={`/${type}/${slug}`} href={`[type]/[slug]`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-32 px-4 py-3 md:p-0">
        <div>
          <div className="mb-4 text-lg">
            {date && <DateFormatter dateString={date} />}
          </div>
          <Avatar name={author?.name} picture={author?.picture} />
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>

        </div>
      </div>
    </article>
  )
}

export default TextPost;
