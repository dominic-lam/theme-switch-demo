// src/App.jsx
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Panel from "./components/Panel";

export default function App() {
    return (
        <div className="min-h-dvh w-dvw bg-white text-slate-900 dark:bg-black dark:text-slate-100">
            <Topbar />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-4 grid gap-4 md:grid-cols-3">
                    <Panel title="Chat Panel">
                        <p>
                            This is fake. But it demonstrates how text, borders, and backgrounds
                            adapt in light vs dark. Try the theme toggle in the top-right.
                        </p>
                    </Panel>
                    <Panel title="Timer Panel">
                        <ul className="list-disc ml-5 space-y-1">
                            <li>Start/Stop buttons would live here</li>
                            <li>Countdown styling changes with theme</li>
                            <li>Stats chip, etc.</li>
                        </ul>
                    </Panel>
                    <Panel title="Calendar Panel">
                        <p>
                            Pretend there’s a calendar. All you need here is the visual proof that
                            utility classes react to theme toggles instantly.
                        </p>
                    </Panel>
                </main>
            </div>
        </div>
    );
}
