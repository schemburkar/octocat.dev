---
title: "Supporting  Dark Mode with Tailwind CSS and Next.js"
excerpt: "Let's look at adding dark mode to your Next.js website or blog using Tailwind CSS; By taking a deep dive at what's needed to support dark mode"
coverImage: "/assets/blog/dark-mode-tailwind-css/cover.jpg"
date: "2021-10-30T11:04:55.667Z"
author:
  name: Shubhan Chemburkar
  picture: "/assets/blog/authors/default.png"
ogImage:
  url: "/assets/blog/dark-mode-tailwind-css/cover.jpg"
isHeroPost: false
---

In this post, we'll look at adding dark mode to your Next.js website or blog using Tailwind CSS.

Tailwind CSS supports automatic media query mode and class based mode for enabling dark mode. We will be using the class method to enable dark mode.

## Setting up dark mode

First up is updating the `tailwind.config.js` to support dark class variants

```js
// tailwind.config.js
module.exports = {
  darkMode: "class",
};
```

Next adding dark classes to your markup like components or pages

For example, adding a dark background and light foreground to body

```jsx
//_document.js
<Html lang="en">
  <Head />
  <body className="dark:bg-black dark:text-white">
    <Main />
    <NextScript />
  </body>
</Html>
```

You can do this to any of the components as well, like a `Footer` components

```jsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-700 border-t border-gray-900 dark:border-gray-300  ">
      <Container></Container>
    </footer>
  );
}
```

To apply the dark theme, we need to set the `dark` class on our document.

For Dark mode

```ts
globalThis.document.documentElement.classList.add("dark");
```

For Light or default mode

```ts
globalThis.document.documentElement.classList.remove("dark");
```

## Detecting Dark Mode preference

Now time to test this integration with browser/device theme detection using a media query.

Here is the code that's going to detect the theme for us

```js
if (!globalThis.localStorage) {
  return;
}

if (
  globalThis.localStorage.theme === "dark" ||
  (!("theme" in globalThis.localStorage) &&
    globalThis.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  globalThis.document.documentElement.classList.add("dark");
} else {
  globalThis.document.documentElement.classList.remove("dark");
}
```

The check happens first on local storage to detect already applied settings or querying the browser media preference for dark theme. The code `globalThis.matchMedia('(prefers-color-scheme: dark)').matches` tell us whether the browser is having a dark mode preference based on browser or device settings

Following are the possible combinations that the media query may detect dark mode on the website

| Browser Theme | Device | Result             |
| ------------- | ------ | ------------------ |
| Dark          | Any    | Dark               |
| Light         | Any    | Light              |
| Auto          | Dark   | Dark               |
| Auto          | Light  | Light              |
| Auto          | Auto   | Auto<sup>*[1]*</sup> |

*[1]* If the operating system supports day/night based themes, the device may switch to Day/Night mode based on the user's preferences.

*[2]* If the browser is not supporting dark mode, then the browser will fallback to light mode.

Coming back to our detection script, it needs to run before our application loads, and there for must be a inline script within the `<body>` tag in the `_document.js` file.

Create a new file named `dark-mode-tailwind.js` in your `public` folder and add the following code

```js
// dark-mode-tailwind.js
function detectDarkMode() {
  if (!globalThis.localStorage) {
    return;
  }

  if (
    globalThis.localStorage.theme === "dark" ||
    (!("theme" in globalThis.localStorage) &&
      globalThis.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    globalThis.document.documentElement.classList.add("dark");
  } else {
    globalThis.document.documentElement.classList.remove("dark");
  }
}

// Call our detection function as well
detectDarkMode();
```

Now we need to call this script in the `_document.js` file

```jsx
//_document.js
<Html lang="en">
  <Head />
  <body>
    <script src="/dark-mode-tailwind.js" />
    <Main />
    <NextScript />
  </body>
```

Alternative to a real-time network request, the file can also be embedded in the `_document.js` file. For this to happen, move the `dark-mode-tailwind.js` file to the a private folder `_scripts` and modify the `_document.js` file to include the below

```jsx
//_document.js
<Html lang="en">
  <Head />
  <body>
    <script dangerouslySetInnerHTML={{ __html: fs.readFileSync(join(process.cwd(), "_scripts", "dark-mode-tailwind.js"), 'utf8') }}></script>
    <Main />
    <NextScript />
  </body>
```

## Toggling Dark Mode

Now we will look at how to toggle the dark mode on and off. We will be using the `<button>` element to toggle the dark mode.

First up create a new component named `DarkModeToggle` which will be used to toggle the dark mode, using the following code

```jsx
// DarkModeToggle.jsx
export default function DarkModeToggle() {
  const onThemeChange = () => {
    // TODO: Toggle the dark mode
  };

  return (
    <button
      className="bg-gray-100 dark:bg-gray-700 border-t border-gray-900 dark:border-gray-300  "
      onClick={onThemeChange}
    >
      <div title={"Switch to dark theme"} className="dark:hidden">
        {"Get Dark Mode"}
      </div>
      <div title={"Switch to light theme"} className="hidden dark:block">
        {"Get Light Mode"}
      </div>
    </button>
  );
}
```

Lets break the above code down. We have a button with two `<div>` elements inside it. The `<div>` elements are used to show the text/icon of the button. The one `<div>` element is hidden when the dark mode is enabled while the other `<div>` element is shown when the dark mode is hidden when light more is enabled.

Why are we using CSS to hide or show div elements? Wouldn't it be better to use JSX to do this?

The reason is that we do not want a screen flicker when the user loads the page for the first time (FOUC). We want the page to load with the correct theme. Since we are using CSS, we can hide the `<div>` elements and show them when the user clicks on the button.

Next up the actual `onThemeChange` function. We will be using the `localStorage` API to store the dark mode preference.

```jsx
// DarkModeToggle.jsx
const onThemeChange = () => {
  if (globalThis.document.documentElement.classList.contains("dark")) {
    globalThis.document.documentElement.classList.remove("dark");
    globalThis.localStorage.theme = "light";
  } else {
    globalThis.document.documentElement.classList.add("dark");
    globalThis.localStorage.theme = "dark";
  }
};
```

## Adding the Dark Mode Toggle to the Layout

We can place this `<DarkModeToggle>` component in the `<Layout>` component. Usually in the website header or title bar. The control needs to be included only once in the layout.

```jsx
// Header.jsx
import DarkModeToggle from "../components/DarkModeToggle";

export default function Header() {
  return (
    <header>
      <DarkModeToggle />
    </header>
  );
}
```

## Watching for user preference changes

We are using local storage to save the users theme preference. We can use the `onchange` event from storage to detect changes in the users preference. This keeps multiple tabs of the same application in sync.

Following is the code to detect changes in the users preference

```jsx
// DarkModeToggle.jsx

const onStorageUpdate = ({ key, newValue }: StorageEvent) => {
  if (key !== "theme") return;
  if (newValue === "dark") {
    globalThis.document.documentElement.classList.add("dark");
  } else {
    globalThis.document.documentElement.classList.remove("dark");
  }
};

useEffect(() => {
  globalThis.addEventListener("storage", onStorageUpdate);
  return () => {
    globalThis.removeEventListener("storage", onStorageUpdate);
  };
}, []);
```

## Watching for device theme changes

Similar to user preference changes, we can also detect changes in the device theme. This is useful when the user is on a mobile device and the device theme changes.

```jsx
// DarkModeToggle.jsx

const onDeviceThemeChange = () => {
  if (globalThis.matchMedia("(prefers-color-scheme: dark)").matches) {
    globalThis.document.documentElement.classList.add("dark");
  } else {
    globalThis.document.documentElement.classList.remove("dark");
  }
};

useEffect(() => {
  globalThis
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", onDeviceThemeChange);
  // use addListener instead of addEventListener for supporting older versions of Safari
  return () => {
    globalThis
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", onDeviceThemeChange);
    // use removeListener instead of removeEventListener for supporting older versions of Safari
  };
}, []);
```

## Dark mode in this blog

For this blog, I have implemented certain variations when implementing the dark mode. The variations like using icons rather than text for the toggle button. The icons are used to make the toggle button more accessible.

On the `onThemeChange`, `onStorageUpdate` and `onDeviceThemeChange` functions, I have reused the `detectDarkMode` function to detect the dark mode. This saves us from having to write the same code again and we reuse the already made available global function.

The themeToggle component is located in `components/themeToggle.tsx` and the script is located in `_scripts/pagescript.js`.

![Dark mode in octocat.dev blog](https://octocat.dev/assets/blog/dark-mode-tailwind-css/dark-theme-octocat-dev.gif)

Check this Pull Request for the code changes to the blog [Enabling Dark mode](https://github.com/schemburkar/octocat.dev/pull/1)

For any queries or feedback, please start a new discussion on [GitHub Discussions](https://github.com/schemburkar/octocat.dev/discussions/new) or at Twitter @shubhan3009.


### Photo Credit
> Cover Photo by [Jack B](https://unsplash.com/@nervum?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/lights-out?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

### Co-Author
> This post was co-authored by [GitHub Copilot](https://copilot.github.com)
