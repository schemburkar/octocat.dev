'use client';
import { useEffect } from 'react'
import { darkTheme, lightTheme } from '../lib/constants';

const sun = <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="hidden dark:block text-2xl cursor-pointer " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></path></svg>
const moon = <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="dark:hidden	text-2xl cursor-pointer " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path></svg>
const auto = <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-2xl cursor-pointer" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2V4a8 8 0 1 0 0 16z"></path></g></svg>



const updateTheme = () => {

    //duplicated at pagescript.js
    if (!globalThis.localStorage || !globalThis.document) {
        return;
    }

    const storage = globalThis.localStorage;
    const document = globalThis.document;

    const isDarkTheme = storage.getItem('theme') === darkTheme || (storage.getItem("theme") === null && globalThis.matchMedia(`(prefers-color-scheme: ${darkTheme})`).matches);
    if (isDarkTheme) {
        document.documentElement.classList.add(darkTheme)
    } else {
        document.documentElement.classList.remove(darkTheme)
    }

}

const onThemeChange = () => {
    if (globalThis.document && document.documentElement.classList.contains(darkTheme)) {
        localStorage.theme = lightTheme;
    }
    else {
        localStorage.theme = darkTheme;
    }

    updateTheme();
}

const onStorageUpdate = ({ key, newValue }: StorageEvent) => {
    if (key !== "theme") return;
    updateTheme();
}

const onMediaUpdate = ({ media, matches }: MediaQueryListEvent) => {
    if (media !== `(prefers-color-scheme: ${darkTheme})`) return;
    localStorage.removeItem('theme');
    updateTheme();
}

const ThemeToggle = () => {
    useEffect(() => {
        globalThis.addEventListener("storage", onStorageUpdate);
        return () => globalThis.removeEventListener("storage", onStorageUpdate);
    }, []);
    useEffect(() => {
        const mediaQuery = globalThis.matchMedia(`(prefers-color-scheme: ${darkTheme})`);
        mediaQuery.addEventListener ?
            mediaQuery.addEventListener('change', onMediaUpdate) :
            mediaQuery.addListener(onMediaUpdate);
        return () => {
            const mediaQuery = globalThis.matchMedia(`(prefers-color-scheme: ${darkTheme})`);
            mediaQuery.removeEventListener ?
                mediaQuery.removeEventListener("change", onMediaUpdate) :
                mediaQuery.removeListener(onMediaUpdate);

        }
    }, []);
    return (
        <button onClick={onThemeChange} >
            <div title={"Switch to dark theme"} className="dark:hidden">
                {moon}
            </div>
            <div title={"Switch to light theme"} className="hidden dark:block">
                {sun}
            </div>
        </button>
    );
}

export default ThemeToggle;