import Link from 'next/link'
import { Title } from '../lib/constants'
import ThemeToggle from './themeToggle'
import SearchButton from './SearchButton'

export default function Header() {
  return (
    <>
      <div className="flex justify-between items-center mb-20 mt-5">
        <h2 className="text-2xl md:text-5xl font-bold tracking-tight md:tracking-tighter leading-tight flex-grow ">
          <Link href="/">
            <a className="hover:underline ">{Title}</a>
          </Link>
          .
        </h2>
        <SearchButton className={'hidden md:block'} />
        <ThemeToggle />
      </div>
    </>
  )
}
