# FutureCast List100 Optimization Roadmap

> Last updated: 2026-07-21
> Status: Next.js App Router migration complete. All core modules operational.

---

## Completed

### Phase 1 — Next.js Migration

- [x] Migrated from vanilla HTML/JS/CSS to Next.js 16 App Router
- [x] Replaced `assets/js/` module system with React components and hooks
- [x] Replaced `assets/css/base/variables.css` with `globals.css` design tokens (Atelier Qin v2.0)
- [x] Moved static data to `src/data/*.json` (countries, china-provinces, imdb, dg120, books)
- [x] Created `src/lib/data.ts` — unified localStorage hooks (`useGoals`, `useVisitedWorld`, etc.)
- [x] Implemented cross-tab sync via `storage` events in `useLocalStorage`

### Phase 2 — Core Modules

- [x] **Landing** (`/`) — Mission control dashboard with stats and navigation
- [x] **List100** (`/list100`) — Goal management with tags, milestones, pin/reorder
- [x] **Goal Detail** (`/list100/[id]`) — Deep-dive per goal with notes, milestones, habits
- [x] **World Map** (`/world`) — Leaflet-based country tracker with sidebar, search/filter
- [x] **China Map** (`/china`) — Province + city tracking, expandable lists, bilingual UI
- [x] **OS Dashboard** (`/os`) — System overview, global data export/import
- [x] **Collections** (`/collections/*`) — IMDb Top 250, IMDb Top 250 TV, DG 120, Tsinghua Books

### Phase 3 — Life Wheel

- [x] Created `src/lib/constants.ts` — LIFE_AREAS taxonomy (8 areas)
- [x] Created `src/lib/lifeWheel.ts` — `useLifeWheelSummary` aggregation hook
- [x] Created `src/components/LifeWheel/` — RadarChart, AreaGrid, InsightPanel, DistributionChart, TagFrequency
- [x] Implemented `/life-wheel` route with radar visualization and analytics

### Phase 4 — Design System

- [x] Atelier Qin v2.0: Zinc + Signal palette, Geist stack, dark-first
- [x] Shared utility classes in `globals.css` (`.btn-primary`, `.module-card`, `.section-eyebrow`, etc.)
- [x] Focus rings, touch targets (44px), reduced-motion support
- [x] Light theme via `[data-theme="light"]`

---

## In Progress

None currently active.

---

## Backlog

### High Priority

- **Cloud backup**: Sync data to GitHub Gist or similar for cross-device persistence
- **PWA improvements**: Enhance service worker, add offline indicators, improve install experience

### Medium Priority

- **Search across modules**: Global search bar in Navbar covering goals, countries, collections
- **Data visualization**: Annual review charts, completion trends, travel heatmaps
- **Keyboard shortcuts**: Quick navigation (e.g., `g` then `l` to go to List100)
- **Import from third-party**: Import goals from Notion, Todoist, or other task managers

### Low Priority

- **Multi-device sync**: Real-time sync beyond localStorage (requires backend)
- **Sharing**: Share individual goals or collections via public links
- **Internationalization (i18n)**: Extract hardcoded Chinese strings to resource files
- **Accessibility audit**: Full WCAG 2.1 AA audit with automated testing
- **Performance**: Virtual scrolling for large lists (IMDb 250, DG 120)
- **Analytics**: Usage tracking (privacy-respecting, client-side only)

---

## Priority Evaluation

| Level | Scope | Difficulty | User Value |
|---|---|---|---|
| High | Cross-cutting | High | High |
| Medium | Feature-specific | Medium | Medium |
| Low | Enhancement | Variable | Low-medium |
