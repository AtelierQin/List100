# FutureCast Design System — Atelier Qin v2.0

## Overview

**"Signal over Noise"** — The Atelier Qin design system uses a Zinc + Signal palette, Geist font stack, and Mission Control aesthetic. All design tokens and shared utilities live in a single source of truth: `src/app/globals.css`.

- Dark-first: default theme is dark zinc; light theme available via `[data-theme="light"]` on `<html>`
- Semantic naming: use `var(--color-success)`, never raw hex
- Every page shares the same chrome alignment (`--navbar-height`, `--page-top-offset`)

---

## Design Tokens

All values below are CSS custom properties defined in `:root` inside `globals.css`.

### Backgrounds

| Token | Value | Purpose |
|---|---|---|
| `--color-bg` | `#09090b` | Page background (zinc-950) |
| `--color-surface` | `#18181b` | Module surface (zinc-900) |
| `--color-surface-elevated` | `#18181b` | Elevated surface |
| `--color-surface-hover` | `#27272a` | Hover state (zinc-800) |
| `--color-surface-deep` | `rgba(0,0,0,0.2)` | Deep inputs/terminal |
| `--color-surface-translucent` | `rgba(24,24,27,0.85)` | Cards with backdrop blur |
| `--color-overlay` | `rgba(9,9,11,0.85)` | Overlay |

### Borders

| Token | Value | Purpose |
|---|---|---|
| `--color-border` | `#27272a` | Structure (zinc-800) |
| `--color-border-light` | `rgba(255,255,255,0.05)` | Subtle dividers |
| `--color-border-hover` | `#3f3f46` | Active/hover (zinc-700) |

### Typography Colors

| Token | Value | Purpose |
|---|---|---|
| `--color-text-primary` | `#e4e4e7` | Primary read (zinc-200) |
| `--color-text-headline` | `#ffffff` | Headlines |
| `--color-text-secondary` | `#a1a1aa` | Secondary (zinc-400) |
| `--color-text-muted` | `#71717a` | Metadata (zinc-500) |
| `--color-text-light` | `#52525b` | Light (zinc-600) |
| `--color-text-on-primary` | `#ffffff` | Text on accent backgrounds |

### Signal Colors

| Token | Value | Purpose |
|---|---|---|
| `--color-success` | `#10b981` | Positive / Growth (emerald-500) |
| `--color-success-light` | `rgba(16,185,129,0.1)` | Success tint |
| `--color-danger` | `#ef4444` | Critical / Destructive (red-500) |
| `--color-danger-light` | `rgba(239,68,68,0.1)` | Danger tint |
| `--color-warning` | `#f59e0b` | Build / In-progress (amber-500) |
| `--color-warning-light` | `rgba(245,158,11,0.1)` | Warning tint |
| `--color-info` | `#3b82f6` | Network / Data (blue-500) |
| `--color-info-light` | `rgba(59,130,246,0.1)` | Info tint |
| `--color-purple` | `#a855f7` | Curation / Taste (purple-500) |
| `--color-purple-light` | `rgba(168,85,247,0.1)` | Purple tint |
| `--color-teal` | `#14b8a6` | TV / Binge (teal-500) |
| `--color-teal-light` | `rgba(20,184,166,0.1)` | Teal tint |

### Accent

| Token | Value | Purpose |
|---|---|---|
| `--color-accent` | `#10b981` | Primary action (emerald-500) |
| `--color-accent-hover` | `#059669` | Accent hover |
| `--color-accent-light` | `rgba(16,185,129,0.1)` | Accent tint |

### Focus Ring

| Token | Value | Purpose |
|---|---|---|
| `--color-focus-ring` | `#34d399` | WCAG-visible 2px focus ring (emerald-400, 3:1 contrast) |

### Spacing (4px grid)

| Token | Value |
|---|---|
| `--spacing-xs` | `8px` |
| `--spacing-sm` | `16px` |
| `--spacing-md` | `24px` |
| `--spacing-lg` | `32px` |
| `--spacing-xl` | `48px` |
| `--spacing-2xl` | `64px` |
| `--spacing-3xl` | `96px` |

### Border Radius

| Token | Value |
|---|---|
| `--border-radius-sm` | `4px` |
| `--border-radius` | `6px` |
| `--border-radius-lg` | `8px` |
| `--border-radius-xl` | `12px` |
| `--border-radius-full` | `9999px` |

### Shadows

| Token | Value |
|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.4)` |
| `--shadow-lg` | `0 10px 25px rgba(0,0,0,0.5)` |
| `--shadow-xl` | `0 20px 40px rgba(0,0,0,0.5)` |
| `--shadow-card` | `0 2px 8px rgba(0,0,0,0.3), 0 0 1px rgba(255,255,255,0.05)` |
| `--shadow-elevated` | `0 8px 24px rgba(0,0,0,0.5), 0 0 1px rgba(255,255,255,0.08)` |

### Typography

| Token | Value |
|---|---|
| `--font-family` | `'Geist Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--font-family-mono` | `'Geist Mono', 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace` |
| `--font-size-xs` | `10px` |
| `--font-size-sm` | `12px` |
| `--font-size-base` | `14px` |
| `--font-size-lg` | `16px` |
| `--font-size-xl` | `18px` |
| `--font-size-2xl` | `20px` |
| `--font-size-3xl` | `24px` |
| `--font-size-4xl` | `28px` |
| `--font-size-5xl` | `32px` |

### Page Chrome

| Token | Value | Purpose |
|---|---|---|
| `--navbar-height` | `52px` | Fixed navbar height |
| `--page-top-offset` | `52px` | Padding-top for `.page-main` |
| `--content-max-width` | `1200px` | Wide page container |
| `--content-narrow` | `720px` | Focused/narrow container |

### Transitions

| Token | Value |
|---|---|
| `--transition-fast` | `0.15s ease-out` |
| `--transition-base` / `--transition` | `0.2s ease-out` |
| `--transition-slow` | `0.3s ease-out` |
| `--transition-spring` | `0.3s cubic-bezier(0.34,1.56,0.64,1)` |

### Touch & Interaction

| Token | Value | Purpose |
|---|---|---|
| `--touch-target-min` | `44px` | Minimum touch target (Apple HIG) |
| `--press-scale` | `0.97` | Active/press feedback scale |
| `--stagger-step` | `40ms` | Stagger animation rhythm |

---

## Page Chrome Pattern

Every page must follow this structure for visual alignment with the navbar:

```css
.main {
    min-height: 100vh;
    background: var(--color-bg);
    padding-top: var(--page-top-offset);  /* 52px — clears fixed navbar */
}

.container {
    max-width: var(--content-max-width);  /* 1200px */
    margin: 0 auto;
    padding: var(--spacing-lg) var(--spacing-md) var(--spacing-2xl);
}
```

Or for narrow pages:

```css
.container {
    max-width: var(--content-narrow);  /* 720px */
}
```

This can also be achieved via the shared utility classes `.page-main`, `.page-container`, and `.page-container-narrow`.

---

## Shared Utility Classes

These classes are defined in `globals.css` and should be used instead of re-implementing common patterns.

### Buttons

| Class | Description |
|---|---|
| `.btn-base` | Base button with touch target, press feedback, disabled state |
| `.btn-primary` | Emerald accent button for primary actions |
| `.btn-secondary` | Outlined button for secondary actions |
| `.btn-ghost` | Transparent button for tertiary actions |
| `.btn-danger` | Red button for destructive actions |

All buttons enforce `min-height: var(--touch-target-min)` (44px).

### Page Layout

| Class | Description |
|---|---|
| `.page-main` | Standard page wrapper (full viewport, bg, padding-top) |
| `.page-container` | Standard container (max-width 1200px, centered, horizontal padding) |
| `.page-container-narrow` | Narrow container (max-width 720px) |

### Labels & Typography

| Class | Description |
|---|---|
| `.section-eyebrow` | Small-caps mono label (11px, 0.12em, muted color) |
| `.module-label` | Bold uppercase label (10px, 0.1em) |
| `.font-mono` | Apply mono font stack |

### Cards & Surfaces

| Class | Description |
|---|---|
| `.module-card` | Translucent card with border, shadow, and top accent line |
| `.stat-row` | Data row (flex, border-bottom, hover, min-height 44px) |
| `.stat-label` | Row label (11px uppercase) |
| `.stat-value` | Row value (mono, tabular-nums) |
| `.stat-unit` | Row unit (11px mono, muted) |

### Feedback

| Class | Description |
|---|---|
| `.toast` | Fixed bottom-center toast notification (backdrop blur, slideUp animation) |
| `.sr-only` | Screen-reader-only content |
| `.hidden` | `display: none !important` |
| `.animate-fade-in` | fadeIn animation |

---

## Component Patterns

### Module Card

The standard surface for sidebars, panels, and content containers:

```html
<div class="module-card">
    <!-- content with border, shadow, translucent background, and top accent line -->
</div>
```

### Stat Row

For displaying key-value data:

```html
<div class="stat-row">
    <span class="stat-label">Goals</span>
    <span class="stat-value">42</span>
    <span class="stat-unit">active</span>
</div>
```

### Section Eyebrow

For section headings:

```html
<p class="section-eyebrow">Overview</p>
```

### Toast

For transient notifications:

```html
<div class="toast" role="status" aria-live="polite">Saved successfully</div>
```

---

## Accessibility

- **Focus rings**: 2px solid `--color-focus-ring` with 2-3px offset on all interactive elements (`:focus-visible`)
- **Touch targets**: minimum 44x44px enforced via `--touch-target-min`
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` globally disables animations and transitions
- **Screen readers**: icon-only buttons use `aria-label`, modals use `role="dialog"` + `aria-modal`, toasts use `aria-live="polite"`
- **Keyboard**: Tab order matches visual order; full keyboard navigation throughout

---

## Light Theme

Available by setting `data-theme="light"` on `<html>`. All tokens map to accessible light variants:

| Token | Light Value |
|---|---|
| `--color-bg` | `#fafafa` |
| `--color-surface` | `#ffffff` |
| `--color-border` | `#e4e4e7` |
| `--color-text-primary` | `#18181b` |
| `--color-text-headline` | `#09090b` |

---

## Iconography

Use **inline SVG icons** (Lucide/Heroicons style: 1.5-2.5px stroke, `stroke-linecap: round`).

**Emojis are permitted only as decorative inline characters** (e.g., pin badges in content lists). Never use emoji as structural navigation, control buttons, status indicators, or action icons.

---

## Source of Truth

All tokens and utilities are defined in: **`src/app/globals.css`**

For a high-level overview: see `README.md` (Design System section).
For historical v1.0 spec: see `docs/The_Atelier_Design_System.md` (superseded by v2.0).
