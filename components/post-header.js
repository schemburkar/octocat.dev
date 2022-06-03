import Avatar from '../components/avatar'
import DateFormatter from '../components/date-formatter'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'
import Link from 'next/link'

export default function PostHeader({ title, coverImage, date, author, type, slug, aspectRatio = 2 / 1 }) {
  return (
    <>
      <PostTitle>
        <Link as={`/${type}/${slug}`} href={`[slug]`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </PostTitle>

      <div className=" mx-auto  ">
        <div className="block  mb-6">
          {author && author.name && <Avatar name={author.name} picture={author.picture} />}
        </div>
        <div className="mb-6 text-lg self-end">
          {date && <DateFormatter dateString={date} />}
        </div>
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        {coverImage &&
          <CoverImage title={title} src={coverImage} height={1240 / aspectRatio} width={1240} />
        }
      </div>
    </>
  )
}
