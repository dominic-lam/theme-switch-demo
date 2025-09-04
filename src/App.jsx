// src/App.jsx
import { useEffect, useMemo, useState } from "react";
import { Sun, Moon, Laptop2 } from "lucide-react";

/**
 * Return the currently effective theme: "light" | "dark"
 * If there is no stored preference, we mirror the system.
 */
function useEffectiveTheme() {
    const systemPrefersDark = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    const [stored, setStored] = useState(() => localStorage.getItem("theme")); // "light" | "dark" | null
    const [systemDark, setSystemDark] = useState(systemPrefersDark());

    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e) => setSystemDark(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    const effective = useMemo(() => {
        return stored ? stored : systemDark ? "dark" : "light";
    }, [stored, systemDark]);

    return { effective, stored, setStored };
}

/** Apply the theme by toggling the `.dark` class on <html>. */
function applyTheme(theme /* "light" | "dark" */) {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);

    // Keep built-in form controls aligned with your theme
    let meta = document.querySelector('meta[name="color-scheme"]');
    if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "color-scheme");
        document.head.appendChild(meta);
    }
    meta.setAttribute("content", isDark ? "dark light" : "light dark");
}

export default function App() {
    const { effective, stored, setStored } = useEffectiveTheme();

    // Sync `.dark` class whenever the effective theme changes
    useEffect(() => {
        applyTheme(effective);
    }, [effective]);

    const setLight = () => {
        localStorage.setItem("theme", "light");
        setStored("light");
    };
    const setDark = () => {
        localStorage.setItem("theme", "dark");
        setStored("dark");
    };
    const setSystem = () => {
        localStorage.removeItem("theme");
        setStored(null);
    };

    return (
        <div className="min-h-dvh bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
            {/* Top bar */}
            <header className="sticky top-0 z-10 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-950/70 backdrop-blur py-3">
                <div className="mx-auto max-w-3xl px-4 flex items-center justify-between gap-3">
                    <h1 className="text-base font-semibold tracking-tight">
                        Theme Demo — Tailwind v4
                    </h1>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={setLight}
                            className={[
                                "h-9 px-3 inline-flex items-center gap-2 rounded-md border",
                                "border-slate-300 dark:border-slate-700",
                                "hover:bg-slate-100 dark:hover:bg-slate-800",
                                "transition"
                            ].join(" ")}
                            title="Light mode"
                        >
                            <Sun className="h-4 w-4" />
                            <span className="text-sm">Light</span>
                        </button>

                        <button
                            onClick={setDark}
                            className={[
                                "h-9 px-3 inline-flex items-center gap-2 rounded-md border",
                                "border-slate-300 dark:border-slate-700",
                                "hover:bg-slate-100 dark:hover:bg-slate-800",
                                "transition"
                            ].join(" ")}
                            title="Dark mode"
                        >
                            <Moon className="h-4 w-4" />
                            <span className="text-sm">Dark</span>
                        </button>

                        <button
                            onClick={setSystem}
                            className={[
                                "h-9 px-3 inline-flex items-center gap-2 rounded-md border",
                                "border-slate-300 dark:border-slate-700",
                                "hover:bg-slate-100 dark:hover:bg-slate-800",
                                "transition"
                            ].join(" ")}
                            title="System"
                        >
                            <Laptop2 className="h-4 w-4" />
                            <span className="text-sm">System</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Center content */}
            <main className="mx-auto max-w-3xl px-4 py-16">
                <section className="grid place-items-center">
                    <div
                        className={[
                            "w-full max-w-md rounded-xl p-6",
                            "bg-slate-100 dark:bg-slate-900",
                            "border border-slate-200/70 dark:border-slate-800",
                            "shadow-sm"
                        ].join(" ")}
                    >
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            Effective theme:&nbsp;
                            <span className="font-semibold">{effective}</span>
                            {stored ? (
                                <span className="ml-1 text-xs opacity-70">
                  (forced by you)
                </span>
                            ) : (
                                <span className="ml-1 text-xs opacity-70">
                  (following system)
                </span>
                            )}
                        </p>

                        <h2 className="mt-4 text-xl font-semibold">
                            Hello, darkness my old friend (and light, I guess)
                        </h2>
                        <p className="mt-2 leading-relaxed text-slate-700 dark:text-slate-300">
                            This card flips colors with Tailwind’s <code>dark:</code> variant.
                            The three buttons above store your choice in{" "}
                            <code>localStorage</code>. “System” removes your override and
                            mirrors your OS preference.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}
