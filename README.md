# 🌗 theme-switch-demo

A minimal React + Vite + Tailwind v4 app showing how to implement **light/dark/system theme switching**.
Uses a `data-theme` attribute on `<html>` to control Tailwind’s `dark:` utilities, with persistence in `localStorage`.

---

## ✨ Features

* **Three-way toggle**: Light / Dark / System
* **System sync**: auto-updates when OS theme changes
* **Persistence**: remembers choice across reloads via `localStorage`
* **No flash**: inline script sets theme before first paint
* **Panels layout**: Sidebar, Topbar (with theme toggle), and three demo panels (Chat / Timer / Calendar) for visual testing
* **lucide-react icons** for buttons and nav items

---

## 🛠 Tech Stack

* [React](https://react.dev/) + [Vite](https://vitejs.dev/)
* [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first, with `@custom-variant dark`)
* [lucide-react](https://lucide.dev/) (tree-shaken icons)
* PostCSS with `@tailwindcss/postcss` plugin (required in v4)

---

## 🚀 Getting Started

### 1. Create & Install

```bash
# Create project
npm create vite@latest theme-switch-demo -- --template react
cd theme-switch-demo

# Install deps
npm i
npm i -D @tailwindcss/postcss
npm i lucide-react
```

### 2. Configure PostCSS

Create `postcss.config.mjs`:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

### 3. Add Tailwind CSS

Create `src/index.css`:

```css
@import "tailwindcss";

/* Dark variant triggered by data-theme="dark" */
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

@theme {
  --color-brand-500: oklch(0.70 0.18 265);
  --color-brand-600: oklch(0.62 0.20 265);
}

@layer base {
  html, body, #root { height: 100%; }
  body { margin: 0; color-scheme: light dark; }
}
```

### 4. Inline Script in `index.html`

```html
<script>
  try {
    const stored = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored === 'light' ? 'light'
                  : stored === 'dark'  ? 'dark'
                  : (systemDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initial);
  } catch {}
</script>
```

### 5. Run Dev Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## 📂 Project Structure

```
theme-switch-demo/
├── index.html
├── postcss.config.mjs
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── lib/
│   │   └── theme.js         # Theme helpers (get/set/watch)
│   └── components/
│       ├── Topbar.jsx
│       ├── Sidebar.jsx
│       ├── Panel.jsx
│       └── ThemeToggle.jsx
```

---

## 🔍 How It Works

1. **Toggle clicked** → React updates preference state.
2. **Helper applies theme** → sets `<html data-theme="dark|light">`.
3. **Tailwind’s `dark:` utilities** → instantly apply matching CSS rules.
4. **localStorage** → remembers choice across sessions.
5. **System mode** → uses `matchMedia` listener to react to OS theme changes live.

---

## 📸 Demo Preview

Light mode:
![Light theme screenshot](https://dummyimage.com/600x300/ffffff/000000\&text=Light+Theme)

Dark mode:
![Dark theme screenshot](https://dummyimage.com/600x300/000000/ffffff\&text=Dark+Theme)

---

## 🧩 Extending

* Add new themes with `@custom-variant sepia (&:where([data-theme=sepia]))`.
* Store user preference in cookies for SSR apps.
* Wrap logic in a custom `useTheme()` hook for reuse across projects.

---

## ⚠️ Gotchas

* Tailwind v4 requires `@tailwindcss/postcss` — **don’t** use `tailwindcss` in `postcss.config.mjs`.
* Dev builds in Vite won’t tree-shake lucide icons. They’re slim in production.
* Don’t forget the inline script; without it you’ll see a light-mode flash before dark mode kicks in.

---

## 📄 License

MIT — use freely, hack it up, reskin it, whatever.
