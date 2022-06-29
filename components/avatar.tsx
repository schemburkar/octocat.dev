import Image from 'next/image'

type AvatarProps = {
  name?: string
  picture?: string
}
export default function Avatar({ name, picture }: AvatarProps) {
  if (!name || !picture) return null;
  
  return (
    <div className="flex items-center">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-4"><Image src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} width={48} height={48} /></div>
      <div className="text-lg md:text-xl font-bold">{name}</div>
    </div>
  )
}
