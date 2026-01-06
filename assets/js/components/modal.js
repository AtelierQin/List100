/**
 * Reusable Modal Component
 * Provides a consistent modal experience across all collection pages
 */
class Modal {
    /**
     * Create a Modal instance
     * @param {Object} options - Configuration options
     * @param {string} options.modalId - ID of the modal element
     * @param {string} options.closeBtnId - ID of the close button
     * @param {Function} options.onOpen - Callback when modal opens
     * @param {Function} options.onClose - Callback when modal closes
     */
    constructor(options = {}) {
        this.modalId = options.modalId || 'modal';
        this.closeBtnId = options.closeBtnId || 'closeModal';
        this.onOpen = options.onOpen || null;
        this.onClose = options.onClose || null;
        this.currentItem = null;

        this.modal = document.getElementById(this.modalId);
        this.closeBtn = document.getElementById(this.closeBtnId);

        this._bindEvents();
    }

    /**
     * Bind event listeners
     * @private
     */
    _bindEvents() {
        // Close button click
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.hide());
        }

        // Click outside modal to close
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.hide();
                }
            });
        }

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.hide();
            }
        });
    }

    /**
     * Show the modal
     * @param {Object} item - The item data to display
     */
    show(item = null) {
        if (!this.modal) return;

        this.currentItem = item;
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        if (this.onOpen && typeof this.onOpen === 'function') {
            this.onOpen(item);
        }
    }

    /**
     * Hide the modal
     */
    hide() {
        if (!this.modal) return;

        this.modal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling

        const previousItem = this.currentItem;
        this.currentItem = null;

        if (this.onClose && typeof this.onClose === 'function') {
            this.onClose(previousItem);
        }
    }

    /**
     * Check if modal is currently open
     * @returns {boolean}
     */
    isOpen() {
        return this.modal && !this.modal.classList.contains('hidden');
    }

    /**
     * Get the current item being displayed
     * @returns {Object|null}
     */
    getCurrentItem() {
        return this.currentItem;
    }

    /**
     * Update a specific element in the modal
     * @param {string} elementId - ID of the element to update
     * @param {string} content - Content to set
     * @param {string} property - Property to update ('textContent' or 'innerHTML')
     */
    updateElement(elementId, content, property = 'textContent') {
        const element = document.getElementById(elementId);
        if (element) {
            element[property] = content;
        }
    }

    /**
     * Update multiple elements in the modal
     * @param {Object} updates - Object with elementId: content pairs
     */
    updateElements(updates) {
        Object.entries(updates).forEach(([elementId, content]) => {
            this.updateElement(elementId, content);
        });
    }

    /**
     * Show or hide an element in the modal
     * @param {string} elementId - ID of the element
     * @param {boolean} show - Whether to show or hide
     */
    toggleElement(elementId, show) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.display = show ? 'block' : 'none';
        }
    }

    /**
     * Update button state
     * @param {string} buttonId - ID of the button
     * @param {Object} options - Button options
     * @param {string} options.text - Button text
     * @param {string} options.className - Button class name
     * @param {boolean} options.visible - Whether button is visible
     */
    updateButton(buttonId, options = {}) {
        const button = document.getElementById(buttonId);
        if (!button) return;

        if (options.text !== undefined) {
            button.textContent = options.text;
        }
        if (options.className !== undefined) {
            button.className = options.className;
        }
        if (options.visible !== undefined) {
            button.style.display = options.visible ? 'inline-block' : 'none';
        }
    }

    /**
     * Get form values from the modal
     * @param {Array<string>} fieldIds - Array of field IDs to retrieve
     * @returns {Object} Object with field values
     */
    getFormValues(fieldIds) {
        const values = {};
        fieldIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                values[id] = element.value;
            }
        });
        return values;
    }

    /**
     * Set form values in the modal
     * @param {Object} values - Object with fieldId: value pairs
     */
    setFormValues(values) {
        Object.entries(values).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.value = value || '';
            }
        });
    }

    /**
     * Reset form fields in the modal
     * @param {Array<string>} fieldIds - Array of field IDs to reset
     */
    resetFormFields(fieldIds) {
        fieldIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.value = '';
            }
        });
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Modal };
}
