import Link from 'next/link'
import { ReactNode } from 'react'
import { Description, Title } from '../lib/constants'
import ThemeToggle from './themeToggle'

export default function Header({ children }:HeaderProps) {
  return (
    <>
      <div className="grid grid-cols-[1fr_auto_auto] grid-rows-2 justify-between items-center mb-20 mt-5">
        <h2 className="text-2xl md:text-5xl font-bold tracking-tight md:tracking-tighter leading-tight flex-grow ">
          <Link href="/" className="hover:underline ">{Title}</Link>
          .
        </h2>

        {children || <span></span>}
        <ThemeToggle />
        <span className='self-baseline mt-1'>{Description}</span>
        <span className='col-span-2 text-right self-baseline'><Link className="underline hover:text-success hover:duration-500 hover:transition-colors" href={'/pages/about'}>About</Link></span>
      </div>
    </>
  )
}

type HeaderProps = {
  children?: ReactNode
}