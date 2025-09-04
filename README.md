# 🌗 React + Vite + Tailwind v4 + Lucide — Theme Switcher Demo

A tiny demo app showing how to implement **dark / light / system theme switching** with:

* ⚛️ React (Vite scaffold)
* 🎨 Tailwind CSS v4
* 🔆 Lucide React (icons)
* 💾 `localStorage` persistence
* 🚫 No FOUC (theme set before React mounts)

---

## ✨ Features

* **Three modes:** Light, Dark, or System (mirrors OS preference).
* **Persistence:** User choice saved in `localStorage`.
* **System fallback:** If no preference is stored, app follows system theme.
* **Zero flash:** Inline script sets theme before first paint.
* **Clean UI:** Just a header with buttons + a center card flipping colors.

---

## 📂 Project Structure

```bash
my-theme-demo/
├─ index.html            # Adds theme script early
├─ vite.config.js        # React + Tailwind plugin config
├─ package.json
└─ src/
   ├─ main.jsx           # React entry point
   ├─ App.jsx            # Demo UI + theme logic
   └─ index.css          # Tailwind import + custom dark variant
```

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/dominic-lam/theme-switch-demo.git
cd theme-switch-demo
npm install
```

### 2. Run Dev Server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) (or whatever port Vite shows).

---

## ⚙️ How It Works

* **Tailwind v4** uses `@import "tailwindcss";` directly in `index.css`.
* A **custom dark variant** is defined:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

* The `<html>` element gets a `.dark` class set via inline script **before React mounts**:

```js
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const stored = localStorage.getItem("theme"); // "light" | "dark" | null
const isDark = stored ? stored === "dark" : prefersDark;
document.documentElement.classList.toggle("dark", isDark);
```

* In React, buttons update `localStorage` and toggle the `.dark` class.

---

## 🖼️ Demo UI

* **Header:** Three buttons (☀️ Light, 🌙 Dark, 💻 System).
* **Card:** Centered, responsive, flips background/text colors with `dark:` utilities.

---

## 🛠️ Tech Stack

* [Vite](https://vitejs.dev/) — blazing fast dev server
* [React](https://react.dev/) — component model
* [Tailwind v4](https://tailwindcss.com/docs/installation) — CSS-first utility classes
* [Lucide React](https://lucide.dev/) — icon pack

---

## 📜 License

MIT — free to use, modify, and break however you want.

---

## 🙌 Credits

* Tailwind Labs for [dark mode docs](https://tailwindcss.com/docs/dark-mode).
* Lucide team for icons.
