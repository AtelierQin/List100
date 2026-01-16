class Layout {
    constructor() {
        this.basePath = this.getBasePath();
        this.init();
    }

    getBasePath() {
        return '';
    }

    init() {
        this.injectMetaTags();
        this.injectStyles();
        this.injectHeader();
        this.injectFooter();
        this.highlightActiveLink();
        this.initDropdowns();
        this.initMobileMenu();
        this.registerServiceWorker();
    }

    injectMetaTags() {
        // Enable native View Transitions API for MPAs
        if (!document.querySelector('meta[name="view-transition"]')) {
            const meta = document.createElement('meta');
            meta.name = 'view-transition';
            meta.content = 'same-origin';
            document.head.appendChild(meta);
        }

        // PWA Manifest
        if (!document.querySelector('link[rel="manifest"]')) {
            const link = document.createElement('link');
            link.rel = 'manifest';
            link.href = 'manifest.json';
            document.head.appendChild(link);
        }
        
        // PWA Theme Color (Light Mode)
        if (!document.querySelector('meta[name="theme-color"]')) {
            const meta = document.createElement('meta');
            meta.name = 'theme-color';
            meta.content = '#667eea'; // Primary color
            document.head.appendChild(meta);
        }
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    injectStyles() {
        // Future expansion
    }

    injectHeader() {
        const existingNav = document.querySelector('nav.nav');
        if (existingNav) existingNav.remove();

        const headerHTML = `
        <nav class="nav">
            <div class="nav-container">
                <a href="landing.html" class="logo">FutureCast</a>
                <div class="nav-links">
                    <a href="list100.html" class="nav-link">List100</a>
                    
                    <div class="dropdown">
                        <button class="dropdown-toggle">Tours</button>
                        <div class="dropdown-menu">
                            <a href="world.html" class="dropdown-item">World</a>
                            <a href="china.html" class="dropdown-item">China</a>
                        </div>
                    </div>
                    
                    <div class="dropdown">
                        <button class="dropdown-toggle">Collections</button>
                        <div class="dropdown-menu">
                            <a href="imdb-top-250.html" class="dropdown-item">IMDb Top 250</a>
                            <a href="dg120.html" class="dropdown-item">DG 120</a>
                            <a href="thu-book-list.html" class="dropdown-item">THU Book List</a>
                        </div>
                    </div>
                    
                    <a href="OS.html" class="nav-link">OS</a>
                </div>
                
                <!-- Mobile Menu Button -->
                <button class="mobile-menu-btn" aria-label="Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            
            <div class="mobile-menu">
                <!-- Mobile menu content mirrors desktop -->
                 <a href="list100.html" class="mobile-nav-link">List100</a>
                 <a href="world.html" class="mobile-nav-link">World Map</a>
                 <a href="china.html" class="mobile-nav-link">China Map</a>
                 <a href="OS.html" class="mobile-nav-link">OS</a>
                 <a href="imdb-top-250.html" class="mobile-nav-link">IMDb Top 250</a>
            </div>
        </nav>
        `;

        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }

    injectFooter() {
        // Only show footer on landing.html
        const currentPage = window.location.pathname.split('/').pop() || 'landing.html';
        if (currentPage !== 'landing.html' && currentPage !== '' && currentPage !== '/') {
            return;
        }

        const existingFooter = document.querySelector('footer');
        if (existingFooter) return; 

        // Simple footer if none exists
        const footerHTML = `
        <footer class="footer">
            <div class="container">
                <p>&copy; ${new Date().getFullYear()} FutureCast. Life is a collection of moments.</p>
            </div>
        </footer>
        `;
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }

    highlightActiveLink() {
        const currentPath = window.location.pathname.split('/').pop() || 'landing.html';
        const targetPath = currentPath === '' || currentPath === '/' ? 'landing.html' : currentPath;

        const links = document.querySelectorAll('.nav-link, .dropdown-item, .mobile-nav-link');
        links.forEach(link => {
            if (link.getAttribute('href') === targetPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    initDropdowns() {
        if (window.DropdownManager) {
            new window.DropdownManager();
        }
    }

    initMobileMenu() {
        const btn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (btn && mobileMenu) {
            btn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                btn.classList.toggle('open');
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Layout();
    // Clear legacy theme data
    localStorage.removeItem('theme');
    document.documentElement.removeAttribute('data-theme');
});
