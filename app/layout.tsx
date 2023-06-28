

import '../styles/index.scss'
import fs from 'fs'
import { join } from 'path'
import { Description, HOME_OG_IMAGE_URL, Title } from '../lib/constants';
import { Metadata } from 'next';
import { BaseUrl } from '../lib/baseUrl';
import HTML from '../components/html';

const title = `${Title} - ${Description}`;
export const metadata: Metadata = {
    title: title,
    description: title,
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

    themeColor: '#000',
    twitter: {
        creator: '@shubhan3009',
        title: Title,
        site: Title,
        card: "summary_large_image",
        images: HOME_OG_IMAGE_URL,
        description: ''
    }
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