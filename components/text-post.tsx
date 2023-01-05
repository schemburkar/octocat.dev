import Avatar from './avatar'
import DateFormatter from './date-formatter'
import PostLink from './PostLink'
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
      <div className="md:grid md:grid-cols-1 md:gap-x-16 lg:gap-x-32 md:my-4 px-4 py-4 md:p-0">
        <span>
          <h3 className="mb-4 text-2xl leading-snug">
            <PostLink type={type} slug={slug} className="hover:underline">{title}</PostLink>
          </h3>
          <div className="mb-4 text-lg">
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

export default TextPost;
