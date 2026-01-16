# Development Guide

## Project Overview

FutureCast List100 is a web application for managing life goals, resources, and travel experiences. The project follows modern web development practices with a clean, organized structure.

## Development Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)
- Text editor or IDE

### Local Development
1. Clone or download the project
2. Open `landing.html` in your browser
3. For local server development:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## File Organization

### HTML Pages
Each page is self-contained with its own CSS and JavaScript:
- `landing.html` - Project introduction and navigation
- `list100.html` - Main goal management application
- `OS.html` - Resource management with List100 goals integration
- `world.html` - World travel tracking
- `china.html` - China travel tracking
- `goal-detail.html` - Individual goal details
- `imdb-top-250.html` - IMDb Top 250 collection tracking
- `dg120.html` - DG 120 collection tracking

### CSS Architecture
- `global.css` - Base styles, design system, and shared components
- `assets/css/base/` - Foundation styles and variables
- `assets/css/components/` - Modular component styles for reusability
- Page-specific CSS files for unique styling
- Modular approach for maintainability

### JavaScript Modules
- **Core Modules**: `assets/js/core/` (Storage, Utils, CollectionPage base class)
- **Components**: `assets/js/components/` (Modal, Filters, ListRenderer, Toast)
- **Page Logic**: Page-specific scripts inherit from `CollectionPage` or use components compositionally
- `CollectionPage` provides a standard foundation for data-driven pages (IMDb, Books, etc.)
- No external dependencies - pure vanilla JavaScript
- ES6+ features used throughout (classes, async/await, arrow functions)
- Local storage for data persistence with multiple backup strategies
- Cross-page data synchronization via storage events

## Coding Standards

### HTML
- Semantic HTML5 elements
- Accessible markup (ARIA labels, proper headings)
- Clean, indented structure
- Meaningful class names

### CSS
- CSS custom properties for theming
- Mobile-first responsive design
- Consistent naming conventions
- Modular component approach

### JavaScript
- ES6+ syntax
- Class-based architecture
- Async/await for asynchronous operations
- Comprehensive error handling
- Local storage management

## Data Management

### Storage Strategy
- Primary: localStorage for persistence
- Backup: Multiple backup locations
- Export: JSON file downloads
- Import: File upload and parsing

### Data Structure

#### List100 Goals
```javascript
{
  "items": [
    {
      "id": timestamp,
      "text": "Goal title",
      "description": "Goal description",
      "tags": ["tag1", "tag2"],
      "completed": false,
      "pinned": false,
      "customOrder": 0,
      "createdAt": "ISO date string",
      "completedAt": "ISO date string",
      "lastModified": "ISO date string",
      "progress": 0-100  // Stored but not displayed in UI
    }
  ],
  "lastUpdated": "ISO date string"
}
```

#### OS Resources
```javascript
{
  "resources": [
    {
      "id": timestamp,
      "title": "Resource title",
      "url": "https://example.com",
      "description": "Resource description",
      "category": "tool|news|article|database",
      "tags": ["tag1", "tag2"],
      "favicon": "🌐",
      "dateAdded": "ISO date string"
    }
  ]
}
```

## Adding New Features

### New Page
1. Create HTML file in root directory (e.g., `newpage.html`)
2. Create corresponding CSS in `assets/css/` (e.g., `newpage.css`)
3. Create corresponding JS in `assets/js/` (e.g., `newpage.js`)
   - If creating a data collection page, extend `CollectionPage` to inherit standard functionality
4. Update navigation dropdown in all existing pages
5. Update documentation (README.md, FILE_STRUCTURE.md)
6. Test across all browsers and devices

### New Component
1. Add styles to appropriate CSS file or create shared component CSS
2. Create JavaScript class or functions (consider reusable components like `dropdown.js`)
3. Bind events and interactions
4. Test across all browsers
5. Document component usage if reusable

### Data Synchronization
When adding features that share data:
1. Use consistent localStorage keys
2. Implement storage event listeners for cross-page sync
3. Handle data conflicts and merging
4. Provide backup and recovery mechanisms
5. Test data flow between pages

## Performance Considerations

### Loading
- Minimize HTTP requests
- Optimize CSS and JavaScript
- Use efficient selectors
- Lazy load when appropriate

### Storage
- Efficient localStorage usage
- Regular cleanup of old data
- Compression for large datasets
- Backup strategies

## Browser Compatibility

### Supported Features
- CSS Grid and Flexbox
- ES6+ JavaScript
- Local Storage
- File API
- Modern event handling

### Fallbacks
- Graceful degradation for older browsers
- Progressive enhancement approach
- Feature detection over browser detection

## Testing

### Manual Testing
- Test all features in supported browsers
- Verify responsive design on different screen sizes
- Test data import/export functionality
- Verify localStorage persistence

### Automated Testing
- Consider adding unit tests for JavaScript functions
- Integration tests for data flow
- Performance testing for large datasets

## Deployment

### Static Hosting
The project can be deployed to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- Traditional web hosting

### Build Process
No build process required - pure HTML/CSS/JavaScript:
1. Upload all files maintaining directory structure
2. Ensure proper MIME types for JSON files
3. Configure server for SPA routing if needed

## Recent Updates and Changes

### File Naming Standardization (Latest)
- Renamed `links.css` → `OS.css`
- Renamed `links.js` → `OS.js`
- All page files now follow consistent naming: `pagename.html` + `pagename.css` + `pagename.js`

### UI Simplification
- Removed progress bars from goal detail page
- Removed progress percentages from OS page goal cards
- Cleaner, more focused interface
- Progress data still stored for potential future use

### OS and List100 Integration
- OS page now displays List100 goals alongside resources
- Unified tag and category filtering system
- Real-time synchronization via localStorage events
- Single search box for both resources and goals
- Goals grouped by status: Pinned, Active, Completed

### Component Architecture
- Added reusable `dropdown.js` component
- Consistent navigation across all pages
- Modular CSS with shared design system

## Maintenance

### Regular Tasks
- Update documentation when adding features
- Review and optimize performance
- Test new browser versions
- Backup user data strategies
- Clean up old localStorage backups periodically

### Version Control
- Use semantic versioning
- Tag releases
- Maintain changelog
- Document breaking changes
- Keep README.md and docs up to date

## Key Features Implementation

### OS and List100 Synchronization
The OS page displays List100 goals alongside resources:
- **Data Loading**: Loads from localStorage first, falls back to JSON file
- **Real-time Sync**: Uses storage events to detect changes
- **Unified Filtering**: Category and tag filters work across both resources and goals
- **Search Integration**: Single search box searches both resources and goals

### Progress Tracking (Removed from UI)
- Progress values are still stored in data for future use
- UI no longer displays progress bars or percentages
- Simplified design focuses on completion status only

### File Naming Convention
All page-related files use consistent naming:
- HTML: `pagename.html` or `page-name.html`
- CSS: `pagename.css` or `page-name.css`
- JS: `pagename.js` or `page-name.js`

Example: `OS.html` → `OS.css` → `OS.js`

## Troubleshooting

### Common Issues
1. **Data not saving**: Check localStorage availability and quota
2. **Styles not loading**: Verify CSS file paths and names match exactly
3. **JavaScript errors**: Check browser console for detailed error messages
4. **Import/export issues**: Verify JSON format and file structure
5. **Cross-page sync not working**: Check storage event listeners and localStorage keys
6. **File not found (404)**: Ensure file names match exactly (case-sensitive)

### Debug Mode
Enable debug logging by adding to localStorage:
```javascript
localStorage.setItem('debug', 'true');
```

### Data Recovery
If data is lost or corrupted:
1. Check `list100-backup-1` and `list100-backup-2` in localStorage
2. Look for historical backups (`list100-history-*`)
3. Use the "Recover Data" button in List100 page
4. Import from previously exported JSON files