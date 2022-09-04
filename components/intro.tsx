import Link from 'next/link'
import PostLink from './PostLink'
import { Description, Title } from '../lib/constants'
import ThemeToggle from './themeToggle'
import SearchButton from './SearchButton'
import { IItemData } from '../lib/FileFormat'


export default function Intro({ pages, search = false }: IntroProps) {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-5 mb-10 md:mb-10">


      <Link href="/">
        <a className="hover:underline "> <h1 className="text-6xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
          {Title}.
        </h1></a>
      </Link>

      {search && <SearchButton className={"md:hidden"} />}
      <div className="flex items-center mt-5 md:mt-0 md:pl-8 " >
        {search && <SearchButton className={"hidden md:block"} />}
        <h4 className="text-center md:text-left text-lg  pr-8 ">
          {Description}{' '}
          {pages.map((page, i) => <PostLink key={i} type={page.type} slug={page.slug} >
            <a className="underline hover:text-success hover:duration-500 hover:transition-colors">{page.title}</a>
          </PostLink>)}
        </h4>
        <ThemeToggle />
      </div>
    </section>
  )
}

type IntroProps = { pages: IItemData[], search?: boolean }