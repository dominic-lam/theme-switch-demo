// src/components/Topbar.jsx
import ThemeToggle from "./ThemeToggle";

export default function Topbar() {
    return (
        <header className="h-14 border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between">
            <h1 className="text-sm font-semibold">
                <span className="text-brand-600 dark:text-brand-500">theme-switch-demo</span>
                <span className="text-slate-500 dark:text-slate-400"> • Tailwind v4</span>
            </h1>
            <ThemeToggle />
        </header>
    );
}
