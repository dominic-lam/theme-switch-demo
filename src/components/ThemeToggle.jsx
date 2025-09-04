// src/components/ThemeToggle.jsx
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react"; // tree-shaken ESM icons
import {
    getThemePreference,
    setThemePreference,
    resolveEffectiveTheme,
    watchSystemTheme,
} from "../lib/theme";

/**
 * Three-way toggle: Light / Dark / System.
 * - Persists selection in localStorage
 * - Reacts to OS changes when 'system' is selected
 */
export default function ThemeToggle() {
    const [pref, setPref] = useState(getThemePreference() || "system"); // 'light'|'dark'|'system'
    const [effective, setEffective] = useState(resolveEffectiveTheme(pref));

    useEffect(() => {
        setThemePreference(pref);
        setEffective(resolveEffectiveTheme(pref));
    }, [pref]);

    useEffect(() => {
        // If user chooses 'system', live-update on OS changes
        if (pref !== "system") return;
        const unsubscribe = watchSystemTheme((sys) => {
            setEffective(sys);
            document.documentElement.setAttribute("data-theme", sys);
        });
        return unsubscribe;
    }, [pref]);

    const Item = ({ value, icon: Icon, label }) => (
        <button
            type="button"
            onClick={() => setPref(value)}
            title={`${label} theme`}
            className={[
                "h-9 px-3 inline-flex items-center gap-2 rounded-md border transition",
                pref === value
                    ? "bg-brand-500 text-white border-transparent"
                    : "bg-transparent border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800",
            ].join(" ")}
        >
            <Icon className="h-4 w-4" />
            <span className="text-sm">{label}</span>
        </button>
    );

    return (
        <div className="flex items-center gap-2">
            <Item value="light" icon={Sun} label="Light" />
            <Item value="dark" icon={Moon} label="Dark" />
            <Item value="system" icon={Monitor} label="System" />
            <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
        Effective: <strong>{effective}</strong>
      </span>
        </div>
    );
}
