# File Structure Documentation

## Overview

This document describes the organized file structure of the FutureCast List100 project.

## Directory Structure

### `/assets/` - Static Assets
Contains all static resources organized by type.

#### `/assets/css/` - Stylesheets
- `global.css` - Global styles and design system
- `landing.css` - Landing page specific styles
- `list100.css` - List100 application styles
- `links.css` - Resource links page styles
- `world.css` - World travel map styles
- `china.css` - China travel map styles
- `goal-detail.css` - Goal detail page styles

#### `/assets/js/` - JavaScript Files
- `list100.js` - Main List100 application logic
- `links.js` - Resource links management
- `world.js` - World travel map functionality
- `china.js` - China travel map functionality
- `goal-detail.js` - Individual goal detail management

#### `/assets/data/` - Data Files
- `list100-data.json` - Sample goals and initial data
- `*-backup-*.json` - Automatic backup files

### `/docs/` - Documentation
- `DESIGN_SYSTEM.md` - Design system and style guide
- `FILE_STRUCTURE.md` - This file

### Root HTML Files
- `landing.html` - Main landing page
- `list100.html` - List100 application
- `OS.html` - Resource links collection
- `world.html` - World travel tracking
- `china.html` - China travel tracking
- `goal-detail.html` - Individual goal details

## File Naming Conventions

### HTML Files
- Named to match navigation menu items
- Lowercase with hyphens for multi-word names
- Descriptive and intuitive

### CSS Files
- Match corresponding HTML file names
- `global.css` for shared styles
- Modular approach for maintainability

### JavaScript Files
- Match corresponding HTML file names
- Contain all functionality for specific pages
- Self-contained modules

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

## Migration Notes

The project was reorganized from a flat structure to this organized hierarchy:
- Old files moved to appropriate asset directories
- All references updated to new paths
- Backward compatibility maintained
- No functionality lost in migration