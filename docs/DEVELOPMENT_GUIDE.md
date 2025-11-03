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
- `links.html` - Resource collection and management
- `world.html` - World travel tracking
- `china.html` - China travel tracking
- `goal-detail.html` - Individual goal details

### CSS Architecture
- `global.css` - Base styles, design system, and shared components
- Page-specific CSS files for unique styling
- Modular approach for maintainability

### JavaScript Modules
- Each page has its own JavaScript file
- No external dependencies
- ES6+ features used throughout
- Local storage for data persistence

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
      "progress": 0-100
    }
  ]
}
```

## Adding New Features

### New Page
1. Create HTML file in root directory
2. Create corresponding CSS in `assets/css/`
3. Create corresponding JS in `assets/js/`
4. Update navigation in all existing pages
5. Update documentation

### New Component
1. Add styles to appropriate CSS file
2. Create JavaScript class or functions
3. Bind events and interactions
4. Test across all browsers

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

## Maintenance

### Regular Tasks
- Update documentation
- Review and optimize performance
- Test new browser versions
- Backup user data strategies

### Version Control
- Use semantic versioning
- Tag releases
- Maintain changelog
- Document breaking changes

## Troubleshooting

### Common Issues
1. **Data not saving**: Check localStorage availability
2. **Styles not loading**: Verify CSS file paths
3. **JavaScript errors**: Check browser console
4. **Import/export issues**: Verify JSON format

### Debug Mode
Enable debug logging by adding to localStorage:
```javascript
localStorage.setItem('debug', 'true');
```