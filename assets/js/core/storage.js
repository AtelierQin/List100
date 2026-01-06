/**
 * Unified localStorage wrapper with namespace support
 * Provides consistent data persistence across all collection pages
 */
class DataStore {
    constructor(namespace) {
        this.namespace = namespace;
        this.prefix = `list100_${namespace}_`;
    }

    /**
     * Get a value from storage
     * @param {string} key - The key to retrieve
     * @param {*} defaultValue - Default value if key doesn't exist
     * @returns {*} The stored value or default
     */
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(this.prefix + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error(`DataStore[${this.namespace}]: Error reading ${key}`, e);
            return defaultValue;
        }
    }

    /**
     * Set a value in storage
     * @param {string} key - The key to store
     * @param {*} value - The value to store
     * @returns {boolean} Success status
     */
    set(key, value) {
        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error(`DataStore[${this.namespace}]: Error writing ${key}`, e);
            return false;
        }
    }

    /**
     * Remove a value from storage
     * @param {string} key - The key to remove
     */
    remove(key) {
        localStorage.removeItem(this.prefix + key);
    }

    /**
     * Clear all data for this namespace
     */
    clear() {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(this.prefix)) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
    }

    /**
     * Get all data for this namespace
     * @returns {Object} All stored data
     */
    getAll() {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(this.prefix)) {
                const shortKey = key.substring(this.prefix.length);
                try {
                    data[shortKey] = JSON.parse(localStorage.getItem(key));
                } catch (e) {
                    data[shortKey] = localStorage.getItem(key);
                }
            }
        }
        return data;
    }

    /**
     * Export all data as JSON
     * @returns {Object} Export object with metadata
     */
    export() {
        return {
            namespace: this.namespace,
            data: this.getAll(),
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
    }

    /**
     * Import data from export object
     * @param {Object} exportData - The exported data object
     * @param {boolean} merge - Whether to merge with existing data
     * @returns {boolean} Success status
     */
    import(exportData, merge = false) {
        try {
            if (!exportData || !exportData.data) {
                throw new Error('Invalid export data format');
            }

            if (!merge) {
                this.clear();
            }

            Object.entries(exportData.data).forEach(([key, value]) => {
                this.set(key, value);
            });

            return true;
        } catch (e) {
            console.error(`DataStore[${this.namespace}]: Import failed`, e);
            return false;
        }
    }
}

/**
 * Collection-specific store with common operations for watched/read/listened items
 */
class CollectionStore extends DataStore {
    constructor(namespace, itemKey = 'items') {
        super(namespace);
        this.itemKey = itemKey;
    }

    /**
     * Get all marked items (watched/read/listened)
     * @returns {Array} Array of marked items
     */
    getMarkedItems() {
        return this.get(this.itemKey, []);
    }

    /**
     * Save marked items
     * @param {Array} items - Items to save
     */
    saveMarkedItems(items) {
        this.set(this.itemKey, items);
    }

    /**
     * Check if an item is marked
     * @param {string|number} identifier - Item identifier
     * @param {string} identifierKey - Key to match (e.g., 'rank', 'discNumber', 'id')
     * @returns {boolean}
     */
    isMarked(identifier, identifierKey = 'id') {
        const items = this.getMarkedItems();
        return items.some(item => item[identifierKey] === identifier);
    }

    /**
     * Get a marked item by identifier
     * @param {string|number} identifier - Item identifier
     * @param {string} identifierKey - Key to match
     * @returns {Object|null}
     */
    getMarkedItem(identifier, identifierKey = 'id') {
        const items = this.getMarkedItems();
        return items.find(item => item[identifierKey] === identifier) || null;
    }

    /**
     * Add or update a marked item
     * @param {Object} item - Item to add/update
     * @param {string} identifierKey - Key to match for updates
     */
    markItem(item, identifierKey = 'id') {
        const items = this.getMarkedItems();
        const existingIndex = items.findIndex(i => i[identifierKey] === item[identifierKey]);

        if (existingIndex >= 0) {
            items[existingIndex] = { ...items[existingIndex], ...item };
        } else {
            items.push(item);
        }

        this.saveMarkedItems(items);
    }

    /**
     * Remove a marked item
     * @param {string|number} identifier - Item identifier
     * @param {string} identifierKey - Key to match
     */
    unmarkItem(identifier, identifierKey = 'id') {
        const items = this.getMarkedItems();
        const filtered = items.filter(item => item[identifierKey] !== identifier);
        this.saveMarkedItems(filtered);
    }

    /**
     * Get count of marked items
     * @returns {number}
     */
    getMarkedCount() {
        return this.getMarkedItems().length;
    }

    /**
     * Calculate statistics
     * @param {number} totalItems - Total number of items in collection
     * @returns {Object} Stats object
     */
    getStats(totalItems) {
        const markedCount = this.getMarkedCount();
        const percentage = totalItems > 0 ? Math.round((markedCount / totalItems) * 100) : 0;
        return {
            marked: markedCount,
            total: totalItems,
            percentage
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DataStore, CollectionStore };
}
