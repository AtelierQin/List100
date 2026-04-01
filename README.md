# FutureCast - List100

A contemplative approach to life design—curate one hundred meaningful aspirations with intention and purpose. Built as a progressive web app utilizing Next.js.

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
- **THU Books**: Tsinghua University recommended book list tracking

## 📁 Project Structure

```
FutureCast-List100/
├── public/                 # Static assets (images, icons, etc)
├── src/
│   ├── app/                # Next.js App Router entry points
│   │   ├── globals.css     # Global styles and Tailwind configuration
│   │   ├── layout.tsx      # Main layout component
│   │   ├── page.tsx        # Dashboard / Landing page
│   │   ├── list100/        # List100 module
│   │   ├── world/          # World mapping module
│   │   ├── china/          # China mapping module
│   │   ├── os/             # OS / Resources module
│   │   └── collections/    # Special collections
│   ├── components/         # Reusable React components
│   │   ├── MapView.tsx     # Leaflet map component
│   │   └── Navbar.tsx      # Application navigation
│   ├── lib/
│   │   └── data.ts         # Data persistence and business logic
│   └── data/               # Static JSON data files
├── AGENTS.md               # Guide for AI Agents development
├── next.config.ts          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file
```

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your web browser.

## 💾 Data Management

- **Auto-save**: Data is automatically saved to `localStorage` utilizing custom React hooks.
- **Export/Import**: Download your data as JSON backup files, or import it seamlessly.
- **Cross-page Sync**: Navigation syncs gracefully using native `storage` events across components.

## 🎨 Design Philosophy

FutureCast embraces minimalist design principles with:
- Clean, intuitive interfaces
- Thoughtful typography using Next.js `geist` fonts
- Deep dark-mode aesthetics (#09090b backgrounds)
- Responsive design for all devices using Tailwind CSS and CSS Modules

## 🛠 Technical Features

- **Next.js & React 19**: Modern frontend tooling utilizing server and client components cleanly.
- **Tailwind CSS 4.0**: Utility-first CSS framework for rapid and consistent styling.
- **Local Storage**: Client-side data persistence ensuring maximum privacy.
- **Leaflet**: High performance cartographic mapping visualization.
- **Component-based**: Reusable hooks and UI abstractions.

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome.

## 📄 License

This project is for personal use and learning purposes.