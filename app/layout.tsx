

import '../styles/index.css'
import fs from 'fs'
import { join } from 'path'
import { Description, HOME_OG_IMAGE_URL, Title } from '../lib/constants';
import { Metadata } from 'next';
import { BaseUrl } from '../lib/baseUrl';
import HTML from '../components/html';

const title = `${Title} - ${Description}`;

export const viewport = {
    themeColor: '#000',
}

export const metadata: Metadata = {
    title: title,
    description: title,
    metadataBase: new URL("https://octocat.dev"),
    openGraph: {
        type: "website",
        url: "https://octocat.dev",
        title: title,
        description: title,
        siteName: title,
        images: [{
            url: HOME_OG_IMAGE_URL,
        }],
        locale: 'en'

    },
    alternates: {
        canonical: "https://octocat.dev",
        types: {
            'application/rss+xml': [
                { url: `${BaseUrl}/feed.xml`, title: Title },
            ]
        },
    },

    twitter: {
        creator: '@shubhan3009',
        title: Title,
        site: Title,
        card: "summary_large_image",
        images: HOME_OG_IMAGE_URL,
        description: title
    },
    icons: {
        icon: ["/favicons/favicon-32x32.png", "/favicons/favicon-16x16.png"],
        apple: "/favicons/apple-touch-icon.png",
        shortcut: "/favicons/favicon.ico",
        other: {
            rel: 'mask-icon',
            url: '/favicons/safari-pinned-tab.svg'
        }
    },
    manifest: "/favicons/site.webmanifest"

};

const RootLayout = ({ children }: LayoutProps) => {
    return (
        <HTML>
            <head>
                <link rel="search" type="application/opensearchdescription+xml" title={title} href="/opensearch.xml" />
            </head>
            <body className="dark:bg-trueDark dark:text-gray-200 duration-250 transition-colors">
                <script dangerouslySetInnerHTML={{ __html: fs.readFileSync(join(process.cwd(), "_scripts", "pagescript.js"), 'utf8').replaceAll('\r\n', '').replaceAll('\n', '') }}></script>
                {children}
            </body>
        </HTML>
    );
}

type LayoutProps = {
    children: React.ReactNode,
}

export default RootLayout;