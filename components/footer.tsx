import Container from './container'
import { EXAMPLE_PATH } from '../lib/constants'
import Link from 'next/link'

const external = <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
</svg>;
export default function Footer() {
  return (
    <footer className="bg-accent-1 dark:bg-gray-600 dark:border-gray-300 border-t border-accent-2">
      <Container>
        <div className="py-28 grid grid-rows-2 lg:grid-cols-2 items-center">
          <h3 className="text-4xl lg:text-3xl font-bold tracking-tighter leading-tight text-center grid-r lg:text-left mb-10 lg:mb-0 lg:pr-4">
            <span className="text-2xl">Created By</span> Shubhan Chemburkar.
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4">
            <a
              href="https://twitter.com/intent/tweet?screen_name=shubhan3009&ref_src=octocat.dev" data-size="large" data-dnt="true" data-show-count="false"
              className="bg-twitter group twitter-mention-button mx-3 hover:bg-white border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              <svg width={20} height={20} className="group-hover:text-twitter inline-block mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path fill="none" d="M0 0h72v72H0z" /><path className="icon" fill="currentColor" d="M68.812 15.14c-2.348 1.04-4.87 1.744-7.52 2.06 2.704-1.62 4.78-4.186 5.757-7.243-2.53 1.5-5.33 2.592-8.314 3.176C56.35 10.59 52.948 9 49.182 9c-7.23 0-13.092 5.86-13.092 13.093 0 1.026.118 2.02.338 2.98C25.543 24.527 15.9 19.318 9.44 11.396c-1.125 1.936-1.77 4.184-1.77 6.58 0 4.543 2.312 8.552 5.824 10.9-2.146-.07-4.165-.658-5.93-1.64-.002.056-.002.11-.002.163 0 6.345 4.513 11.638 10.504 12.84-1.1.298-2.256.457-3.45.457-.845 0-1.666-.078-2.464-.23 1.667 5.2 6.5 8.985 12.23 9.09-4.482 3.51-10.13 5.605-16.26 5.605-1.055 0-2.096-.06-3.122-.184 5.794 3.717 12.676 5.882 20.067 5.882 24.083 0 37.25-19.95 37.25-37.25 0-.565-.013-1.133-.038-1.693 2.558-1.847 4.778-4.15 6.532-6.774z" /></svg>
              <span className="group-hover:text-black">Tweet @me</span>
            </a>
            <a
              href={`${EXAMPLE_PATH}`}
              className="mx-3 font-bold hover:underline "
            >
              View Source on GitHub
            </a>
          </div>
          <div className='text-center lg:text-left my-4 flex  flex-col lg:flex-row  gap-4'>
            <Link href={"/"}><a className='hover:underline'>Home</a></Link>
            <Link href={"/pages/about"}><a className='hover:underline'>About</a></Link>
            <Link href={"https://www.buymeacoffee.com/shubhan"} ><a target={'_blank'} className='hover:underline'>Support with <i>Buy me a Coffee </i>{external}</a></Link></div>
        </div>
      </Container>
    </footer>
  )
}
