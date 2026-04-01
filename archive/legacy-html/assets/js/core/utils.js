/**
 * Common utility functions shared across collection pages
 */

/**
 * Debounce function to limit how often a function can fire
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit how often a function can fire
 * @param {Function} func - Function to throttle
 * @param {number} limit - Minimum time between calls in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Get decade string from year
 * @param {number} year - The year
 * @returns {string} Decade string (e.g., "1990s")
 */
function getDecade(year) {
    if (year >= 2020) return '2020s';
    if (year >= 2010) return '2010s';
    if (year >= 2000) return '2000s';
    if (year >= 1990) return '1990s';
    if (year >= 1980) return '1980s';
    if (year >= 1970) return '1970s';
    if (year >= 1960) return '1960s';
    if (year >= 1950) return '1950s';
    if (year >= 1940) return '1940s';
    if (year >= 1930) return '1930s';
    if (year >= 1920) return '1920s';
    return 'older';
}

/**
 * Check if a rating is within a specified range
 * @param {number} rating - The rating to check
 * @param {string} range - The range string (e.g., "8.5-8.9", "9.0+")
 * @returns {boolean}
 */
function isInRatingRange(rating, range) {
    if (!range) return true;

    if (range.endsWith('+')) {
        const min = parseFloat(range.slice(0, -1));
        return rating >= min;
    }

    const [minStr, maxStr] = range.split('-');
    const min = parseFloat(minStr);
    const max = parseFloat(maxStr);
    return rating >= min && rating < max + 0.1;
}

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale for formatting
 * @returns {string} Formatted date string
 */
function formatDate(date, locale = 'zh-CN') {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString(locale);
}

/**
 * Get today's date in ISO format (YYYY-MM-DD)
 * @returns {string}
 */
function getTodayISO() {
    return new Date().toISOString().split('T')[0];
}

/**
 * Truncate text to specified length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string}
 */
function truncateText(text, maxLength = 100) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Download data as JSON file
 * @param {Object} data - Data to download
 * @param {string} filename - Filename without extension
 */
function downloadAsJson(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${getTodayISO()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Read file as JSON
 * @param {File} file - File to read
 * @returns {Promise<Object>} Parsed JSON data
 */
function readFileAsJson(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                resolve(data);
            } catch (error) {
                reject(new Error('Invalid JSON file'));
            }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
}

/**
 * Safe query selector with null check
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (defaults to document)
 * @returns {Element|null}
 */
function $(selector, parent = document) {
    return parent.querySelector(selector);
}

/**
 * Safe query selector all
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (defaults to document)
 * @returns {NodeList}
 */
function $$(selector, parent = document) {
    return parent.querySelectorAll(selector);
}

/**
 * Create element with attributes and content
 * @param {string} tag - Tag name
 * @param {Object} attrs - Attributes object
 * @param {string|Element|Array} content - Content (string, element, or array of elements)
 * @returns {Element}
 */
function createElement(tag, attrs = {}, content = null) {
    const el = document.createElement(tag);

    Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'className') {
            el.className = value;
        } else if (key === 'dataset') {
            Object.entries(value).forEach(([dataKey, dataValue]) => {
                el.dataset[dataKey] = dataValue;
            });
        } else if (key.startsWith('on') && typeof value === 'function') {
            el.addEventListener(key.substring(2).toLowerCase(), value);
        } else {
            el.setAttribute(key, value);
        }
    });

    if (content !== null) {
        if (typeof content === 'string') {
            el.innerHTML = content;
        } else if (Array.isArray(content)) {
            content.forEach(child => el.appendChild(child));
        } else if (content instanceof Element) {
            el.appendChild(content);
        }
    }

    return el;
}

/**
 * Add event listener with delegation
 * @param {Element} parent - Parent element
 * @param {string} event - Event type
 * @param {string} selector - CSS selector for delegation
 * @param {Function} handler - Event handler
 */
function delegate(parent, event, selector, handler) {
    parent.addEventListener(event, (e) => {
        const target = e.target.closest(selector);
        if (target && parent.contains(target)) {
            handler.call(target, e, target);
        }
    });
}

/**
 * Check if recording period matches a filter range
 * @param {string} period - Recording period (e.g., "1959-1960")
 * @param {string} filterValue - Filter value (e.g., "1950s-1960s")
 * @returns {boolean}
 */
function matchesPeriodFilter(period, filterValue) {
    if (!filterValue) return true;

    const periodRanges = {
        '1900s-1920s': ['190', '191', '192'],
        '1930s-1940s': ['193', '194'],
        '1950s-1960s': ['195', '196'],
        '1970s-1980s': ['197', '198'],
        '1990s-2000s': ['199', '200'],
        '2010s-2020s': ['201', '202']
    };

    const prefixes = periodRanges[filterValue];
    if (!prefixes) return true;

    return prefixes.some(prefix => period.includes(prefix));
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        getDecade,
        isInRatingRange,
        formatDate,
        getTodayISO,
        truncateText,
        escapeHtml,
        downloadAsJson,
        readFileAsJson,
        $,
        $$,
        createElement,
        delegate,
        matchesPeriodFilter
    };
}
