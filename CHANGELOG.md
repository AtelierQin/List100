# Changelog

All notable changes to the FutureCast List100 project will be documented in this file.

## [Latest] - 2024-11-08

### Changed
- **File Naming Standardization**
  - Renamed `links.css` → `OS.css`
  - Renamed `links.js` → `OS.js`
  - All page files now follow consistent naming convention

### Removed
- **UI Simplification**
  - Removed progress bars from goal detail page sidebar
  - Removed progress percentages from OS page goal cards
  - Cleaner, more focused interface

### Added
- **OS and List100 Integration**
  - OS page now displays List100 goals alongside resources
  - Unified tag and category filtering system
  - Real-time synchronization via localStorage events
  - Single search box for both resources and goals
  - Goals grouped by status: Pinned, Active, Completed

- **Component Architecture**
  - Added reusable `dropdown.js` component
  - Consistent navigation across all pages

### Documentation
- Updated README.md with latest project structure
- Updated FILE_STRUCTURE.md with current file organization
- Updated DEVELOPMENT_GUIDE.md with recent changes and features
- Added "Recent Updates" section to all main documentation

## Previous Updates

### Project Reorganization
- Migrated from flat structure to organized hierarchy
- All assets moved to `assets/css/`, `assets/js/`, `assets/data/`
- All references updated to new paths
- Backward compatibility maintained

### Collections Added
- IMDb Top 250 collection tracking
- DG 120 collection tracking

### Travel Features
- World map for tracking visited countries
- China map for tracking visited cities

### Core Features
- List100 goal management system
- Goal detail pages with notes and photos
- Tag-based organization
- Multiple backup strategies
- Import/export functionality
