function updateTheme() {
    var darkTheme = "dark";
    if (!globalThis.localStorage) { return; }

    if (globalThis.localStorage.theme === darkTheme || (!('theme' in globalThis.localStorage) && globalThis.matchMedia(`(prefers-color-scheme: ${darkTheme})`).matches)) {
        globalThis.document.documentElement.classList.add(darkTheme)
    } else {
        globalThis.document.documentElement.classList.remove(darkTheme)
    }
};
updateTheme();