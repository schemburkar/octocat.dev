import { writeFile } from 'fs/promises'
import { IItemData } from "../lib/FileFormat";
import { Title, Description } from "../lib/constants";

const feedXML = (baseUrl: string, ...items: string[]) => {

    const date = new Date();
    return (`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
    xmlns:media="http://search.yahoo.com/mrss/">
<channel>
    <title>${Title}</title>
    <description>${Description}</description>
    <lastBuildDate>${date.toUTCString()}</lastBuildDate>
    <pubDate>${date.toUTCString()}</pubDate>
    <language>en</language>
    <generator>${Title}</generator>
    <copyright>Shubhan Chemburkar</copyright>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <sy:updatePeriod>	hourly	</sy:updatePeriod>
    <sy:updateFrequency>	1	</sy:updateFrequency>
    ${items.join('')}
</channel>
</rss>`);
};

const itemXML = (baseUrl: string, p: IItemData) => {
    const url = `${baseUrl}/${p.type}/${p.slug}`;
    const date = (p.date ? new Date(p.date) : new Date()).toUTCString()

    const media = p.coverImage ? `
    <media:thumbnail url="${p.coverImage}" />
    <media:content url="${p.coverImage}" medium="image">
        <media:title type="html">${p.title}</media:title>
    </media:content>
    `: '';

    const author = p.author ? `
    <dc:creator><![CDATA[${p.author?.name}]]></dc:creator>
    `: '';
    return (`
    <item>
        <title><![CDATA[${p.title}]]></title>
        <link>${url}</link>
        <guid>${url}</guid>
        <pubDate>${date}</pubDate>
        <description><![CDATA[${p.excerpt}]]></description>
        <content:encoded><![CDATA[${p.excerpt}]]></content:encoded>
        ${author}
        ${media}

    </item>
    `);
}
const getFeedXML = async ([posts, pages]: [IItemData[], IItemData[]]) => {
    try {
        const baseUrl = `https://${process.env.SITE_DOMAIN || process.env.VERCEL_URL || `octocat.dev`}`;
        const postXML = posts.map((p) => itemXML(baseUrl, p));
        const pageXML = pages.map((p) => itemXML(baseUrl, p));
        const sitemap = feedXML(baseUrl, pageXML.join(""), postXML.join(""))
        return sitemap;
    }
    catch (e) {
        return ''
    }
};

export const saveFeedXML = async ([posts, pages]: [IItemData[], IItemData[]]) => {
    // writes feed.xml to public directory
    const path = `${process.cwd()}/public/feed.xml`;
    await writeFile(path, await getFeedXML([posts, pages]), "utf8");
}
