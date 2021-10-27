import Link from 'next/link'
import { Description, Title } from '../lib/constants'

export default function Intro({ pages }) {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-10 mb-10 md:mb-10">
      <h1 className="text-6xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8">
        {Title}
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        {Description}{' '}
        {pages.map(page => <Link key={page.slug} as={`/${page.type}/${page.slug}`} href={`[type]/[slug]`}>
          <a className="underline hover:text-success duration-200 transition-colors">{page.title}</a>
        </Link>)}
      </h4>
    </section>
  )
}


