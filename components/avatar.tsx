import Image from 'next/legacy/image'
import customImageLoader from '../lib/image';

type AvatarProps = {
  name?: string
  picture?: string
}
export default function Avatar({ name, picture }: AvatarProps) {
  if (!name || !picture) return null;
  
  return (
    <div className="flex items-center">
      <div className="w-8 h-8  rounded-full mr-4"><Image loader={picture.startsWith('https')? customImageLoader: undefined} src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} width={48} height={48} /></div>
      <div className="text-lg  font-semibold">{name}</div>
    </div>
  )
}
