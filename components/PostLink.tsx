import Link from "next/link";
import { ReactNode } from "react";

type PostLinkProps = {
    slug: string[]
    type: string,
    children?: ReactNode
    className?: string
}
const PostLink = ({ slug, type, children, className }: PostLinkProps) => {
    return <Link className={className} as={`/${encodeURIComponent(type)}/${slug.map(a => encodeURIComponent(a)).join('/')}`} href={`[type]/[...slug]`}>
        {children}
    </Link>
}
export default PostLink;