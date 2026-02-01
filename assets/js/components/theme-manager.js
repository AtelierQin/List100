/**
 * Theme Manager - Dark/Light Mode Toggle
 * Handles theme switching with localStorage persistence and system preference detection
 */
class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.storageKey = 'app-theme';
        this.init();
    }

    init() {
        // Check for saved theme preference or default to system preference
        this.loadTheme();
        
        // Listen for system theme changes
        this.setupSystemListener();
        
        // Inject theme toggle button into navigation
        this.injectToggleButton();
    }

    loadTheme() {
        // Check localStorage first
        const savedTheme = localStorage.getItem(this.storageKey);
        
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(prefersDark ? 'dark' : 'light');
        }
    }

    setTheme(theme) {
        if (theme !== 'light' && theme !== 'dark') {
            console.warn('Invalid theme:', theme);
            return;
        }

        this.currentTheme = theme;
        
        // Apply theme to document
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }

        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor(theme);

        // Update toggle button icon
        this.updateToggleButton();

        // Save preference
        localStorage.setItem(this.storageKey, theme);

        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themechange', { 
            detail: { theme: theme } 
        }));

        console.log('Theme switched to:', theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateMetaThemeColor(theme) {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.content = theme === 'dark' ? '#16162a' : '#667eea';
        }
    }

    setupSystemListener() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Only apply system preference if user hasn't manually set a theme
        mediaQuery.addEventListener('change', (e) => {
            const savedTheme = localStorage.getItem(this.storageKey);
            if (!savedTheme) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    injectToggleButton() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.injectToggleButton());
            return;
        }

        // Find navigation container
        const navContainer = document.querySelector('.nav-container');
        if (!navContainer) return;

        // Check if button already exists
        if (navContainer.querySelector('.theme-toggle')) return;

        // Create theme toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'theme-toggle';
        toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
        toggleBtn.setAttribute('title', 'Toggle dark/light mode');
        toggleBtn.innerHTML = this.getThemeIcon();

        // Add click handler
        toggleBtn.addEventListener('click', () => this.toggleTheme());

        // Insert before mobile menu button
        const mobileMenuBtn = navContainer.querySelector('.mobile-menu-btn');
        if (mobileMenuBtn) {
            navContainer.insertBefore(toggleBtn, mobileMenuBtn);
        } else {
            navContainer.appendChild(toggleBtn);
        }
    }

    getThemeIcon() {
        return this.currentTheme === 'light' 
            ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
               </svg>`
            : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
               </svg>`;
    }

    updateToggleButton() {
        const toggleBtn = document.querySelector('.theme-toggle');
        if (toggleBtn) {
            toggleBtn.innerHTML = this.getThemeIcon();
            toggleBtn.setAttribute('aria-label', 
                this.currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
            );
        }
    }

    getCurrentTheme() {
        return this.currentTheme;
    }
}

// Auto-initialize on page load
let themeManager;
document.addEventListener('DOMContentLoaded', () => {
    themeManager = new ThemeManager();
});

// Expose to window for global access
window.ThemeManager = ThemeManager;
window.themeManager = themeManager;
