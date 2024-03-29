import Head from 'next/head'
import { BaseUrl } from '../lib/baseUrl'
import { Description, Title } from '../lib/constants'

export default function Meta() {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicons/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel={"alternate"} type="application/rss+xml" title={Title} href={`${BaseUrl}/feed.xml`} />
      <meta
        name="description"
        content={`${Title} ${Description}`}
      />
      <meta property="og:type" content={`website`} />
      <meta property="og:site_name" content={Title} />
      <meta property="og:locale" content={'en'} />
      <meta property="twitter:creator" content={'@shubhan3009'} />
      <meta property="twitter:domain" content={Title} />
      <meta property="twitter:site" content={Title} />
    </Head>
  )
}
