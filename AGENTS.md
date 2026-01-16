# Agent Guide for FutureCast List100

This repository contains **FutureCast List100**, a static web application for managing life goals and travel tracking.
It relies on pure **Vanilla JavaScript**, **CSS3**, and **HTML5** without any build tools, bundlers, or external frameworks.

## 1. Environment & Commands

### Build & Run
- **Build System**: None. The project is served as static HTML files.
- **Development Server**: Use any static file server.
  ```bash
  # Python 3
  python3 -m http.server 8000
  
  # Node.js
  npx serve .
  
  # PHP
  php -S localhost:8000
  ```
- **Access**: Open `http://localhost:8000/landing.html` to start.

### Testing
- **Automated Tests**: None.
- **Manual Testing**:
  - Open the relevant page (e.g., `list100.html`) in Chrome/Firefox/Safari.
  - **Single Feature Test**: specific interactions (e.g., adding a goal, filtering) must be verified manually in the browser console or UI.
  - **Cross-page Sync**: Open two tabs (e.g., `list100.html` and `OS.html`) and verify updates sync via `storage` events.

### Linting & Formatting
- **Linter**: No automated linter. Follow the **Code Style** section below strictly.
- **Formatting**: **4 spaces** for indentation in HTML, CSS, and JS.
- **File Encoding**: UTF-8.

## 2. Code Style & Standards

### JavaScript
- **Flavor**: Pure Vanilla JS (ES6+).
- **Paradigm**: Class-based components and page logic.
- **Indentation**: **4 spaces**.
- **Naming**: `camelCase` for variables/methods, `PascalCase` for Classes.
- **Async**: Use `async/await` for asynchronous operations (especially storage).
- **No Dependencies**: Do not introduce npm packages. Use native APIs (`fetch`, `localStorage`).
- **Error Handling**: Wrap storage and async operations in `try/catch`.
- **Comments**: JSDoc style comments for complex methods.

### HTML
- **Semantics**: Use semantic tags (`<nav>`, `<main>`, `<article>`, `<section>`).
- **Accessibility**: Ensure `aria-label`, `role`, and `alt` attributes are used correctly.
- **Indentation**: **4 spaces**.
- **Structure**: Each page (`pagename.html`) is self-contained but links to shared assets.

### CSS
- **Organization**:
  - `assets/css/global.css`: Base styles and imports.
  - `assets/css/base/variables.css`: Design tokens (colors, spacing).
  - `assets/css/pagename.css`: Page-specific styles.
- **Methodology**: Mobile-first media queries.
- **Variables**: MUST use CSS custom properties for consistency.
  - Colors: `--color-primary`, `--color-text-primary`, `--color-bg`.
  - Spacing: `--spacing-sm` (8px), `--spacing-md` (16px).
  - Fonts: `--font-family-base` (Inter), `--font-family-display` (Playfair Display).

## 3. Architecture & File Structure

### File Naming Convention
- **Strict Pattern**: Related files MUST share the same name.
  - `pagename.html`
  - `assets/css/pagename.css`
  - `assets/js/pagename.js`
- **Example**: `OS.html`, `assets/css/OS.css`, `assets/js/OS.js`.

### Directory Structure
```
/
├── *.html              # Entry points (landing.html, list100.html, etc.)
├── assets/
│   ├── css/
│   │   ├── base/       # System variables, reset
│   │   ├── components/ # Shared UI (dropdown.css, modal.css)
│   │   └── [page].css  # Page specific styles
│   ├── js/
│   │   ├── core/       # Shared logic (Storage, Utils)
│   │   ├── components/ # UI Components (Dropdown, Modal)
│   │   └── [page].js   # Page specific logic
│   └── data/           # JSON backups
└── docs/               # Documentation
```

### Data Management
- **Persistence**: `localStorage` is the primary database.
- **Keys**: 
  - `list100-items`: Main goals data.
  - `os-resources`: Resources data.
  - `world-visited`: Visited countries.
  - `china-visited`: Visited cities.
- **Synchronization**: Pages listen for `storage` events to update real-time.
- **Backup**: Application handles automatic backups to separate storage keys (e.g., `list100-backup-1`).

## 4. Design System (Summary)

Refer to `docs/DESIGN_SYSTEM.md` for full details.

- **Typography**:
  - **Headings**: Playfair Display (Serif)
  - **Body**: Inter (Sans-serif)
- **Colors**:
  - Primary: `#667eea` (Blue)
  - Background: `#fafbfc` (Off-white)
  - Surface: `#ffffff` (White)
  - Text: `#1a202c` (Primary), `#4a5568` (Secondary)
- **Components**:
  - Use `assets/js/components/dropdown.js` for menus.
  - Cards should use `.card` class with shadow variables.
  - Buttons: `.btn-primary`, `.btn-secondary`, `.btn-ghost`.
  - Transitions: Use `--transition-base` (0.2s ease).

## 5. Development Workflow for Agents

1. **Analyze**: Read `docs/DEVELOPMENT_GUIDE.md` if changing core logic.
2. **Modify**:
   - For UI changes: Update HTML then corresponding CSS.
   - For Logic: Update JS, ensuring `localStorage` integrity.
   - **Crucial**: If adding a new page, ensure it is added to the navigation in ALL other HTML pages (or the shared nav component if one exists).
3. **Verify**:
   - Check mobile view (responsive).
   - Verify data persists after reload.
   - Check console for errors (no build step to catch them).
4. **Docs**: Update `README.md` if adding new features or pages.
5. **Git**: 
   - Commit messages should be descriptive.
   - No build artifacts to commit (only source).

## 6. Common Issues & Solutions

- **Data not saving**: Check `localStorage` quota.
- **Styles missing**: Verify CSS path matches `assets/css/pagename.css`.
- **Sync failing**: Ensure `window.addEventListener('storage', ...)` is implemented.

