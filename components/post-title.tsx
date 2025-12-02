import { ReactNode } from "react";

const PostTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="text-6xl font-bold tracking-tighter leading-tight md:leading-none mb-8 text-center md:text-left">
      {children}
    </h1>
  )
}
export default PostTitle;