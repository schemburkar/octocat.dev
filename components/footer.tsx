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
            <a className='font-bold bg-purple-600 group text-white  hover:bg-white border border-black duration-200 transition-colors  p-2 self-stretch rounded-md' rel='me' href={"https://fosstodon.org/@shubhan"}>
              <svg className="group-hover:fill-purple-800 w-6 fill-gray-900 inline-block m-1" width={20} height={20} viewBox="0 0 32 32" ><path d="M 15.9375 4.03125 C 12.917 4.0435 9.9179219 4.4269844 8.3574219 5.1464844 C 8.3574219 5.1464844 5 6.6748594 5 11.880859 C 5 18.077859 4.9955 25.860234 10.5625 27.365234 C 12.6945 27.938234 14.527953 28.061562 16.001953 27.976562 C 18.676953 27.825562 20 27.005859 20 27.005859 L 19.910156 25.029297 C 19.910156 25.029297 18.176297 25.640313 16.029297 25.570312 C 13.902297 25.495313 11.6615 25.335688 11.3125 22.679688 C 11.2805 22.432688 11.264625 22.182594 11.265625 21.933594 C 15.772625 23.052594 19.615828 22.420969 20.673828 22.292969 C 23.627828 21.933969 26.199344 20.081672 26.527344 18.388672 C 27.041344 15.720672 26.998047 11.880859 26.998047 11.880859 C 26.998047 6.6748594 23.646484 5.1464844 23.646484 5.1464844 C 22.000984 4.3779844 18.958 4.019 15.9375 4.03125 z M 12.705078 8.0019531 C 13.739953 8.0297031 14.762578 8.4927031 15.392578 9.4707031 L 16.001953 10.505859 L 16.609375 9.4707031 C 17.874375 7.5037031 20.709594 7.6264375 22.058594 9.1484375 C 23.302594 10.596438 23.025391 11.531 23.025391 18 L 23.025391 18.001953 L 20.578125 18.001953 L 20.578125 12.373047 C 20.578125 9.7380469 17.21875 9.6362812 17.21875 12.738281 L 17.21875 16 L 14.787109 16 L 14.787109 12.738281 C 14.787109 9.6362812 11.429688 9.7360938 11.429688 12.371094 L 11.429688 18 L 8.9765625 18 C 8.9765625 11.526 8.7043594 10.585438 9.9433594 9.1484375 C 10.622859 8.3824375 11.670203 7.9742031 12.705078 8.0019531 z" /></svg>
              <span className="group-hover:text-black  break-words">@shubhan on Mastodon</span></a>

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
