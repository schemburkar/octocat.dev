'use client';
const HTML = ({ children }: any) => {

    const storage = globalThis.localStorage;
    const isDarkTheme = storage && globalThis.document ? storage.getItem('theme') === 'dark' || (storage.getItem("theme") === null && globalThis.matchMedia(`(prefers-color-scheme: ${'dark'})`).matches) : false;
    return <html lang="en" className={isDarkTheme ? 'dark' : ''}>
        {children}
    </html>
}

export default HTML;