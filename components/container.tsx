import { ReactNode } from "react"

type ContainerProps = { children?: ReactNode, compact?: boolean };
export default function Container({ children, compact = false }: ContainerProps) {
  return <div className={`container mx-auto ${!compact ? 'px-5' : ' px-2 lg:px-5'}`}>{children}</div>
}
