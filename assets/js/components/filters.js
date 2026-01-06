/**
 * Reusable Filter Component
 * Provides consistent filtering functionality across collection pages
 */
class FilterManager {
    /**
     * Create a FilterManager instance
     * @param {Object} options - Configuration options
     * @param {Object} options.filters - Filter configuration { filterId: { getValue: fn, match: fn } }
     * @param {string} options.toggleBtnId - ID of the toggle filters button
     * @param {string} options.containerId - ID of the filters container
     * @param {string} options.clearBtnId - ID of the clear filters button
     * @param {Function} options.onFilterChange - Callback when filters change
     */
    constructor(options = {}) {
        this.filters = options.filters || {};
        this.toggleBtnId = options.toggleBtnId || 'toggleFiltersBtn';
        this.containerId = options.containerId || 'filtersContainer';
        this.clearBtnId = options.clearBtnId || 'clearFilters';
        this.onFilterChange = options.onFilterChange || null;

        this.currentFilters = {};
        this._initializeFilters();
        this._bindEvents();
    }

    /**
     * Initialize filter values
     * @private
     */
    _initializeFilters() {
        Object.keys(this.filters).forEach(filterId => {
            this.currentFilters[filterId] = '';
        });
    }

    /**
     * Bind event listeners
     * @private
     */
    _bindEvents() {
        // Bind filter change events
        Object.keys(this.filters).forEach(filterId => {
            const element = document.getElementById(filterId);
            if (element) {
                element.addEventListener('change', () => this._handleFilterChange());
            }
        });

        // Toggle button
        const toggleBtn = document.getElementById(this.toggleBtnId);
        const container = document.getElementById(this.containerId);
        if (toggleBtn && container) {
            toggleBtn.addEventListener('click', () => this._toggleFilters());
        }

        // Clear button
        const clearBtn = document.getElementById(this.clearBtnId);
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearFilters());
        }
    }

    /**
     * Handle filter change
     * @private
     */
    _handleFilterChange() {
        // Update current filter values
        Object.keys(this.filters).forEach(filterId => {
            const element = document.getElementById(filterId);
            if (element) {
                this.currentFilters[filterId] = element.value;
            }
        });

        // Trigger callback
        if (this.onFilterChange && typeof this.onFilterChange === 'function') {
            this.onFilterChange(this.currentFilters);
        }
    }

    /**
     * Toggle filters visibility
     * @private
     */
    _toggleFilters() {
        const container = document.getElementById(this.containerId);
        const toggleBtn = document.getElementById(this.toggleBtnId);

        if (!container || !toggleBtn) return;

        container.classList.toggle('hidden');
        const isHidden = container.classList.contains('hidden');

        if (isHidden) {
            toggleBtn.innerHTML = '<span class="btn-icon">⚙️</span> Filters';
            toggleBtn.classList.remove('active');
        } else {
            toggleBtn.innerHTML = '<span class="btn-icon">✖️</span> Close';
            toggleBtn.classList.add('active');
        }
    }

    /**
     * Clear all filters
     */
    clearFilters() {
        Object.keys(this.filters).forEach(filterId => {
            const element = document.getElementById(filterId);
            if (element) {
                element.value = '';
            }
            this.currentFilters[filterId] = '';
        });

        if (this.onFilterChange && typeof this.onFilterChange === 'function') {
            this.onFilterChange(this.currentFilters);
        }
    }

    /**
     * Apply filters to a data array
     * @param {Array} data - Array of items to filter
     * @returns {Array} Filtered array
     */
    applyFilters(data) {
        return data.filter(item => {
            return Object.entries(this.filters).every(([filterId, config]) => {
                const filterValue = this.currentFilters[filterId];
                if (!filterValue) return true;

                if (config.match && typeof config.match === 'function') {
                    return config.match(item, filterValue);
                }

                // Default: simple property match
                const itemValue = config.getValue ? config.getValue(item) : item[filterId];
                return itemValue === filterValue;
            });
        });
    }

    /**
     * Get current filter values
     * @returns {Object} Current filter values
     */
    getCurrentFilters() {
        return { ...this.currentFilters };
    }

    /**
     * Set filter values programmatically
     * @param {Object} filters - Filter values to set
     * @param {boolean} triggerChange - Whether to trigger the change callback
     */
    setFilters(filters, triggerChange = true) {
        Object.entries(filters).forEach(([filterId, value]) => {
            const element = document.getElementById(filterId);
            if (element) {
                element.value = value;
                this.currentFilters[filterId] = value;
            }
        });

        if (triggerChange && this.onFilterChange) {
            this.onFilterChange(this.currentFilters);
        }
    }

    /**
     * Check if any filters are active
     * @returns {boolean}
     */
    hasActiveFilters() {
        return Object.values(this.currentFilters).some(value => value !== '');
    }

    /**
     * Get count of active filters
     * @returns {number}
     */
    getActiveFilterCount() {
        return Object.values(this.currentFilters).filter(value => value !== '').length;
    }
}

/**
 * Create standard filter configurations for common use cases
 */
const FilterConfigs = {
    /**
     * Status filter (watched/unwatched, read/unread, listened/unlistened)
     * @param {Function} isMarked - Function to check if item is marked
     * @param {string} markedValue - Value for "marked" filter option
     * @param {string} unmarkedValue - Value for "unmarked" filter option
     */
    status: (isMarked, markedValue = 'watched', unmarkedValue = 'unwatched') => ({
        match: (item, filterValue) => {
            const marked = isMarked(item);
            if (filterValue === markedValue) return marked;
            if (filterValue === unmarkedValue) return !marked;
            return true;
        }
    }),

    /**
     * Year/decade filter
     * @param {string} yearField - Field name containing the year
     */
    decade: (yearField = 'year') => ({
        getValue: (item) => item[yearField],
        match: (item, filterValue) => {
            const year = item[yearField];
            const decade = getDecadeFromYear(year);
            return decade === filterValue;
        }
    }),

    /**
     * Category/genre filter with array support
     * @param {string} categoryField - Field name containing category
     */
    category: (categoryField = 'category') => ({
        match: (item, filterValue) => {
            const value = item[categoryField];
            if (Array.isArray(value)) {
                return value.includes(filterValue);
            }
            return value === filterValue;
        }
    }),

    /**
     * Rating range filter
     * @param {string} ratingField - Field name containing rating
     */
    rating: (ratingField = 'rating') => ({
        match: (item, filterValue) => {
            const rating = item[ratingField];
            return isInRatingRangeLocal(rating, filterValue);
        }
    }),

    /**
     * Period filter for date ranges
     * @param {string} periodField - Field name containing period
     */
    period: (periodField = 'recordingPeriod') => ({
        match: (item, filterValue) => {
            const period = item[periodField];
            return matchesPeriodFilterLocal(period, filterValue);
        }
    })
};

// Helper functions for filter configs
function getDecadeFromYear(year) {
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
    return 'older';
}

function isInRatingRangeLocal(rating, range) {
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

function matchesPeriodFilterLocal(period, filterValue) {
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
    module.exports = { FilterManager, FilterConfigs };
}
