import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'


export default function CoverImage({ title, src, slug, height, width, type, className, responsive = true }: CoverImageProps) {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-sm', {
        'hover:shadow-md transition-shadow duration-200': slug,
      }, "rounded-t-md md:rounded-none")}
      layout={responsive ? "responsive" : "intrinsic"}
      width={width}
      height={height}
    />
  )
  return (
    <div className={`sm:mx-0 ${className}`}>
      {slug ? (
        <Link as={`/${type}/${slug}`} href={`[type]/[slug]`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}

    </div>
  )
}


type CoverImageProps = {
  title: string, src: string, slug?: string, height: number, width: number, type?: string, className?: string, responsive?: boolean
}