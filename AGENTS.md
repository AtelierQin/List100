# Agent Guide for FutureCast List100

This repository contains **FutureCast List100**, a progressive web application for managing life goals and travel tracking.
It is built using **Next.js (App Router)**, **React 19**, and **Tailwind CSS 4.0**, utilizing `localStorage` to bypass backend dependencies.

## 1. Environment & Commands

### Build & Run
- **Build System**: Next.js
- **Development Server**: Use npm scripts to run the local server.
  ```bash
  # Install dependencies
  npm install

  # Run development server
  npm run dev
  
  # Build for production
  npm run build
  npm run start
  ```
- **Access**: Open `http://localhost:3000/` to start.

### Testing
- **Automated Tests**: ESLint and TypeScript compilation.
  ```bash
  npm run lint
  npx tsc --noEmit
  ```
- **Manual Testing**:
  - Open the relevant page (e.g., `/list100`) in Chrome/Firefox/Safari.
  - **Single Feature Test**: specific interactions (e.g., adding a goal, filtering) must be verified manually in the browser.
  - **Cross-page Sync**: Open two tabs (e.g., `/list100` and `/world`) and verify updates sync via the `storage` event listener configured in the Next.js hooks.

### Linting & Formatting
- **Linter**: ESLint with Next.js specific guidelines.
- **Formatting**: Use conventional Prettier formatting (4 spaces standard for HTML, but follow `.editorconfig` or ESLint rules).

## 2. Code Style & Standards

### Frontend (Next.js/React)
- **Flavor**: TypeScript/React (ES6+). App Router paradigms (`src/app/*`).
- **Client vs Server**: The app heavily relies on client-side state (`localStorage`), so ensure `"use client"` directives top files doing DOM/Storage access.
- **Naming**: `camelCase` for variables/methods, `PascalCase` for Components.
- **Async**: Use `async/await` for asynchronous operations.
- **Dependencies**: React, Next.js, Tailwind CSS, Leaflet for maps (`react-leaflet` or manual `leaflet` integration).
- **Error Handling**: Standard React error boundaries or try/catch around hooks.

### Architecture & File Structure
- `src/app/*`: Next.js App Router entry points (pages, layouts, etc.)
- `src/components/*`: Reusable UI components.
- `src/lib/*`: Utility logic, data fetching, global stores (`data.ts`).
- `src/data/*`: Static configuration JSON files (e.g., `china-provinces.json`).

### Data Management
- **Persistence**: `localStorage` via custom hooks in `src/lib/data.ts`.
- **Keys**: 
  - `list100-items`: Main goals data.
  - `visited_world`: Visited countries globally.
  - `china-visited-cities-v2`: Visited Chinese cities.
- **Synchronization**: Handled transparently by custom `useLocalStorage` hooks which listen for the browser `storage` event.

## 3. Design System & CSS

- **Tailwind CSS**: The main utility layer used across `src/app/globals.css`.
- **CSS Modules**: For specific scoped styles (e.g. `page.module.css`), supplementing standard Tailwind.
- **Typography**: Handled by Next.js `geist` fonts configured in `layout.tsx`.
- **Theme**: Dark mode styling primarily, relying on specific dark background defaults (`#09090b`).

## 4. Development Workflow for Agents

1. **Analyze**: Analyze `src/lib/data.ts` to see how states are pushed/pulled. 
2. **Modify**:
   - For UI changes: Update TSX files and Tailwind CSS classes or module styles.
   - For Logic: Update existing React hooks (`useVisitedChina`, `useGoals`). Ensure strict type-checking is satisfied.
   - **Crucial**: Keep Hydration Safety in mind when relying on `localStorage`. Avoid performing reads out of `useEffect` arrays to prevent mismatch renders.
3. **Verify**:
   - Check mobile layout via Tailwind's `md:` or CSS media queries.
   - Verify data persists after reload and triggers re-renders.
4. **Docs**: Keep README up to date.
5. **Git**: No build artifacts to commit (`.next/`, `node_modules/` ignored).
