import { ReactNode } from "react";

const PostTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="text-6xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
      {children}
    </h1>
  )
}
export default PostTitle;