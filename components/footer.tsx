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
        <div className="py-28 grid grid-rows-2 lg:grid-flow-col items-center">
          <h3 className="text-4xl lg:text-3xl font-bold tracking-tighter leading-tight text-center grid-r lg:text-left mb-10 lg:mb-0 lg:pr-4">
            <span className="text-2xl">Created By</span> Shubhan Chemburkar.
          </h3>
          <div className='text-center lg:text-left my-4 flex  flex-col lg:flex-row  gap-4'>
            <Link href={"/"}><a className='hover:underline'>Home</a></Link>
            <Link href={"/pages/about"}><a className='hover:underline'>About</a></Link>
            <Link href={"https://www.buymeacoffee.com/shubhan"} ><a target={'_blank'} className='hover:underline'>Support with <i>Buy me a Coffee </i>{external}</a></Link>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4">
            <a
              href="https://twitter.com/intent/tweet?screen_name=shubhan3009&ref_src=octocat.dev" data-size="large" data-dnt="true" data-show-count="false"
              className="bg-twitter group twitter-mention-button mx-3 hover:bg-white border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              <svg width={20} height={20} className="group-hover:text-twitter inline-block mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path fill="none" d="M0 0h72v72H0z" /><path className="icon" fill="currentColor" d="M68.812 15.14c-2.348 1.04-4.87 1.744-7.52 2.06 2.704-1.62 4.78-4.186 5.757-7.243-2.53 1.5-5.33 2.592-8.314 3.176C56.35 10.59 52.948 9 49.182 9c-7.23 0-13.092 5.86-13.092 13.093 0 1.026.118 2.02.338 2.98C25.543 24.527 15.9 19.318 9.44 11.396c-1.125 1.936-1.77 4.184-1.77 6.58 0 4.543 2.312 8.552 5.824 10.9-2.146-.07-4.165-.658-5.93-1.64-.002.056-.002.11-.002.163 0 6.345 4.513 11.638 10.504 12.84-1.1.298-2.256.457-3.45.457-.845 0-1.666-.078-2.464-.23 1.667 5.2 6.5 8.985 12.23 9.09-4.482 3.51-10.13 5.605-16.26 5.605-1.055 0-2.096-.06-3.122-.184 5.794 3.717 12.676 5.882 20.067 5.882 24.083 0 37.25-19.95 37.25-37.25 0-.565-.013-1.133-.038-1.693 2.558-1.847 4.778-4.15 6.532-6.774z" /></svg>
              <span className="group-hover:text-black">Tweet @shubhan3009</span>
            </a>
            <a
              href={`${EXAMPLE_PATH}`}
              className="mx-3 font-bold hover:underline text-white py-2 px-10  lg:px-3  border border-black group hover:bg-white bg-gray-800 mb-6 lg:mb-0"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-white group-hover:fill-slate-900 inline-block m-1"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"></path></svg>
              <span className="group-hover:text-black">View Source on GitHub</span>
            </a>
            <a className='bg-purple-600 py-1 px-8  lg:px-3 text-white border border-black group hover:bg-white font-bold' rel='me' href={"https://fosstodon.org/@shubhan"}>
              <svg className="group-hover:fill-purple-800 h-8 w-8 fill-gray-900 inline-block m-1" viewBox="0 0 32 32" ><path d="M 15.9375 4.03125 C 12.917 4.0435 9.9179219 4.4269844 8.3574219 5.1464844 C 8.3574219 5.1464844 5 6.6748594 5 11.880859 C 5 18.077859 4.9955 25.860234 10.5625 27.365234 C 12.6945 27.938234 14.527953 28.061562 16.001953 27.976562 C 18.676953 27.825562 20 27.005859 20 27.005859 L 19.910156 25.029297 C 19.910156 25.029297 18.176297 25.640313 16.029297 25.570312 C 13.902297 25.495313 11.6615 25.335688 11.3125 22.679688 C 11.2805 22.432688 11.264625 22.182594 11.265625 21.933594 C 15.772625 23.052594 19.615828 22.420969 20.673828 22.292969 C 23.627828 21.933969 26.199344 20.081672 26.527344 18.388672 C 27.041344 15.720672 26.998047 11.880859 26.998047 11.880859 C 26.998047 6.6748594 23.646484 5.1464844 23.646484 5.1464844 C 22.000984 4.3779844 18.958 4.019 15.9375 4.03125 z M 12.705078 8.0019531 C 13.739953 8.0297031 14.762578 8.4927031 15.392578 9.4707031 L 16.001953 10.505859 L 16.609375 9.4707031 C 17.874375 7.5037031 20.709594 7.6264375 22.058594 9.1484375 C 23.302594 10.596438 23.025391 11.531 23.025391 18 L 23.025391 18.001953 L 20.578125 18.001953 L 20.578125 12.373047 C 20.578125 9.7380469 17.21875 9.6362812 17.21875 12.738281 L 17.21875 16 L 14.787109 16 L 14.787109 12.738281 C 14.787109 9.6362812 11.429688 9.7360938 11.429688 12.371094 L 11.429688 18 L 8.9765625 18 C 8.9765625 11.526 8.7043594 10.585438 9.9433594 9.1484375 C 10.622859 8.3824375 11.670203 7.9742031 12.705078 8.0019531 z" /></svg>
              <span className="group-hover:text-black">@shubhan on Mastodon</span></a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
