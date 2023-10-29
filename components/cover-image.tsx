import cn from 'classnames'
import PostLink from './PostLink'
import Image from 'next/legacy/image'
import customImageLoader from '../lib/image'


export default function CoverImage({ title, src, slug, height, width, type, className, responsive = true, rounded = true, prefetch }: CoverImageProps) {
  const image = (
    <Image 
      loader={src.startsWith('https')? customImageLoader: undefined}
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-sm', {
        'hover:shadow-md transition-shadow duration-200': slug,
      }, rounded ? "rounded-t-md md:rounded-none" : '',
        responsive ? "w-full h-auto " : 'max-w-full h-auto'
      )}
      layout={responsive ? 'responsive' : 'intrinsic'}
      width={width}
      height={height}
    />
  )
  return (
    <div className={`sm:mx-0 ${className}`}>
      {slug ? (
        <PostLink prefetch={prefetch} type={type} slug={slug} aria-label={title}>{image}</PostLink>
      ) : (
        image
      )}

    </div>
  )
}


type CoverImageProps = {
  title: string, src: string, slug?: string[], height: number, width: number, type: string, className?: string,
  responsive?: boolean
  rounded?: boolean
  prefetch?: boolean
}