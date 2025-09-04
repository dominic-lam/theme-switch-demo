// src/components/Panel.jsx
export default function Panel({ title, children }) {
    return (
        <section className="panel">
            <h2 className="text-sm font-semibold mb-2">{title}</h2>
            <div className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                {children}
            </div>
        </section>
    );
}
