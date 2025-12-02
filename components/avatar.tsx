import Image from 'next/image'
import customImageLoader from '../lib/image';

type AvatarProps = {
  name?: string
  picture?: string
}
export default function Avatar({ name, picture }: AvatarProps) {
  if (!name || !picture) return null;

  return (
    <div className="flex items-center">
      <div className="w-8 h-8  rounded-full mr-4">
        <Image unoptimized loader={picture.startsWith('https') ? customImageLoader : undefined} src={picture} className="w-8 h-8 rounded-full" alt={name} width={48} height={48} /></div>
      <div className="text-md font-semibold">{name}</div>
    </div>
  )
}
