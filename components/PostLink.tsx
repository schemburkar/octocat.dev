import Link from "next/link";
import { ReactNode } from "react";

type PostLinkProps = {
    slug: string[]
    type: string,
    children?: ReactNode
    className?: string
    prefetch?: boolean
}
const PostLink = ({ slug, type, children, className, prefetch }: PostLinkProps) => {
    return <Link prefetch={prefetch} className={className} href={`/${encodeURIComponent(type)}/${slug.map(a => encodeURIComponent(a)).join('/')}`} >
        {children}
    </Link>
}
export default PostLink;