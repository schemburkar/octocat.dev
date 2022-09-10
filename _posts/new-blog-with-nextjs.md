---
title: "New Blog. Hello to octocat.dev"
excerpt: "This is my new blog octocat.dev. Going forward all my new blog posts will appear in this blog."
coverImage: "/assets/blog/new-blog-with-nextjs/new-blog-cover.jpg"
date: "2021-10-27T05:35:07.322Z"
author:
  name: Shubhan Chemburkar
  picture: "/assets/blog/authors/default.png"
ogImage:
  url: "/assets/blog/new-blog-with-nextjs/new-blog-cover.jpg"
isHeroPost: false
---

## Hello to **octocat.dev**.

This is my new blog octocat.dev. Focused on development, open source on GitHub.

Going forward all my new blog posts will appear in this blog. All my previous posts from [World Wide Code](https://worldwidecode.wordpress.com) will remain accessible as well.


## Why migrate from WordPress?

*TL;DR* simplicity and control.

I have been running the [World Wide Code](https://worldwidecode.wordpress.com) blog since Feb 1, 2011. There were a lot of posts initially and then tapered off in 2016. It hasn't seen much love since last few years, only a post here and there.

Mainly due to the complexity involved in writing it in WordPress, formatting has become complex. Even though a CMS is good to start with, as a developer it isn't the comfortable choice.

I spend a lot of time in developer tools like Visual Studio Code and GitHub. Creating my own blog, lets me write from those familiar tools. Gives me greater control on what appears in the blog.

Additional important factor is I write to share knowledge not for earning money. So want a advertising free experience. WordPress free plan shows advertisements and the paid version is costly without giving important features to me. My own blog makes advertising free solution possible.

If you do want to support me, I will be adding a "Buy me Coffee" or something else later.

## Building the blog

This blog is built using Next.js Blog starter template written in [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/).

All posts are written in Markdown and converted to HTML with [remark](https://github.com/remarkjs/remark) and [rehype-highlight](https://github.com/rehypejs/rehype-highlight).

The blog is hosted on [Vercel](https://vercel.com/) with its great content delivery and integrations from [Next.js](https://nextjs.org/)

## Code Structure

- **components** - Reusable components for rendering various parts of site
- **pages** - pages in the site like home page and individual post page
- **styles** - Site wide styles and customizations to Tailwind CSS
- **lib** - Utility functions and classes
- **\_posts** - Individual posts authored in Markdown
- **\_pages** - Individual pages authored in Markdown, similar to \_posts

## Code Flow

Every post is contains its own metadata data like title, excerpt, cover image etc. Followed by actual post content written in Markdown.

    ---
    title: 'New Blog'
    excerpt: 'This is my new blog octocat.dev. Going forward all my new blog posts will appear in this blog.'
    coverImage: '/assets/blog/new-blog-with-nextjs/new-blog-cover.jpg'
    date: '2021-10-27T05:35:07.322Z'
    author:
      name: Shubhan Chemburkar
      picture: '/assets/blog/authors/default.png'
    ogImage:
      url: '/assets/blog/new-blog-with-nextjs/new-blog-cover.jpg'
    isHeroPost: false
    ---


    ## octocat.dev

    This is my new blog octocat.dev. Going forward all my new blog posts will appear in this blog.

    All my previous posts from [World Wide Code](worldwidecode.wordpress.com) will remain accessible  as well.

On home page, all files from `_posts` folder are read. File name is treated as a slug for the post.

```ts
getAllItems = async (fields: Fields[] = []) => {
  const slugs = await this.getSlugs();

  const promises = slugs.map((slug) => this.getItemsBySlug(slug, fields));

  const posts = await Promise.all(promises);
  // sort posts by date in descending order
  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
};
```

On the individual post page, the entire file is read using the provided slug.

Content from the file is parsed using [gray-matter](https://github.com/jonschlinkert/gray-matter) into meta data and Post Content.

```ts
const fileContents = await readFile(fullPath);
const { data, content } = matter(fileContents)
```

This content is the written markdown syntax. This is converted into HTML using remark, followed by code snippets stylized with rehype-highlight.

```ts
const content = await markdownToHtml(post.content || '');

const parsedContent = await rehype()
  .data('settings', { fragment: true })
  .use(rehypeHighlight)
  .process(content);
```

This content is then served on the actual post page. Since this is raw HTML, we need to use one of the most non-recommended APIs in React ```dangerouslySetInnerHTML```

```jsx
<div
  className={markdownStyles['markdown']}
  dangerouslySetInnerHTML={{ __html: content }}
/>
```

It is recommended to sanitize this HTML in case it is served from any external source or APIs.

## Deployment

This blog is deployed using Vercel. Vercel supports Next.js application and provided optimizations in content delivery. 

The deployment step would create a production version of this blog. Since most of the content is static, next.js will generated static html mages automatically, further optimizing client processing and delivery.


## Open Source

Since this blog is for developers, everyone should be able to look at the source code. The entire source code for this blog is hosted on [GitHub repository](https://github.com/schemburkar/octocat.dev)  under a MIT license.



More details around customizations in Next.js and deployments in future posts.

**Cover image Credits**

> Photo by [Danielle MacInnes](https://unsplash.com/@dsmacinnes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/new-beginning?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
