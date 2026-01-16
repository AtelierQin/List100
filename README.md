# FutureCast - List100

A contemplative approach to life design—curate one hundred meaningful aspirations with intention and purpose.

## 🌟 Features

### Core Features
- **List100**: Manage your 100 life goals with tags, descriptions, and notes
- **OS**: Resource management system with List100 goals integration
  - Curated collection of useful websites and resources
  - Synchronized display of List100 goals
  - Unified tag and category filtering
- **Goal Details**: Comprehensive goal management with notes and photos
- **Travel Tracking**: 
  - World map for tracking visited countries
  - China map for tracking visited cities

### Collections
- **IMDb Top 250**: Track movies you've watched from the IMDb Top 250 list
- **DG 120**: The Anniversary Edition collection tracking

## 📁 Project Structure

```
FutureCast-List100/
├── assets/
│   ├── css/           # Stylesheets
│   │   ├── global.css        # Global styles and design system
│   │   ├── landing.css       # Landing page styles
│   │   ├── list100.css       # List100 page styles
│   │   ├── OS.css            # OS page styles (resource management)
│   │   ├── world.css         # World map styles
│   │   ├── china.css         # China map styles
│   │   ├── goal-detail.css   # Goal detail styles
│   │   ├── imdb-top-250.css  # IMDb Top 250 collection styles
│   │   └── dg120.css         # DG 120 collection styles
│   ├── js/            # JavaScript files
│   │   ├── list100.js        # List100 functionality
│   │   ├── OS.js             # OS page functionality
│   │   ├── world.js          # World map functionality
│   │   ├── china.js          # China map functionality
│   │   ├── goal-detail.js    # Goal detail functionality
│   │   ├── imdb-top-250.js   # IMDb Top 250 functionality
│   │   ├── dg120.js          # DG 120 functionality
│   │   ├── dropdown.js       # Dropdown menu component
│   │   └── landing.js        # Landing page functionality
│   └── data/          # Data files
│       ├── list100-data.json # Sample goals data
│       └── *.json            # Backup files
├── docs/              # Documentation
│   ├── DESIGN_SYSTEM.md      # Design system documentation
│   ├── DEVELOPMENT_GUIDE.md  # Development guide
│   ├── FILE_STRUCTURE.md     # File structure documentation
├── landing.html       # Landing page
├── list100.html       # Main List100 application
├── OS.html            # Resource management and List100 goals
├── world.html         # World travel map
├── china.html         # China travel map
├── goal-detail.html   # Individual goal details
├── imdb-top-250.html  # IMDb Top 250 collection
├── dg120.html         # DG 120 collection
└── README.md          # This file
```

## 🚀 Getting Started

1. Open `landing.html` in your web browser
2. Click "Begin Your Journey" to start managing your goals
3. Add, edit, and track your 100 life aspirations

## 💾 Data Management

- **Auto-save**: Data is automatically saved to localStorage every 30 seconds
- **Export**: Download your data as JSON backup files
- **Import**: Restore data from backup files
- **Recovery**: Multiple backup mechanisms ensure data safety
- **Cross-page Sync**: List100 goals automatically sync to OS page
- **Real-time Updates**: Changes reflect across all pages instantly

## 🎨 Design Philosophy

FutureCast embraces minimalist design principles with:
- Clean, intuitive interfaces
- Thoughtful typography using Inter and Playfair Display
- Subtle animations and transitions
- Responsive design for all devices

## 🛠 Technical Features

- **Pure JavaScript**: No external dependencies, vanilla JS only
- **Local Storage**: Client-side data persistence with multiple backups
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Progressive Enhancement**: Graceful degradation for older browsers
- **Accessibility**: WCAG compliant design
- **Modular Architecture**: Clean separation of concerns
- **Data Synchronization**: Real-time sync between List100 and OS pages
- **Component-based**: Reusable dropdown and UI components

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome.

## 📄 License

This project is for personal use and learning purposes.

## 📝 Recent Updates

### Latest Changes
- **File Naming**: Standardized all file names (e.g., `OS.html` + `OS.css` + `OS.js`)
- **UI Simplification**: Removed progress bars for cleaner interface
- **OS Integration**: OS page now displays List100 goals with synchronized filtering
- **Component Architecture**: Added reusable dropdown component
- **Data Sync**: Real-time synchronization between List100 and OS pages

### Key Features
- Unified tag and category system across pages
- Cross-page data synchronization
- Multiple backup strategies for data safety
- Responsive design for all screen sizes
- No external dependencies - pure vanilla JavaScript

---

*"Life is like a box of chocolates, and I've chosen 100 to taste."*