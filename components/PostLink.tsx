import Link from "next/link";
import { ReactNode } from "react";

type PostLinkProps = {
    slug: string[]
    type: string,
    children?: ReactNode
}
const PostLink = ({ slug, type, children }: PostLinkProps) => {
    return <Link as={`/${type}/${slug.join('/')}`} href={`[type]/[...slug]`}>
        {children}
    </Link>
}
export default PostLink;