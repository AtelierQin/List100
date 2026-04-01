/**
 * Base Collection Page Class
 * Provides common functionality for all collection pages (IMDb, DG120, THU Books)
 */
class CollectionPage {
    /**
     * Create a CollectionPage instance
     * @param {Object} options - Configuration options
     */
    constructor(options = {}) {
        // Data
        this.namespace = options.namespace || 'collection';
        this.allItems = options.items || [];
        this.filteredItems = [...this.allItems];
        this.currentItem = null;

        // Identifiers
        this.itemIdField = options.itemIdField || 'id';
        this.itemTitleField = options.itemTitleField || 'title';

        // Storage
        this.store = new CollectionStore(this.namespace, 'markedItems');

        // Components
        this.modal = null;
        this.filterManager = null;
        this.listRenderer = null;
        this.sidebarRenderer = null;
        this.toast = getToast();

        // Callbacks
        this.renderItemCard = options.renderItemCard || null;
        this.renderSidebarItem = options.renderSidebarItem || null;
        this.populateModal = options.populateModal || null;

        // Labels
        this.labels = {
            markedLabel: options.markedLabel || 'Marked',
            unmarkedLabel: options.unmarkedLabel || 'Not Marked',
            markBtnText: options.markBtnText || 'Mark',
            unmarkBtnText: options.unmarkBtnText || 'Unmark',
            resultsCountSuffix: options.resultsCountSuffix || 'items',
            emptyListMessage: options.emptyListMessage || 'No items found',
            emptySidebarMessage: options.emptySidebarMessage || 'No items marked yet',
            ...options.labels
        };

        // Element IDs
        this.elementIds = {
            listContainer: 'itemsList',
            resultsCount: 'resultsCount',
            modal: 'itemModal',
            closeModal: 'closeModal',
            markBtn: 'markBtn',
            removeBtn: 'removeBtn',
            sidebarList: 'markedList',
            sidebarCount: 'markedCount',
            markedCount: 'markedCount',
            markedPercentage: 'markedPercentage',
            totalItems: 'totalItems',
            exportBtn: 'exportDataBtn',
            importBtn: 'importDataBtn',
            importInput: 'importFileInput',
            clearAllBtn: 'clearAllBtn',
            ...options.elementIds
        };

        // Filter configuration
        this.filterConfig = options.filterConfig || {};
    }

    /**
     * Initialize the page
     */
    init() {
        this._initStorage();
        this._initModal();
        this._initFilters();
        this._initListRenderer();
        this._initSidebarRenderer();
        this._initDataManagement();
        this._render();
    }

    /**
     * Initialize storage
     * @private
     */
    _initStorage() {
        // Storage is already initialized in constructor
    }

    /**
     * Initialize modal
     * @private
     */
    _initModal() {
        this.modal = new Modal({
            modalId: this.elementIds.modal,
            closeBtnId: this.elementIds.closeModal,
            onOpen: (item) => {
                if (this.populateModal) {
                    const isMarked = this.isItemMarked(item);
                    this.populateModal(item, isMarked, this.getMarkedItemData(item));
                }
            }
        });

        // Bind mark/unmark button
        const markBtn = document.getElementById(this.elementIds.markBtn);
        if (markBtn) {
            markBtn.addEventListener('click', () => this.toggleMarkStatus());
        }

        // Bind remove button
        const removeBtn = document.getElementById(this.elementIds.removeBtn);
        if (removeBtn) {
            removeBtn.addEventListener('click', () => this.removeFromMarked());
        }
    }

    /**
     * Initialize filters
     * @private
     */
    _initFilters() {
        if (Object.keys(this.filterConfig).length === 0) return;

        this.filterManager = new FilterManager({
            filters: this.filterConfig,
            onFilterChange: () => this._applyFilters()
        });
    }

    /**
     * Initialize list renderer
     * @private
     */
    _initListRenderer() {
        this.listRenderer = new ListRenderer({
            containerId: this.elementIds.listContainer,
            resultsCountId: this.elementIds.resultsCount,
            itemClass: 'collection-item',
            resultsCountSuffix: this.labels.resultsCountSuffix,
            emptyMessage: this.labels.emptyListMessage,
            renderItem: (item, context) => {
                if (this.renderItemCard) {
                    const isMarked = this.isItemMarked(item);
                    return this.renderItemCard(item, isMarked, context);
                }
                return this._defaultRenderItem(item, context);
            },
            onItemClick: (item) => this.openModal(item)
        });
    }

    /**
     * Initialize sidebar renderer
     * @private
     */
    _initSidebarRenderer() {
        this.sidebarRenderer = new SidebarListRenderer({
            containerId: this.elementIds.sidebarList,
            countId: this.elementIds.sidebarCount,
            emptyMessage: this.labels.emptySidebarMessage,
            renderItem: (item) => {
                if (this.renderSidebarItem) {
                    return this.renderSidebarItem(item);
                }
                return this._defaultRenderSidebarItem(item);
            },
            onItemClick: (item) => this.openModal(this.getFullItemData(item))
        });
    }

    /**
     * Initialize data management (import/export/clear)
     * @private
     */
    _initDataManagement() {
        // Export
        const exportBtn = document.getElementById(this.elementIds.exportBtn);
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportData());
        }

        // Import
        const importBtn = document.getElementById(this.elementIds.importBtn);
        const importInput = document.getElementById(this.elementIds.importInput);
        if (importBtn && importInput) {
            importBtn.addEventListener('click', () => importInput.click());
            importInput.addEventListener('change', (e) => this.importData(e));
        }

        // Clear all
        const clearBtn = document.getElementById(this.elementIds.clearAllBtn);
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearAllData());
        }
    }

    /**
     * Default item renderer
     * @private
     */
    _defaultRenderItem(item, context) {
        const id = item[this.itemIdField];
        const isMarked = this.isItemMarked(item);
        return `
            <div class="collection-item ${isMarked ? 'marked' : ''}" data-item-id="${id}">
                <div class="item-id">#${id}</div>
                <div class="item-content">
                    <div class="item-title">${item[this.itemTitleField]}</div>
                </div>
            </div>
        `;
    }

    /**
     * Default sidebar item renderer
     * @private
     */
    _defaultRenderSidebarItem(item) {
        const id = item[this.itemIdField];
        return `
            <div class="marked-item" data-item-id="${id}">
                <span class="marked-item-id">#${id}</span>
                <span class="marked-item-title">${item[this.itemTitleField]}</span>
            </div>
        `;
    }

    /**
     * Apply filters and re-render
     * @private
     */
    _applyFilters() {
        if (this.filterManager) {
            this.filteredItems = this.filterManager.applyFilters(this.allItems);
        } else {
            this.filteredItems = [...this.allItems];
        }
        this._renderList();
    }

    /**
     * Render the list and sidebar
     * @private
     */
    _render() {
        this._renderList();
        this._renderSidebar();
        this._updateStats();
    }

    /**
     * Render the main list
     * @private
     */
    _renderList() {
        if (this.listRenderer) {
            this.listRenderer.render(this.filteredItems);
        }
    }

    /**
     * Render the sidebar
     * @private
     */
    _renderSidebar() {
        if (this.sidebarRenderer) {
            const markedItems = this.store.getMarkedItems();
            // Sort by ID
            markedItems.sort((a, b) => {
                const aId = a[this.itemIdField];
                const bId = b[this.itemIdField];
                return aId - bId;
            });
            this.sidebarRenderer.render(markedItems);
        }
    }

    /**
     * Update statistics
     * @private
     */
    _updateStats() {
        const stats = this.store.getStats(this.allItems.length);

        const markedCountEl = document.getElementById(this.elementIds.markedCount);
        const percentageEl = document.getElementById(this.elementIds.markedPercentage);
        const totalEl = document.getElementById(this.elementIds.totalItems);

        if (markedCountEl) markedCountEl.textContent = stats.marked;
        if (percentageEl) percentageEl.textContent = `${stats.percentage}%`;
        if (totalEl) totalEl.textContent = stats.total;
    }

    /**
     * Check if an item is marked
     * @param {Object} item - The item to check
     * @returns {boolean}
     */
    isItemMarked(item) {
        if (!item) return false;
        return this.store.isMarked(item[this.itemIdField], this.itemIdField);
    }

    /**
     * Get marked item data
     * @param {Object} item - The item
     * @returns {Object|null}
     */
    getMarkedItemData(item) {
        if (!item) return null;
        return this.store.getMarkedItem(item[this.itemIdField], this.itemIdField);
    }

    /**
     * Get full item data from a marked item reference
     * @param {Object} markedItem - The marked item reference
     * @returns {Object|null}
     */
    getFullItemData(markedItem) {
        const id = markedItem[this.itemIdField];
        return this.allItems.find(item => item[this.itemIdField] === id) || null;
    }

    /**
     * Open modal for an item
     * @param {Object} item - The item to show
     */
    openModal(item) {
        this.currentItem = item;
        this.modal.show(item);
    }

    /**
     * Toggle mark status for current item
     */
    toggleMarkStatus() {
        if (!this.currentItem) return;

        const isMarked = this.isItemMarked(this.currentItem);

        if (isMarked) {
            this.store.unmarkItem(this.currentItem[this.itemIdField], this.itemIdField);
        } else {
            const markedData = this._buildMarkedItemData(this.currentItem);
            this.store.markItem(markedData, this.itemIdField);
        }

        this._render();

        // Re-open modal to update its state
        this.openModal(this.currentItem);
    }

    /**
     * Build marked item data from full item and form values
     * @param {Object} item - The full item
     * @returns {Object}
     * @private
     */
    _buildMarkedItemData(item) {
        // Override in subclass for custom fields
        return {
            [this.itemIdField]: item[this.itemIdField],
            [this.itemTitleField]: item[this.itemTitleField],
            markedDate: getTodayISO()
        };
    }

    /**
     * Remove current item from marked
     */
    removeFromMarked() {
        if (!this.currentItem) return;

        this.store.unmarkItem(this.currentItem[this.itemIdField], this.itemIdField);
        this._render();
        this.modal.hide();
    }

    /**
     * Export data
     */
    exportData() {
        const exportData = this.store.export();
        downloadAsJson(exportData, this.namespace);
        this.toast.success('Data exported successfully!');
    }

    /**
     * Import data
     * @param {Event} event - File input change event
     */
    async importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const data = await readFileAsJson(file);

            // Handle both old and new format
            let importData = data;
            if (data.data) {
                // New format with metadata
                importData = data;
            } else if (data.markedItems || data.watchedMovies || data.listenedAlbums || data.readBooks) {
                // Old format - convert
                const items = data.markedItems || data.watchedMovies || data.listenedAlbums || data.readBooks;
                importData = {
                    data: { markedItems: items }
                };
            }

            this.store.import(importData, false);
            this._render();
            this.toast.success('Data imported successfully!');
        } catch (error) {
            this.toast.error('Error importing data. Please check the file format.');
            console.error('Import error:', error);
        }

        event.target.value = '';
    }

    /**
     * Clear all data
     */
    clearAllData() {
        if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
            this.store.clear();
            this._render();
            this.toast.info('All data cleared.');
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CollectionPage };
}
