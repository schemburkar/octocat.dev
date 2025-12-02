import Container from './container'
import { GitHubProfile } from '../lib/constants'
import Link from 'next/link'

const external = <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
</svg>;
export default function Footer() {
  return (
    <footer className="bg-accent-1 dark:bg-gray-600 dark:border-gray-300 border-t border-accent-2">
      <Container>

        <section className="grid gap-y-2 py-28 lg:grid-cols-2">
          <h3 className="text-4xl lg:text-3xl font-bold tracking-tighter leading-tight text-center grid-r lg:text-left mb-10 lg:mb-0 lg:pr-4">
            <span className="text-2xl">Created By</span> Shubhan Chemburkar.
          </h3>

          <div className="grid gap-4 lg:grid-cols-4 justify-center  content-center row-span-3 h-full col-start-1 lg:col-start-2 lg:max-w-fit">
            <a href={`${GitHubProfile}`} className=" font-bold bg-gray-800 text-white hover:bg-white border border-black group duration-200 transition-colors  p-2 self-stretch rounded-md" >
              <svg viewBox="0 0 24 24" aria-hidden="true" height={20} className="h- w-6 fill-white group-hover:fill-slate-900 inline-block m-1"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"></path></svg>
              <span className="group-hover:text-black break-words">@schemburkar on GitHub</span>
            </a>
            <a
              href="https://twitter.com/intent/tweet?screen_name=shubhan3009&ref_src=octocat.dev" data-size="large" data-dnt="true" data-show-count="false"
              className="font-bold bg-twitter group  text-white hover:bg-white  border  border-black  duration-200 transition-colors  p-2 self-stretch rounded-md" >
              <svg width={20} height={20} className="group-hover:text-twitter inline-block mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path fill="none" d="M0 0h72v72H0z" /><path className="icon" fill="currentColor" d="M68.812 15.14c-2.348 1.04-4.87 1.744-7.52 2.06 2.704-1.62 4.78-4.186 5.757-7.243-2.53 1.5-5.33 2.592-8.314 3.176C56.35 10.59 52.948 9 49.182 9c-7.23 0-13.092 5.86-13.092 13.093 0 1.026.118 2.02.338 2.98C25.543 24.527 15.9 19.318 9.44 11.396c-1.125 1.936-1.77 4.184-1.77 6.58 0 4.543 2.312 8.552 5.824 10.9-2.146-.07-4.165-.658-5.93-1.64-.002.056-.002.11-.002.163 0 6.345 4.513 11.638 10.504 12.84-1.1.298-2.256.457-3.45.457-.845 0-1.666-.078-2.464-.23 1.667 5.2 6.5 8.985 12.23 9.09-4.482 3.51-10.13 5.605-16.26 5.605-1.055 0-2.096-.06-3.122-.184 5.794 3.717 12.676 5.882 20.067 5.882 24.083 0 37.25-19.95 37.25-37.25 0-.565-.013-1.133-.038-1.693 2.558-1.847 4.778-4.15 6.532-6.774z" /></svg>
              <span className="group-hover:text-black  text-sm  break-words">@shubhan3009 on Twitter</span>
            </a>
            <a href='https://in.linkedin.com/in/shubhanchemburkar' className='font-bold bg-[#0a66c2] group text-white  hover:bg-white border border-black  duration-200 transition-colors  p-2 self-stretch rounded-md'>
              <svg xmlns="http://www.w3.org/2000/svg" className='text-white group-hover:text-[#0a66c2] inline-block mr-2' id="Group_1282" data-name="Group 1282" width="20" viewBox="0 0 76.624 65.326">
                <path id="Path_2525" data-name="Path 2525" d="M1165,274.515a1.2,1.2,0,0,0,1.21-1.269c0-.9-.543-1.33-1.657-1.33h-1.8v4.712h.677v-2.054h.832l.019.025,1.291,2.029h.724l-1.389-2.1Zm-.783-.472h-.785V272.45h.995c.514,0,1.1.084,1.1.757,0,.774-.593.836-1.314.836" transform="translate(-1092.136 -213.406)" fill="currentcolor" />
                <path id="Path_2520" data-name="Path 2520" d="M958.98,112.559h-9.6V97.525c0-3.585-.064-8.2-4.993-8.2-5,0-5.765,3.906-5.765,7.939v15.294h-9.6V81.642h9.216v4.225h.129a10.1,10.1,0,0,1,9.093-4.994c9.73,0,11.524,6.4,11.524,14.726ZM918.19,77.416a5.571,5.571,0,1,1,5.57-5.572,5.571,5.571,0,0,1-5.57,5.572m4.8,35.143h-9.61V81.642h9.61Zm40.776-55.2h-55.21a4.728,4.728,0,0,0-4.781,4.67v55.439a4.731,4.731,0,0,0,4.781,4.675h55.21a4.741,4.741,0,0,0,4.8-4.675V62.025a4.738,4.738,0,0,0-4.8-4.67" transform="translate(-903.776 -57.355)" fill="currentcolor" />
                <path id="Path_2526" data-name="Path 2526" d="M1156.525,264.22a4.418,4.418,0,1,0,.085,0h-.085m0,8.33a3.874,3.874,0,1,1,3.809-3.938c0,.022,0,.043,0,.065a3.791,3.791,0,0,1-3.708,3.871h-.1" transform="translate(-1084.362 -207.809)" fill="#0a66c2" />
              </svg>
              <span className="group-hover:text-black  text-sm  break-words">Shubhan Chemburkar on LinkedIn</span>
            </a>
            <a className='font-bold bg-black group text-white  hover:bg-white border border-black duration-200 transition-colors  p-2 self-stretch rounded-md' rel='me' href={"https://threads.com/@shubhanchemburkar"}>
              <svg xmlns="http://www.w3.org/2000/svg" aria-label="Threads" viewBox="0 0 192 192"  width={20} height={20} className="group-hover:fill-purple-800 w-6 fill-gray-200 inline-block m-1" ><path  d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"/></svg>
              <span className="group-hover:text-black text-xs break-words">@shubhanchemburkar on Threads</span></a>

          </div>
          <div className='text-center lg:text-left my-4 flex  flex-col lg:flex-row  gap-4  '>
            <Link prefetch={false} href={"/"} className='hover:underline'>Home</Link>
            <Link href={"/pages/about"} className='hover:underline'>About</Link>
            <Link href={"https://www.buymeacoffee.com/shubhan"} target={'_blank'} className='hover:underline'>Support with <i>Buy me a Coffee </i>{external}</Link>

          </div>
          <div className='text-center lg:text-left my-4 flex  flex-col lg:flex-row  gap-4 '>
            <Link prefetch={false} href={"/search"} className='hover:underline'>Search</Link>
            <Link prefetch={false} href={"/feed.xml"} rel="alternate" type={"application/rss+xml"} className='hover:underline'>RSS</Link>
            <Link prefetch={false} href={"/sitemap.xml"} className='hover:underline'>Sitemap</Link>
          </div>
        </section>
      </Container>
    </footer>
  )
}
