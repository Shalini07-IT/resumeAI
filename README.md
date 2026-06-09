# ResumeForge 🚀

A production-ready, fully client-side Resume Builder web application with ATS scoring, live preview, 50 design combinations, and one-click PDF export.

## ✨ Features

- **Multi-step Resume Wizard** — Personal, Summary, Experience, Projects, Education, Skills
- **Live Resume Preview** — See changes in real time
- **ATS Scoring Engine** — 10-category score (0–100) with actionable suggestions
- **50 Resume Designs** — 5 layouts × 10 themes, auto-generated
- **Dark Mode** — Full dark mode support
- **PDF Export** — One-click high-quality PDF via html2pdf.js
- **JSON Import/Export** — Portable resume data
- **Version History** — Up to 20 snapshots in localStorage
- **Undo/Redo** — Full undo stack (Ctrl+Z / Ctrl+Y)
- **Auto-save** — Every 5 seconds to localStorage
- **Resume Completeness Meter** — Progress indicator
- **Form Guidance** — Placeholder text, recruiter tips, action verb suggestions
- **Tag Input** — Comma/Enter separated skills with badge UI
- **Mobile Responsive** — Works on all screen sizes
- **No Backend** — 100% client-side, deployable to GitHub Pages

## 🛠 Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Hook Form
- Zod validation
- html2pdf.js
- lucide-react icons
- clsx

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 📦 Build

```bash
npm run build
```

## 🌐 Deploy to GitHub Pages

1. Update `homepage` in `package.json`:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/resume-builder"
   ```

2. Update `base` in `vite.config.ts`:
   ```ts
   base: '/resume-builder/',
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

## 📐 Layouts

| Layout | Description |
|--------|-------------|
| ATS Classic | Single-column, maximum ATS compatibility |
| Dual Column | Sidebar with skills/contact, main body for experience |
| Modern Executive | Bold dark header, accent-bordered summary |
| Technical Grid | Grid split with badge-style skills sidebar |
| Minimalist Clean | Ultra-clean typography-first design |

## 🎨 Themes

Slate Pro · Emerald Executive · Crimson Edge · Midnight Tech · Gold Prestige · Ocean Breeze · Forest Minimal · Rose Quartz · Graphite Mono · Violet Modern

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |
| `Ctrl+S` | Save version snapshot |

## 📁 Project Structure

```
src/
├── components/
│   ├── layouts/       # 5 resume layout renderers + shared components
│   ├── ui/            # Reusable UI primitives (Button, Input, Card, etc.)
│   ├── wizard/        # 6 multi-step form components
│   └── dashboard/     # ATS Dashboard + Version History
├── data/              # Themes, layouts, defaults, form guidance
├── hooks/             # useResumeState (undo/redo), useAppSettings
├── types/             # TypeScript interfaces + Zod schemas
└── utils/             # ATS engine, storage, PDF export
```

## 📄 License

MIT
