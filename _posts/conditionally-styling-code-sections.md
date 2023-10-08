---
title: "Conditionally styling code sections with Tailwind CSS and Next.js"
excerpt: "We will look at adding styles conditionally with CSS prefix and some pre-build steps. This will allow us to support themes for code sections."
coverImage: "https://worldwidecode.files.wordpress.com/2023/05/ilja-tulit-coreqiuk1qm-unsplash-dark-light.jpg"
date: "2023-05-17T12:52:30.000Z"
author:
  name: Shubhan Chemburkar
  picture: "https://worldwidecode.files.wordpress.com/2023/07/sc.png"
ogImage:
  url: "https://worldwidecode.files.wordpress.com/2023/05/ilja-tulit-coreqiuk1qm-unsplash-dark-light.jpg"
coverImageAspectRatio: 1.5
---

# Problem Statement

As part of this blog, there are a lot of code sections. However the theme for the code section has been fixed to Dark.
This was because, there is static theme available from `highlight.js` like `highlight.js/styles/github.css`.

The blog support light and dark theme based on your preferences (`localstorage`) or media queries (system/browser wide theme). 

Integrating both without manually writing markdown styles was complicated.

# Solution

Usual dark theme style variations using css class names look like:

```css
.my-style
{
    color: black;
}

.dark .my-style
{
    color: white;
}
```

The same can be represented in `scss` more easily as:
```scss
.my-style
{
    color: black;
}

.dark 
{
    .my-style
    {
        color: white;
    }
}
```

Essentially anything we wrap under `.dark` class will only apply to dark theme and then all themes can be loaded statically.

Extending the above logic to `highlight.js` means something like:

```scss

// Contents of highlight.js/styles/github.css
.hljs{color:#24292e;} // and others

.dark
{
    //Contents of  highlight.js/styles/github-dark.css
    .hljs{color:#c9d1d9;} // and others
}

```

Next step is to automate the above process during build. The highlevel break down on the steps is

1. Read the style file from `highlight.js` module
1. Modify the style based on required prefix
1. Save the file in desired path

The entire code looks something like below:

```ts
// prebuild.mts
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';

const saveStyles = async (themePath: string, prefix?: string, targetPath: string = '/styles') => {
    const target = path.join(process.cwd(), targetPath);
    const content = await readFile(path.join(process.cwd(), 'node_modules', themePath));

    const targetThemePath = path.join(target, themePath);
    await mkdir(path.dirname(targetThemePath), { recursive: true });

    const styleContent = prefix ? `.${prefix} {  ${content} }` : content;
    await writeFile(targetThemePath, styleContent, { encoding: 'utf-8', flag: 'w+' });
};
```

To save the files in `styles` folder (default), call this function like

```ts
// prebuild.mts

await saveStyles('highlight.js/scss/github.scss');
await saveStyles('highlight.js/scss/github-dark.scss', 'dark');

```

The code is then called via a pre build step in `package.json`

```json
// package.json
  "scripts": {
    "build": "yarn pre-build && next build",
    "pre-build":"ts-node ./_scripts/prebuild.mts"
  }
```

You will need to add `ts-node` to your dev dependencies, enable ESM for the above to work. 

```json
// tsconfig.json
"ts-node": {
    "esm": true,
    "target": "nodenext",
  },
```


Since the files are auto-generated during build, I have excluded them from source control with `.gitignore`

```yml
# .gitignore

#Generated Styles
styles/highlight.js
```

Including the files is now same as any other CSS file. In my case I have used TailwindCSS so it goes into my `index.scss`

```scss
// index.scss

@import './highlight.js/scss/github.scss';
@import './highlight.js/scss/github-dark.scss';

```


For any queries or feedback, please start a new discussion on [GitHub Discussions](https://github.com/schemburkar/octocat.dev/discussions/new) or at Twitter @shubhan3009.


### Photo Credit
> Cover Photo by [Ilja Tulit](https://unsplash.com/@iljatulit?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/CoREQIuk1qM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

