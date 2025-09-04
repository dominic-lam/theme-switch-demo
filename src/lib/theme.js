// src/lib/theme.js
/**
 * Returns the current effective theme: 'light' | 'dark'
 * If user chose 'system', we map it to the current system value.
 */
export function resolveEffectiveTheme(pref) {
    if (pref === "light" || pref === "dark") return pref;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return systemDark ? "dark" : "light";
}

/** Persist user's choice: 'light' | 'dark' | 'system' */
export function setThemePreference(pref) {
    localStorage.setItem("theme", pref);
    // Apply effective theme to <html data-theme=...>
    const effective = resolveEffectiveTheme(pref);
    document.documentElement.setAttribute("data-theme", effective);
}

/** Read 'light' | 'dark' | 'system' | null */
export function getThemePreference() {
    return localStorage.getItem("theme");
}

/** Subscribe to OS theme changes so 'system' updates live */
export function watchSystemTheme(callback) {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => callback(mql.matches ? "dark" : "light");
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
}
