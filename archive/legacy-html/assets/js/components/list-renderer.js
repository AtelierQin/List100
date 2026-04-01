/**
 * Generic List Renderer Component
 * Provides consistent list rendering across all collection pages
 */
class ListRenderer {
    /**
     * Create a ListRenderer instance
     * @param {Object} options - Configuration options
     * @param {string} options.containerId - ID of the container element
     * @param {string} options.resultsCountId - ID of the results count element
     * @param {Function} options.renderItem - Function to render a single item
     * @param {Function} options.onItemClick - Callback when item is clicked
     * @param {string} options.itemClass - CSS class for items
     * @param {string} options.emptyMessage - Message when list is empty
     * @param {string} options.emptySubMessage - Sub-message when list is empty
     */
    constructor(options = {}) {
        this.containerId = options.containerId || 'list';
        this.resultsCountId = options.resultsCountId || 'resultsCount';
        this.renderItem = options.renderItem || this._defaultRenderItem;
        this.onItemClick = options.onItemClick || null;
        this.itemClass = options.itemClass || 'list-item';
        this.emptyMessage = options.emptyMessage || 'No items found';
        this.emptySubMessage = options.emptySubMessage || 'Try adjusting your filters';
        this.resultsCountSuffix = options.resultsCountSuffix || 'items';

        this.container = document.getElementById(this.containerId);
        this.resultsCount = document.getElementById(this.resultsCountId);
    }

    /**
     * Default render item function
     * @param {Object} item - Item to render
     * @returns {string} HTML string
     * @private
     */
    _defaultRenderItem(item) {
        return `<div class="${this.itemClass}">${JSON.stringify(item)}</div>`;
    }

    /**
     * Render the list
     * @param {Array} items - Items to render
     * @param {Object} context - Additional context passed to renderItem
     */
    render(items, context = {}) {
        if (!this.container) return;

        // Update results count
        if (this.resultsCount) {
            this.resultsCount.textContent = `${items.length} ${this.resultsCountSuffix}`;
        }

        // Handle empty state
        if (items.length === 0) {
            this.container.innerHTML = `
                <div class="empty-state">
                    <p>${this.emptyMessage}</p>
                    <small>${this.emptySubMessage}</small>
                </div>
            `;
            return;
        }

        // Render items
        this.container.innerHTML = items.map((item, index) =>
            this.renderItem(item, { ...context, index })
        ).join('');

        // Bind click events if handler provided
        if (this.onItemClick) {
            this.container.querySelectorAll(`.${this.itemClass}`).forEach(element => {
                element.addEventListener('click', (e) => {
                    const itemData = this._getItemDataFromElement(element, items);
                    if (itemData) {
                        this.onItemClick(itemData, element, e);
                    }
                });
            });
        }
    }

    /**
     * Get item data from element
     * @param {HTMLElement} element - The clicked element
     * @param {Array} items - All items
     * @returns {Object|null}
     * @private
     */
    _getItemDataFromElement(element, items) {
        // Try to get item by data attribute
        const itemId = element.dataset.itemId;
        if (itemId) {
            return items.find(item =>
                String(item.id) === itemId ||
                String(item.rank) === itemId ||
                String(item.number) === itemId ||
                String(item.discNumber) === itemId ||
                String(item.disc) === itemId
            );
        }

        // Fallback: get by index
        const index = Array.from(this.container.children).indexOf(element);
        return items[index] || null;
    }

    /**
     * Update a single item in the list
     * @param {string|number} itemId - Item identifier
     * @param {Object} newData - New data for the item
     * @param {Array} allItems - All items array
     * @param {Object} context - Render context
     */
    updateItem(itemId, newData, allItems, context = {}) {
        const element = this.container.querySelector(`[data-item-id="${itemId}"]`);
        if (element && newData) {
            const itemIndex = allItems.findIndex(item =>
                item.id === itemId || item.rank === itemId || item.number === itemId || item.discNumber === itemId || item.disc === itemId
            );
            if (itemIndex >= 0) {
                const newHtml = this.renderItem(newData, { ...context, index: itemIndex });
                element.outerHTML = newHtml;

                // Rebind click event for the new element
                if (this.onItemClick) {
                    const newElement = this.container.querySelector(`[data-item-id="${itemId}"]`);
                    if (newElement) {
                        newElement.addEventListener('click', (e) => {
                            this.onItemClick(newData, newElement, e);
                        });
                    }
                }
            }
        }
    }

    /**
     * Scroll to a specific item
     * @param {string|number} itemId - Item identifier
     * @param {Object} options - Scroll options
     */
    scrollToItem(itemId, options = { behavior: 'smooth', block: 'center' }) {
        const element = this.container.querySelector(`[data-item-id="${itemId}"]`);
        if (element) {
            element.scrollIntoView(options);
        }
    }

    /**
     * Clear the list
     */
    clear() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        if (this.resultsCount) {
            this.resultsCount.textContent = `0 ${this.resultsCountSuffix}`;
        }
    }

    /**
     * Set loading state
     * @param {boolean} loading - Whether to show loading state
     * @param {string} loadingMessage - Loading message
     */
    setLoading(loading, loadingMessage = 'Loading...') {
        if (!this.container) return;

        if (loading) {
            this.container.innerHTML = `
                <div class="loading-state">
                    <div class="loading-spinner"></div>
                    <p>${loadingMessage}</p>
                </div>
            `;
        }
    }
}

/**
 * Sidebar List Renderer for marked items (watched/read/listened)
 * A simpler renderer for the sidebar lists
 */
class SidebarListRenderer {
    /**
     * Create a SidebarListRenderer instance
     * @param {Object} options - Configuration options
     */
    constructor(options = {}) {
        this.containerId = options.containerId || 'markedList';
        this.countId = options.countId || 'markedCount';
        this.renderItem = options.renderItem || this._defaultRenderItem;
        this.onItemClick = options.onItemClick || null;
        this.emptyMessage = options.emptyMessage || 'No items yet';
        this.emptySubMessage = options.emptySubMessage || 'Click on items to mark them';

        this.container = document.getElementById(this.containerId);
        this.countElement = document.getElementById(this.countId);
    }

    /**
     * Default render item for sidebar
     * @param {Object} item - Item to render
     * @returns {string} HTML string
     * @private
     */
    _defaultRenderItem(item) {
        const id = item.id || item.rank || item.number || item.discNumber;
        const title = item.title || item.titleEn || item.name;
        return `
            <div class="marked-item" data-item-id="${id}">
                <span class="marked-item-id">#${id}</span>
                <span class="marked-item-title">${title}</span>
            </div>
        `;
    }

    /**
     * Render the sidebar list
     * @param {Array} items - Items to render
     */
    render(items) {
        // Update count
        if (this.countElement) {
            this.countElement.textContent = items.length;
        }

        if (!this.container) return;

        // Handle empty state
        if (items.length === 0) {
            this.container.innerHTML = `
                <div class="empty-state">
                    <p>${this.emptyMessage}</p>
                    <small>${this.emptySubMessage}</small>
                </div>
            `;
            return;
        }

        // Render items
        this.container.innerHTML = items.map(item => this.renderItem(item)).join('');

        // Bind click events
        if (this.onItemClick) {
            this.container.querySelectorAll('.marked-item, [data-item-id]').forEach(element => {
                element.addEventListener('click', () => {
                    const itemId = element.dataset.itemId;
                    const item = items.find(i =>
                        String(i.id) === itemId ||
                        String(i.rank) === itemId ||
                        String(i.number) === itemId ||
                        String(i.discNumber) === itemId ||
                        String(i.disc) === itemId
                    );
                    if (item) {
                        this.onItemClick(item, element);
                    }
                });
            });
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ListRenderer, SidebarListRenderer };
}
