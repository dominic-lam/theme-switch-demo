// src/components/Sidebar.jsx
import { MessageSquare, Timer, CalendarDays } from "lucide-react";

export default function Sidebar() {
    const Item = ({ icon: Icon, label }) => (
        <div className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-default">
            <Icon className="h-4 w-4" />
            <span className="text-sm">{label}</span>
        </div>
    );

    return (
        <aside className="w-56 shrink-0 border-r border-slate-200 dark:border-slate-800 p-3">
            <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                Demo Navigation
            </div>
            <nav className="grid gap-1">
                <Item icon={MessageSquare} label="Chat Panel" />
                <Item icon={Timer} label="Timer Panel" />
                <Item icon={CalendarDays} label="Calendar Panel" />
            </nav>
        </aside>
    );
}
