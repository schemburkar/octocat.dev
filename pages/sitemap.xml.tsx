import { getDataAPIByType } from "../lib/data-api";
import { GetServerSideProps } from "next";

const Sitemap = () => { };

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

    const baseUrl = `https://${req.headers.host}`;

    const [posts, pages] = await Promise.all([getDataAPIByType("posts").getAllItems(['slug', 'date']), getDataAPIByType("pages").getAllItems(['slug'])]);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
          <loc>${baseUrl}/</loc>
          <lastmod>${(new Date()).toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
      </url>
      ${pages
        .map(({ slug, type }) => {
            return `
            <url>
              <loc>${baseUrl}/${type}/${slug}</loc>
              <lastmod>${(new Date()).toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
            `;
        }).join("")}
      ${posts
        .map(({ slug, date, type }) => {
            const d = date ? new Date(date) : new Date();
            return `
            <url>
              <loc>${baseUrl}/${type}/${slug}</loc>
              <lastmod>${d.toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
            </url>
            `;
        }).join("")}
    </urlset>`;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;