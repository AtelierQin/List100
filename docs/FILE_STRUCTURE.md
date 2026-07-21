# File Structure Documentation

## Overview

FutureCast List100 is a **Next.js 16 App Router** project. All source code lives under `src/`, with configuration files at the project root.

## Directory Tree

```
List100/
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript config (strict, @/* path alias)
├── next.config.ts                  # Next.js configuration
├── postcss.config.mjs              # PostCSS config for Tailwind CSS 4
├── eslint.config.mjs               # ESLint flat config (next/core-web-vitals + typescript)
├── AGENTS.md                       # AI agent guide
├── README.md                       # Project documentation
│
├── public/                         # Static assets served at /
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── src/
│   ├── app/                        # Next.js App Router — pages and layouts
│   │   ├── globals.css             # ★ Design system (Atelier Qin v2.0) — tokens + utilities
│   │   ├── layout.tsx              # Root layout (loads Geist fonts + Navbar)
│   │   ├── favicon.ico
│   │   ├── page.tsx                # Landing route → dynamic import of _LandingPage
│   │   ├── page.module.css
│   │   ├── _LandingPage.tsx        # Mission control dashboard (client)
│   │   │
│   │   ├── list100/
│   │   │   ├── page.tsx            # Server wrapper → dynamic import
│   │   │   ├── _List100Page.tsx    # Goal management UI (client)
│   │   │   ├── page.module.css
│   │   │   └── [id]/               # Dynamic route: goal detail
│   │   │       ├── page.tsx
│   │   │       ├── _GoalDetailPage.tsx
│   │   │       └── page.module.css
│   │   │
│   │   ├── life-wheel/
│   │   │   ├── page.tsx
│   │   │   ├── _LifeWheelPage.tsx  # Radar chart + analytics (client)
│   │   │   └── page.module.css
│   │   │
│   │   ├── world/
│   │   │   ├── page.tsx
│   │   │   ├── _WorldPage.tsx      # Leaflet world map (client)
│   │   │   └── page.module.css
│   │   │
│   │   ├── china/
│   │   │   ├── page.tsx
│   │   │   ├── _ChinaPage.tsx      # Leaflet China map (client)
│   │   │   └── page.module.css
│   │   │
│   │   ├── os/
│   │   │   ├── page.tsx
│   │   │   ├── _OSPage.tsx         # System overview dashboard (client)
│   │   │   └── page.module.css
│   │   │
│   │   └── collections/
│   │       ├── page.tsx            # Collection index page
│   │       ├── page.module.css
│   │       ├── imdb/               # IMDb Top 250 films
│   │       ├── imdb-tv/            # IMDb Top 250 TV
│   │       ├── dg120/              # Deutsche Grammophon 120
│   │       └── books/              # Tsinghua reading list
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── Navbar.tsx              # Fixed top navigation with dropdowns
│   │   ├── Navbar.module.css
│   │   ├── MapView.tsx             # Shared Leaflet wrapper (World + China)
│   │   ├── map.module.css
│   │   ├── ChinaSidebar.tsx        # Province/city sidebar
│   │   ├── ChinaCityModal.tsx
│   │   └── LifeWheel/              # LifeWheel sub-components
│   │       ├── index.ts            # Barrel export
│   │       ├── RadarChart.tsx
│   │       ├── RadarChart.module.css
│   │       ├── AreaGrid.tsx
│   │       ├── AreaGrid.module.css
│   │       ├── InsightPanel.tsx
│   │       ├── InsightPanel.module.css
│   │       ├── DistributionChart.tsx
│   │       ├── DistributionChart.module.css
│   │       ├── TagFrequency.tsx
│   │       └── TagFrequency.module.css
│   │
│   ├── lib/                        # Utility logic, hooks, constants
│   │   ├── data.ts                 # localStorage hooks (useGoals, useVisitedWorld, etc.)
│   │   ├── lifeWheel.ts            # useLifeWheelSummary aggregation hook
│   │   ├── constants.ts            # LIFE_AREAS taxonomy and shared constants
│   │   └── export.ts               # JSON backup/import helpers
│   │
│   ├── data/                       # Static JSON data files
│   │   ├── countries.json          # World countries with coordinates
│   │   ├── china-provinces.json    # Chinese provinces with cities
│   │   ├── china5a.json            # 5A scenic spots
│   │   ├── imdb.json               # IMDb Top 250 films
│   │   ├── imdb-top250-tv.json     # IMDb Top 250 TV
│   │   ├── dg120.json              # Deutsche Grammophon recordings
│   │   └── books.json              # Tsinghua reading list
│   │
│   └── types/
│       └── json.d.ts               # Module declarations for JSON imports
│
├── docs/                           # Project documentation
│   ├── DEVELOPMENT_GUIDE.md        # Development setup and architecture guide
│   ├── FILE_STRUCTURE.md           # This file
│   ├── DESIGN_SYSTEM.md            # Design system reference (Atelier Qin v2.0)
│   ├── OPTIMIZATION_ROADMAP.md     # Optimization roadmap and status
│   ├── The_Atelier_Design_System.md # Detailed design system spec
│   ├── list100/                    # Exported goal data snapshots
│   └── superpowers/                # Historical specs and plans
│       ├── specs/                  # Feature specifications
│       └── plans/                  # Implementation plans
│
├── archive/                        # Archived/legacy files
├── Details/                        # Detail view data
└── .agent/                         # Agent workflow configs
    └── workflows/
        └── ui-ux-pro-max.md
```

## Naming Conventions

### Underscore Prefix (`_`)

Files prefixed with `_` (e.g., `_List100Page.tsx`, `_LandingPage.tsx`) are **client components** loaded via `next/dynamic({ ssr: false })`. This convention makes it immediately clear which files run on the client vs. the server.

- `page.tsx` — Server component (thin wrapper, dynamic import)
- `_*Page.tsx` — Client component (actual UI logic)

### CSS Modules

Styles are scoped via CSS Modules: `*.module.css`. Every page and most components have a co-located module CSS file. Class names are written in `camelCase` in TSX.

### JSON Data Files

Static data lives in `src/data/*.json`. These are imported directly via `resolveJsonModule` (configured in tsconfig) and declared in `src/types/json.d.ts`.

## Adding a New Page Route

1. Create a directory under `src/app/` (e.g., `src/app/my-page/`)
2. Create three files:
   - `page.tsx` — Server wrapper with `next/dynamic` import
   - `_MyPagePage.tsx` — Client component with `"use client"` directive
   - `page.module.css` — Scoped styles using design tokens from `globals.css`
3. Add navigation link in `src/components/Navbar.tsx`
4. Follow the page chrome pattern: use `.page-main` + `.page-container` classes
5. Run `npx tsc --noEmit` and `npm run build` to verify

## Adding a New Component

1. Create `src/components/MyComponent.tsx` with `"use client"` at top
2. Create `src/components/MyComponent.module.css` with scoped styles
3. Import design tokens from `globals.css` — never use raw hex values
4. Export from the component file; import where needed
5. For groups of related components, use a subdirectory with `index.ts` barrel export (see `LifeWheel/`)
