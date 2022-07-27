const darkTheme = "dark";
const theme = "theme";

function updateTheme() {

    if (!globalThis.localStorage || !globalThis.document) {
        return;
    }

    const storage = globalThis.localStorage;
    const document = globalThis.document;

    const isDarkTheme = storage.getItem(theme) === darkTheme || storage.getItem("theme") === null && globalThis.matchMedia(`(prefers-color-scheme: ${darkTheme})`).matches;
    if (isDarkTheme) {
        document.documentElement.classList.add(darkTheme)
    } else {
        document.documentElement.classList.remove(darkTheme)
    }
};
updateTheme();