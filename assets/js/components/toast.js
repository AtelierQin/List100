/**
 * Toast Notification Component
 * Provides consistent toast notifications across all pages
 */
class Toast {
    /**
     * Create a Toast instance
     * @param {Object} options - Configuration options
     * @param {string} options.containerId - ID of the toast container
     * @param {number} options.duration - Default duration in milliseconds
     * @param {string} options.position - Position ('top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center')
     */
    constructor(options = {}) {
        this.containerId = options.containerId || 'toast-container';
        this.duration = options.duration || 3000;
        this.position = options.position || 'top-right';

        this._ensureContainer();
    }

    /**
     * Ensure the toast container exists
     * @private
     */
    _ensureContainer() {
        let container = document.getElementById(this.containerId);
        if (!container) {
            container = document.createElement('div');
            container.id = this.containerId;
            container.className = `toast-container toast-${this.position}`;
            document.body.appendChild(container);

            // Add container styles if not already present
            if (!document.getElementById('toast-styles')) {
                const style = document.createElement('style');
                style.id = 'toast-styles';
                style.textContent = `
                    .toast-container {
                        position: fixed;
                        z-index: 10000;
                        pointer-events: none;
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                        max-width: 400px;
                    }
                    .toast-top-right { top: 20px; right: 20px; }
                    .toast-top-left { top: 20px; left: 20px; }
                    .toast-bottom-right { bottom: 20px; right: 20px; }
                    .toast-bottom-left { bottom: 20px; left: 20px; }
                    .toast-top-center { top: 20px; left: 50%; transform: translateX(-50%); }
                    .toast-bottom-center { bottom: 20px; left: 50%; transform: translateX(-50%); }

                    .toast {
                        pointer-events: auto;
                        padding: 12px 16px;
                        border-radius: 8px;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        animation: toastSlideIn 0.3s ease-out;
                        cursor: pointer;
                        font-size: 14px;
                        line-height: 1.4;
                    }

                    .toast.toast-success {
                        background-color: #10b981;
                        color: white;
                    }

                    .toast.toast-error {
                        background-color: #ef4444;
                        color: white;
                    }

                    .toast.toast-warning {
                        background-color: #f59e0b;
                        color: white;
                    }

                    .toast.toast-info {
                        background-color: #3b82f6;
                        color: white;
                    }

                    .toast.toast-exiting {
                        animation: toastSlideOut 0.3s ease-in forwards;
                    }

                    .toast-icon {
                        font-size: 18px;
                        flex-shrink: 0;
                    }

                    .toast-message {
                        flex: 1;
                    }

                    .toast-close {
                        flex-shrink: 0;
                        opacity: 0.7;
                        transition: opacity 0.2s;
                    }

                    .toast-close:hover {
                        opacity: 1;
                    }

                    @keyframes toastSlideIn {
                        from {
                            opacity: 0;
                            transform: translateX(100%);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }

                    @keyframes toastSlideOut {
                        from {
                            opacity: 1;
                            transform: translateX(0);
                        }
                        to {
                            opacity: 0;
                            transform: translateX(100%);
                        }
                    }

                    @media (prefers-color-scheme: dark) {
                        .toast {
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }
        this.container = container;
    }

    /**
     * Get icon for toast type
     * @param {string} type - Toast type
     * @returns {string} Icon HTML
     * @private
     */
    _getIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    }

    /**
     * Show a toast notification
     * @param {string} message - Message to display
     * @param {Object} options - Toast options
     * @param {string} options.type - Toast type ('success', 'error', 'warning', 'info')
     * @param {number} options.duration - Duration in milliseconds (0 for persistent)
     * @param {boolean} options.closable - Whether toast can be closed manually
     * @returns {HTMLElement} The toast element
     */
    show(message, options = {}) {
        const type = options.type || 'info';
        const duration = options.duration !== undefined ? options.duration : this.duration;
        const closable = options.closable !== undefined ? options.closable : true;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${this._getIcon(type)}</span>
            <span class="toast-message">${message}</span>
            ${closable ? '<span class="toast-close">✕</span>' : ''}
        `;

        // Click to close
        toast.addEventListener('click', () => this._removeToast(toast));

        // Add to container
        this.container.appendChild(toast);

        // Auto-remove after duration
        if (duration > 0) {
            setTimeout(() => this._removeToast(toast), duration);
        }

        return toast;
    }

    /**
     * Remove a toast with animation
     * @param {HTMLElement} toast - Toast element to remove
     * @private
     */
    _removeToast(toast) {
        if (!toast || !toast.parentNode) return;

        toast.classList.add('toast-exiting');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    /**
     * Show a success toast
     * @param {string} message - Message to display
     * @param {Object} options - Additional options
     */
    success(message, options = {}) {
        return this.show(message, { ...options, type: 'success' });
    }

    /**
     * Show an error toast
     * @param {string} message - Message to display
     * @param {Object} options - Additional options
     */
    error(message, options = {}) {
        return this.show(message, { ...options, type: 'error' });
    }

    /**
     * Show a warning toast
     * @param {string} message - Message to display
     * @param {Object} options - Additional options
     */
    warning(message, options = {}) {
        return this.show(message, { ...options, type: 'warning' });
    }

    /**
     * Show an info toast
     * @param {string} message - Message to display
     * @param {Object} options - Additional options
     */
    info(message, options = {}) {
        return this.show(message, { ...options, type: 'info' });
    }

    /**
     * Clear all toasts
     */
    clear() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
    }
}

// Global toast instance for convenience
let globalToast = null;

/**
 * Get or create the global toast instance
 * @param {Object} options - Options for new instance
 * @returns {Toast}
 */
function getToast(options = {}) {
    if (!globalToast) {
        globalToast = new Toast(options);
    }
    return globalToast;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Toast, getToast };
}
