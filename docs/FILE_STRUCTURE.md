# File Structure Documentation

## Overview

This document describes the organized file structure of the FutureCast List100 project.

## Directory Structure

### `/assets/` - Static Assets
Contains all static resources organized by type.

#### `/assets/css/` - Stylesheets
- **`/base/` - Base Styles**
    - `reset.css` - CSS Reset
    - `variables.css` - CSS Variables and Design Tokens
- **`/components/` - Component Styles**
    - `buttons.css` - Button styles
    - `cards.css` - Card styles
    - `forms.css` - Form element styles
    - `media-items.css` - Media item styles
    - `media-layout.css` - Media layout styles
    - `modal.css` - Modal dialog styles
    - `navbar.css` - Navigation bar styles
    - `toast.css` - Toast notification styles
- **Page-Specific Styles**
    - `global.css` - Global styles and design system
    - `landing.css` - Landing page specific styles
    - `list100.css` - List100 application styles
    - `OS.css` - OS page styles (resource management and goals display)
    - `world.css` - World travel map styles
    - `china.css` - China travel map styles
    - `goal-detail.css` - Goal detail page styles
    - `imdb-top-250.css` - IMDb Top 250 collection styles
    - `dg120.css` - DG 120 collection styles

#### `/assets/js/` - JavaScript Files
- **`/core/` - Core Logic**
    - `collection-page.js` - Base class for collection pages
    - `storage.js` - Data persistence and storage management
    - `utils.js` - Utility functions
- **`/components/` - UI Components**
    - `filters.js` - Filter component logic
    - `list-renderer.js` - List rendering logic
    - `modal.js` - Modal component logic
    - `toast.js` - Toast notification logic
- **Page-Specific Logic**
    - `list100.js` - Main List100 application logic
    - `OS.js` - OS page functionality (resource management and List100 sync)
    - `world.js` - World travel map functionality
    - `china.js` - China travel map functionality
    - `goal-detail.js` - Individual goal detail management
    - `imdb-top-250.js` - IMDb Top 250 collection functionality
    - `dg120.js` - DG 120 collection functionality
    - `dropdown.js` - Reusable dropdown menu component
    - `landing.js` - Landing page functionality

#### `/assets/data/` - Data Files
- `list100-data.json` - Sample goals and initial data
- `*-backup-*.json` - Automatic backup files

### `/docs/` - Documentation
- `DESIGN_SYSTEM.md` - Design system and style guide
- `DEVELOPMENT_GUIDE.md` - Development guide and best practices
- `FILE_STRUCTURE.md` - This file
- `Manifesto.md` - Project philosophy and vision

### Root HTML Files
- `landing.html` - Main landing page
- `list100.html` - List100 application
- `OS.html` - Resource management with List100 goals integration
- `world.html` - World travel tracking
- `china.html` - China travel tracking
- `goal-detail.html` - Individual goal details
- `imdb-top-250.html` - IMDb Top 250 collection
- `dg120.html` - DG 120 collection

## File Naming Conventions

### HTML Files
- Named to match navigation menu items
- Lowercase with hyphens for multi-word names (e.g., `imdb-top-250.html`)
- Single-word pages use exact name (e.g., `OS.html`)
- Descriptive and intuitive

### CSS Files
- Match corresponding HTML file names exactly
- `global.css` for shared styles and design system
- Modular approach for maintainability
- Examples: `OS.css`, `list100.css`, `imdb-top-250.css`

### JavaScript Files
- Match corresponding HTML file names exactly
- Contain all functionality for specific pages
- Self-contained modules with class-based architecture
- Examples: `OS.js`, `list100.js`, `dropdown.js`

### Data Files
- Descriptive names with project prefix
- JSON format for structured data
- Timestamped backup files

## Asset Organization Benefits

1. **Maintainability**: Clear separation of concerns
2. **Scalability**: Easy to add new pages and features
3. **Performance**: Optimized loading and caching
4. **Development**: Intuitive file location
5. **Deployment**: Clean production structure

## Path References

All HTML files reference assets using relative paths:
```html
<!-- CSS -->
<link rel="stylesheet" href="assets/css/global.css">
<link rel="stylesheet" href="assets/css/[page-name].css">

<!-- JavaScript -->
<script src="assets/js/[page-name].js"></script>

<!-- Data -->
fetch('./assets/data/list100-data.json')
```

## Recent Updates

### File Renaming (Latest)
- `links.css` → `OS.css` - Unified naming with page name
- `links.js` → `OS.js` - Consistent naming convention
- All references updated in `OS.html`

### Progress Component Removal
- Removed progress bars from goal detail page sidebar
- Removed progress display from OS page goal cards
- Simplified UI for cleaner design

### OS and List100 Integration
- OS page now displays List100 goals
- Synchronized tag and category filtering
- Real-time data sync via localStorage events
- Unified search across resources and goals

### Project Reorganization
- Migrated from flat structure to organized hierarchy
- All assets moved to appropriate directories
- All references updated to new paths
- Backward compatibility maintained
- No functionality lost in migration