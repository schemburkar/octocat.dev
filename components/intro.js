import Link from 'next/link'
import { Description, Title } from '../lib/constants'
import ThemeToggle from './themeToggle'
export default function Intro({ pages }) {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-10 mb-10 md:mb-10">
      <h1 className="text-6xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
        {Title}.
      </h1>
      <div className="flex items-center mt-5 md:mt-0 md:pl-8 " >
      <h4 className="text-center md:text-left text-lg  pr-8 ">
        {Description}{' '}
        {pages.map(page => <Link key={page.slug} as={`/${page.type}/${page.slug}`} href={`[type]/[slug]`}>
          <a className="underline hover:text-success hover:duration-500 hover:transition-colors">{page.title}</a>
        </Link>)}
      </h4>
      <ThemeToggle />
      </div>
    </section>
  )
}
