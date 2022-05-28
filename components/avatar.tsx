import Image from 'next/image'

type AvatarProps = {
  name: string
  picture: string
}
export default function Avatar({ name, picture }: AvatarProps) {
  return (
    <div className="flex items-center">
      <div className="w-12 h-12 rounded-full mr-4"><Image src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} width={48} height={48} /></div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  )
}
