# Development Guide

## Project Overview

FutureCast List100 is a personal life-design PWA built with **Next.js 16 (App Router)**, **React 19**, **TypeScript 5**, and **Tailwind CSS 4**. It tracks life goals (List100), travel (World + China maps), cultural collections (IMDb, DG120, Books), and life-balance analytics (Life Wheel) — all persisted client-side via `localStorage`. There is no backend.

## Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm (comes with Node)
- A modern browser (Chrome, Firefox, Safari, Edge)

## Development Setup

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Type-check
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build
npm run start
```

## Architecture

### App Router (`src/app/`)

Each route is a directory containing up to three files:

| File | Purpose |
|---|---|
| `page.tsx` | Server component that dynamically imports the client page |
| `_*Page.tsx` | Client component (the actual UI) — prefixed with `_` to signal "client-only" |
| `page.module.css` | Scoped styles for this route |

Pages that depend on `localStorage` are loaded via `next/dynamic({ ssr: false })` in their `page.tsx` wrapper. This prevents hydration mismatches since server and client renders would differ.

**Example pattern:**

```tsx
// src/app/list100/page.tsx (server component)
import dynamic from "next/dynamic";
const List100Page = dynamic(() => import("./_List100Page"), { ssr: false });
export default function Page() { return <List100Page />; }
```

### Components (`src/components/`)

Reusable UI components live here. They are client components (`"use client"` at top) and use CSS Modules for scoped styling. Co-locate `*.module.css` alongside each `.tsx` file.

- `Navbar.tsx` / `Navbar.module.css` — Fixed top navigation
- `MapView.tsx` / `map.module.css` — Shared Leaflet wrapper (used by World and China)
- `ChinaSidebar.tsx`, `ChinaCityModal.tsx` — China-specific UI
- `LifeWheel/` — Sub-components: `RadarChart.tsx`, `AreaGrid.tsx`, `InsightPanel.tsx`, `DistributionChart.tsx`, `TagFrequency.tsx`, barrel-exported via `index.ts`

### Data Layer (`src/lib/`)

| File | Purpose |
|---|---|
| `data.ts` | Core localStorage hooks (`useGoals`, `useVisitedWorld`, `useVisitedChina`, `useImdbWatched`, `useDg120Listened`, `useBooksRead`, etc.) and `generateId()` |
| `lifeWheel.ts` | `useLifeWheelSummary` — aggregates goals into 8 life areas for radar visualization |
| `constants.ts` | `LIFE_AREAS` taxonomy and other shared constants |
| `export.ts` | JSON backup/import helpers for per-module and global data export |

The central hook is `useLocalStorage<T>(key, initialValue)` — it reads from `localStorage` on mount (lazy initializer), writes on set, and listens for `storage` events for cross-tab sync.

### Static Data (`src/data/`)

JSON files consumed by pages via `import`:

- `countries.json` — world countries with coordinates
- `china-provinces.json` — Chinese provinces with cities
- `china5a.json` — 5A scenic spots
- `imdb.json`, `imdb-top250-tv.json` — film/TV data
- `dg120.json` — Deutsche Grammophon recordings
- `books.json` — Tsinghua reading list

### Types (`src/types/`)

- `json.d.ts` — Module declarations for JSON imports (satisfies `resolveJsonModule` in tsconfig)

### Path Aliases

`@/*` maps to `src/*` (configured in `tsconfig.json`). Use `@/lib/data`, `@/components/Navbar`, etc.

## Data Management

### localStorage Keys

| Key | Data |
|---|---|
| `list100-items` | Goals array (`Goal[]`) |
| `visited_world` | Visited country IDs (`string[]`) |
| `china-visited-cities-v2` | Visited city IDs (`string[]`) |
| `imdb-250-watched` | Watched IMDb IDs (`string[]`) |
| `dg120-listened` | Listened DG120 IDs (`string[]`) |
| `thu-books-read` | Read book IDs (`string[]`) |

### Cross-Tab Sync

The `useLocalStorage` hook listens for the browser's native `storage` event. When a tab writes to `localStorage`, other tabs re-render automatically.

### JSON Export/Import

Each module page supports exporting its data as a JSON file. The OS page (`/os`) provides global export (all keys) and global import with legacy format detection. Helpers live in `src/lib/export.ts`.

## Design System

The single source of truth is `src/app/globals.css` — the **Atelier Qin v2.0** design system. It defines all CSS custom properties (colors, spacing, typography, radii, shadows) and shared utility classes (`.btn-primary`, `.module-card`, `.section-eyebrow`, etc.).

Key principles:
- Dark-first Zinc palette with Signal accent colors (emerald, amber, red, blue, purple)
- Geist Sans / Geist Mono font stack
- 4/8px spacing scale
- Every page uses `.page-main` + `.page-container` for consistent chrome alignment

See `README.md` (Design System section) for the full token tables and component patterns.

## Coding Standards

### TypeScript

- Strict mode is enabled — no `any`, no `@ts-ignore`, no `@ts-expect-error`
- Use `interface` for data shapes (see `Goal`, `Milestone`, `Habit` in `data.ts`)
- Prefer explicit return types on exported functions

### React

- All files accessing `localStorage` or DOM APIs must have `"use client"` at the top
- Use the provided hooks from `src/lib/data.ts` — do not read/write `localStorage` directly
- Prefer `useCallback` and `useMemo` for derived/computed values
- Use `next/dynamic({ ssr: false })` for any page that depends on `localStorage`

### Naming

- **Variables/functions**: `camelCase`
- **Components**: `PascalCase`
- **Files**: `PascalCase.tsx` for components, `camelCase.ts` for utilities
- **CSS Modules**: `*.module.css`, class names in `camelCase`

### Styling

- CSS Modules for scoped component styles
- Tailwind CSS utilities as supplement for one-off adjustments
- Use design tokens (`var(--color-*)`, `var(--spacing-*)`, etc.) — never raw hex values
- Use shared utility classes from `globals.css` instead of re-implementing common patterns

### Accessibility

- Focus rings: `2px solid var(--color-focus-ring)` on `:focus-visible`
- Touch targets: minimum 44x44px (`var(--touch-target-min)`)
- `@media (prefers-reduced-motion: reduce)` is globally applied — respect it
- Icon-only buttons require `aria-label`
- Modals use `role="dialog"` + `aria-modal` + `aria-labelledby`
- Toasts use `aria-live="polite"`

### Icons

Use inline SVG (Lucide/Heroicons style: 1.5-2.5px stroke, `stroke-linecap: round`). Emojis are permitted only as decorative inline characters (e.g., pin badges), never as structural navigation or control icons.

## Hydration Safety

Because `localStorage` is only available in the browser, any data-dependent rendering must handle the server/client mismatch:

1. **Preferred**: Wrap the page in `next/dynamic({ ssr: false })` — the component only renders on the client
2. **Alternative**: Use the lazy initializer pattern in `useLocalStorage` (reads `localStorage` synchronously on first client render, returns `initialValue` during SSR)
3. **Avoid**: Reading `localStorage` in `useEffect` without a loading state — this causes a flash of empty content

## Testing

There is no test framework installed. Verification relies on:

1. **Type checking**: `npx tsc --noEmit`
2. **Linting**: `npm run lint` (ESLint with `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`, flat config in `eslint.config.mjs`)
3. **Build**: `npm run build` — catches import errors, type issues, and Next.js-specific problems
4. **Manual browser testing**: Open the relevant page, interact, verify persistence across reload
5. **Cross-tab sync**: Open two tabs, make a change in one, verify it appears in the other

## Browser Support

- Modern evergreen browsers: Chrome, Firefox, Safari, Edge
- Required: CSS Grid, Flexbox, ES6+, `localStorage`, `crypto.randomUUID()`
- No IE11 or legacy browser support

## Deployment

**Recommended**: Vercel (zero-config for Next.js)

```bash
npm run build   # produces .next/ output
npm run start   # starts production server
```

Also works on any Node.js hosting (Railway, Render, etc.) or as a static export if you configure `next.config.ts` with `output: "export"`.
