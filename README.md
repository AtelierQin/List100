# FutureCast - List100

> **A contemplative approach to life design.** Curate one hundred meaningful aspirations with intention and purpose. Built as a progressive web app with Next.js, fully offline-capable via local storage.

A unified personal operating system for tracking life goals (List100), travel (World + China maps), cultural collections (IMDb Top 250, DG 120, Tsinghua Books), and life-balance analytics (Life Wheel) — all sharing one cohesive design language.

---

## 🌟 Features

### Core Modules
- **List100** — Manage 100 life goals with tags, descriptions, milestones, pin/reorder, and JSON backup
- **Life Wheel** — Visualize how goals distribute across 8 life areas with radar chart, area grid, insights, and tag frequency
- **OS Dashboard** — System overview with yearly roadmap, milestone timeline, and global data management
- **Goal Details** — Deep-dive view per goal with notes, milestones, habits, and photo gallery

### Travel
- **World Map** — Leaflet-based exploration tracker with country sidebar, search/filter, visit records (date + notes)
- **China Map** — Province + city-level tracking, expandable province lists, bilingual UI (中/EN)

### Collections
- **IMDb Top 250** — Track films watched from the canonical list
- **DG 120** — Deutsche Grammophon's 120 essential classical recordings
- **THU Book List** — Tsinghua University recommended reading list

---

## 🎨 Design System — Atelier Qin v2.0

The project uses a self-hosted, single-source design system in `src/app/globals.css`. **Every page must consume these tokens and shared utilities** — ad-hoc styles are discouraged.

### Design Philosophy

**"Signal over Noise"** — Zinc + Signal palette, Geist stack, Mission Control aesthetic.

| Principle | Implementation |
|---|---|
| One source of truth | All colors, spacing, radii, typography live in CSS custom properties |
| Consistent chrome | Every page shares `--navbar-height` (52px) and `--page-top-offset` |
| Aligned containers | `--content-max-width: 1200px` (wide pages) / `--content-narrow: 720px` (focused pages) |
| Semantic naming | Use `--color-success`, `--color-danger`, never raw hex |
| Predictable rhythm | 4/8dp spacing scale (`--spacing-xs` → `--spacing-3xl`) |
| Accessible motion | All transitions 150–300ms via `--transition-fast` / `--transition` |

### Color Palette (Dark default)

| Token | Value | Purpose |
|---|---|---|
| `--color-bg` | `#09090b` | Page background (zinc-950) |
| `--color-surface` | `#18181b` | Module surface (zinc-900) |
| `--color-surface-translucent` | `rgba(24,24,27,0.85)` | Cards with backdrop blur |
| `--color-border` | `#27272a` | Structure (zinc-800) |
| `--color-text-primary` | `#e4e4e7` | Primary read (zinc-200) — **16.5:1 contrast on bg** |
| `--color-text-headline` | `#ffffff` | Headlines |
| `--color-text-muted` | `#71717a` | Metadata (zinc-500) |
| `--color-accent` | `#10b981` | Primary action / "Live" signal (emerald-500) |
| `--color-success` | `#10b981` | Positive state (emerald-500) |
| `--color-warning` | `#f59e0b` | Build / in-progress (amber-500) |
| `--color-danger` | `#ef4444` | Critical / destructive (red-500) |
| `--color-info` | `#3b82f6` | Network / data (blue-500) |
| `--color-purple` | `#a855f7` | Curation / taste (purple-500) |
| `--color-focus-ring` | `#34d399` | Visible 2-3px focus ring (WCAG 3:1) |

**Light theme** available via `[data-theme="light"]` on `<html>` — all tokens map to accessible light variants.

### Typography

- **Font stack**: `'Geist Sans' → 'Inter' → -apple-system → BlinkMacSystemFont → 'Segoe UI' → sans-serif`
- **Mono stack**: `'Geist Mono' → 'JetBrains Mono' → 'SF Mono' → 'Fira Code' → monospace`
- **Type scale**: 10 / 12 / 14 / 16 / 18 / 20 / 24 / 28 / 32 px (`--font-size-xs` → `--font-size-5xl`)
- **Headings**: weight 600–700, `letter-spacing: -0.02em`, color `--color-text-headline`
- **Body**: `line-height: 1.6`, weight 400
- **Data/numerics**: `font-variant-numeric: tabular-nums` for tabular alignment

### Page Chrome

Every page must follow this pattern for visual alignment:

```css
.main {
    min-height: 100vh;
    background: var(--color-bg);
    padding-top: var(--page-top-offset);  /* 52px — clears fixed navbar */
    /* NO horizontal padding here */
}

.container {
    max-width: var(--content-max-width);  /* 1200px wide, 720px narrow */
    margin: 0 auto;
    padding: 0 var(--spacing-md);          /* 24px gutter matches navbar */
    /* ... */
}
```

This guarantees the left edge of page content aligns perfectly with the navbar logo at every viewport width.

### Shared Utility Classes (in `globals.css`)

Use these in every page instead of re-implementing:

| Class | Purpose |
|---|---|
| `.btn-primary` | Accent-colored primary action (44×44px min touch target) |
| `.btn-secondary` | Outlined secondary action |
| `.btn-ghost` | Transparent hover surface |
| `.btn-danger` | Destructive action (red) |
| `.page-main` | Standard page wrapper |
| `.page-container` / `.page-container-narrow` | Standard containers |
| `.section-eyebrow` | Small-caps section label (mono, 11px, 0.12em) |
| `.module-card` | Standard card surface with top accent line |
| `.stat-row` / `.stat-label` / `.stat-value` / `.stat-unit` | Data row pattern |
| `.toast` | Bottom-centered toast notification (pair with `aria-live="polite"`) |

### Accessibility (WCAG AA+)

- **Focus rings**: 2px solid `--color-focus-ring` with 2-3px offset on all interactive elements (`:focus-visible`)
- **Touch targets**: minimum 44×44px (iOS HIG) / 48×48dp (Material) — enforced via `--touch-target-min`
- **Contrast**: text 4.5:1 minimum on dark, 7:1 on light — verified across all tokens
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` disables all non-essential animation globally
- **Screen readers**: icon-only buttons use `aria-label`; toasts use `aria-live="polite"`; modals use `role="dialog"` + `aria-modal` + `aria-labelledby`
- **Keyboard**: Tab order matches visual order; full keyboard support throughout

### Iconography

Use **inline SVG icons** (Lucide/Heroicons style: 1.5–2.5px stroke, `stroke-linecap: round`). **Emojis are permitted only as decorative inline characters** (e.g., pin badges in content lists), never as structural navigation/control glyphs.

The "No emoji as structural icons" rule applies to: navigation items, settings/control buttons, status indicators, empty states, action buttons.

---

## 📁 Project Structure

```
FutureCast-List100/
├── public/                       # Static assets
├── docs/                         # Project documentation
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── globals.css           # ★ Design System v2.0 — tokens + shared utilities
│   │   ├── layout.tsx            # Root layout (loads Geist fonts + Navbar)
│   │   ├── page.tsx              # Landing route → _LandingPage.tsx
│   │   ├── page.module.css
│   │   ├── _LandingPage.tsx      # Mission control dashboard
│   │   ├── list100/              # List100 module
│   │   │   ├── _List100Page.tsx
│   │   │   ├── page.tsx
│   │   │   ├── page.module.css
│   │   │   └── [id]/             # Goal detail route
│   │   ├── life-wheel/           # Life Wheel module (radar + analytics)
│   │   │   ├── _LifeWheelPage.tsx
│   │   │   ├── page.tsx
│   │   │   └── page.module.css
│   │   ├── world/                # World map (Leaflet)
│   │   ├── china/                # China map (Leaflet)
│   │   ├── os/                   # OS dashboard
│   │   └── collections/          # IMDb / DG120 / Books
│   ├── components/
│   │   ├── Navbar.tsx            # Fixed top nav with dropdowns
│   │   ├── Navbar.module.css
│   │   ├── MapView.tsx           # Reusable Leaflet wrapper
│   │   ├── map.module.css        # Shared map-page styles (used by world + china)
│   │   ├── ChinaSidebar.tsx      # Province/city sidebar
│   │   ├── ChinaCityModal.tsx
│   │   └── LifeWheel/            # LifeWheel sub-components
│   │       ├── RadarChart.tsx    # 8-axis SVG radar
│   │       ├── AreaGrid.tsx      # 8 area cards
│   │       ├── InsightPanel.tsx  # Milestones/habits rollups
│   │       ├── DistributionChart.tsx
│   │       ├── TagFrequency.tsx
│   │       └── index.ts          # Barrel export
│   ├── lib/
│   │   ├── data.ts               # localStorage hooks (useGoals, useVisitedWorld, etc.)
│   │   ├── lifeWheel.ts          # LifeWheel summary aggregation
│   │   ├── export.ts             # JSON backup/import helpers
│   │   └── constants.ts          # Shared constants
│   └── types/
├── AGENTS.md                     # Guide for AI Agents
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── README.md                     # This file
```

---

## 🛠 Tech Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.1.6 |
| UI Library | React | 19.2.3 |
| Styling | Tailwind CSS 4 + CSS Modules | — |
| Language | TypeScript | 5 |
| Maps | Leaflet + react-leaflet | 1.9.4 / 5.0.0 |
| Fonts | Geist Sans / Mono (CDN) | 1.3.1 |
| Data | localStorage (no backend) | — |

**Why no backend?** Personal data, privacy-first, zero infrastructure. All persistence is client-side; import/export JSON keeps data portable.

---

## 🚀 Getting Started

```bash
# Install
npm install

# Dev server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Lint
npm run lint
```

---

## 💾 Data Management

- **Auto-save** to `localStorage` via custom React hooks (`useLocalStorage` in `src/lib/data.ts`)
- **Per-module export/import** — each page can export its own JSON
- **OS page** provides global export (all `localStorage` keys) and global import (with legacy format detection)
- **Cross-tab sync** via native `storage` events

LocalStorage keys:
- `list100-items` — goals array
- `visited_world` — visited country IDs
- `china-visited-cities-v2` — visited city IDs
- `imdb-250-watched` / `dg120-listened` / `thu-books-read` — collection progress

---

## 📐 Page Map

| Route | Module | Width |
|---|---|---|
| `/` | Landing dashboard | 720px |
| `/list100` | List100 with sidebar | 1200px (280 + content) |
| `/list100/[id]` | Goal detail | 720px |
| `/life-wheel` | Life Wheel analytics | 1200px |
| `/world` | World map (full viewport) | 100vw grid |
| `/china` | China map (full viewport) | 100vw grid |
| `/os` | OS dashboard | 1200px |
| `/collections` | Collection index | 720px |
| `/collections/{imdb,dg120,books}` | Individual collections | (per-file) |

---

## 🤝 Contributing

This is a personal project, but the design system in `globals.css` is the contract — any new page or component should consume the existing tokens and shared utility classes. **Do not** introduce new hex values, new spacing increments, or new radii without updating the system first.

When adding a new page:
1. Set `.main` to use `--page-top-offset` (no horizontal padding)
2. Set `.container` to use `--content-max-width` / `--content-narrow` + horizontal `--spacing-md` padding
3. Use `.btn-primary` / `.btn-secondary` / `.btn-ghost` / `.btn-danger` instead of custom buttons
4. Use `.module-card` for surfaces, `.section-eyebrow` for labels
5. Verify focus rings, touch targets ≥44px, reduced-motion behavior

---

## 📄 License

Personal use and learning.