/**
 * DataManager - Centralized Data Access Layer
 * 
 * Responsibilities:
 * 1. Unified access to localStorage keys
 * 2. Type-safe data retrieval
 * 3. Event dispatching for cross-component updates
 * 4. Statistics aggregation for Dashboard
 */
class DataManager extends EventTarget {
    constructor() {
        super();
        this.KEYS = {
            GOALS: 'list100-items',
            WORLD: 'travel-visited-countries',
            CHINA: 'china-visited-cities',
            SETTINGS: 'app-settings'
        };
        
        // Listen for storage events from other tabs
        window.addEventListener('storage', (e) => {
            this.handleStorageEvent(e);
        });
    }

    // ==================== Public API ====================

    getGoals() {
        return this._load(this.KEYS.GOALS, []);
    }

    getVisitedCountries() {
        const data = this._load(this.KEYS.WORLD, []);
        return new Map(data);
    }

    getVisitedCities() {
        const data = this._load(this.KEYS.CHINA, []);
        return new Map(data);
    }

    // ==================== Statistics ====================

    getDashboardStats() {
        const goals = this.getGoals();
        // FIX: Removed !g.archived check
        const activeGoals = goals.filter(g => !g.completed).length;
        const completedGoals = goals.filter(g => g.completed).length;
        const totalGoals = goals.length;
        
        const visitedCountries = this.getVisitedCountries().size;
        const visitedCities = this.getVisitedCities().size;

        return {
            goals: {
                total: totalGoals,
                active: activeGoals,
                completed: completedGoals,
                percentage: totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0
            },
            travel: {
                countries: visitedCountries,
                cities: visitedCities
            }
        };
    }

    // ==================== Internal ====================

    _load(key, defaultValue) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : defaultValue;
        } catch (e) {
            console.error(`DataManager: Failed to load ${key}`, e);
            return defaultValue;
        }
    }

    handleStorageEvent(e) {
        // Dispatch internal events so UI components can react
        if (Object.values(this.KEYS).includes(e.key)) {
            this.dispatchEvent(new CustomEvent('data:updated', { 
                detail: { key: e.key, newValue: e.newValue } 
            }));
        }
    }
}

// Singleton instance
window.DataManager = new DataManager();
