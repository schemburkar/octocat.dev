import { writeFile } from 'fs/promises'
import { IItemData } from "../lib/FileFormat";

const url = (url: string, date: string, freq = 'daily') => `
<url>
    <loc>${url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>1.0</priority>
</url>
`;

const siteMapXML = (...urls: string[]) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('')}
</urlset>`;

const getSiteMap = async ([posts, pages]: [IItemData[], IItemData[]]) => {
    try {
        const baseUrl = `https://${process.env.SITE_DOMAIN || process.env.VERCEL_URL || `octocat.dev`}`;
        const postUrls = posts.map(({ slug, type, date }) => url(`${baseUrl}/${type}/${slug.join('/')}`, (date ? new Date(date) : new Date()).toISOString()));
        const pagesUrls = pages.map(({ slug, type }) => url(`${baseUrl}/${type}/${slug.join('/')}`, new Date().toISOString()));
        const sitemap = siteMapXML(url(`${baseUrl}/`, new Date().toISOString(), 'hourly'),url(`${baseUrl}/archive`, new Date().toISOString(), 'hourly'), pagesUrls.join(""), postUrls.join(""))
        return sitemap;
    }
    catch (e) {
        return ''
    }
};

export const saveSiteMap = async ([posts, pages]: [IItemData[], IItemData[]]) => {
    // writes sitemap.xml to public directory
    const path = `${process.cwd()}/public/sitemap.xml`;
    await writeFile(path, await getSiteMap([posts, pages]), "utf8");
}
