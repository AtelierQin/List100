class LandingDashboard {
    constructor() {
        this.dataManager = window.DataManager;
        this.init();
    }

    init() {
        this.setGreeting();
        this.renderStats();
        this.renderActiveGoals();
        this.renderAllGoals();
        
        // Listen for updates
        this.dataManager.addEventListener('data:updated', () => {
            this.renderStats();
            this.renderActiveGoals();
            this.renderAllGoals();
        });
    }

    setGreeting() {
        const hour = new Date().getHours();
        let greeting = 'Welcome';
        
        if (hour < 5) greeting = 'Good night';
        else if (hour < 12) greeting = 'Good morning';
        else if (hour < 18) greeting = 'Good afternoon';
        else greeting = 'Good evening';
        
        const title = document.getElementById('greeting');
        if (title) {
            title.style.opacity = 0;
            requestAnimationFrame(() => {
                title.textContent = greeting;
                title.style.transition = 'opacity 0.6s ease-out';
                title.style.opacity = 1;
            });
        }
    }

    renderStats() {
        const stats = this.dataManager.getDashboardStats();
        
        // Goals
        this.animateValue('dashGoalCount', stats.goals.completed);
        this.animateValue('dashGoalPercentage', stats.goals.percentage);
        
        // World
        this.animateValue('dashWorldCount', stats.travel.countries);
        
        // China
        this.animateValue('dashChinaCount', stats.travel.cities);
    }

    renderActiveGoals() {
        const list = document.getElementById('activeGoalsList');
        if (!list) return;

        const goals = this.dataManager.getGoals();
        
        // Strategy: Pinned first, then Newest. Top 5 for the list view.
        // FIX: Removed !g.archived check as it is not part of the schema
        const activeGoals = goals
            .filter(g => !g.completed) 
            .sort((a, b) => {
                // Pin logic: pinned items come first
                // Ensure boolean comparison handles undefined gracefully
                const aPinned = !!a.pinned;
                const bPinned = !!b.pinned;
                
                if (aPinned && !bPinned) return -1;
                if (!aPinned && bPinned) return 1;
                
                // Secondary sort: Newest first
                return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .slice(0, 3); // Show 3 items for a compact list

        if (activeGoals.length === 0) {
            list.innerHTML = `
                <div class="goal-row empty-state" style="opacity: 0; animation: fadeInUp 0.5s ease-out forwards;">
                    <span class="goal-number" style="opacity: 0.3;">01</span>
                    <span class="goal-content" style="font-style: italic; color: var(--color-text-light);">
                        Your canvas is blank. <a href="list100.html" style="color: var(--color-primary); text-decoration: none; border-bottom: 1px solid currentColor;">Define your first aspiration &rarr;</a>
                    </span>
                    <span class="goal-meta">Start</span>
                </div>
            `;
            return;
        }

        list.innerHTML = activeGoals.map((goal, index) => {
            const num = (index + 1).toString().padStart(2, '0');
            const tag = goal.tags && goal.tags.length ? goal.tags[0] : 'General';
            // Pinned indicator
            const pinIcon = goal.pinned ? '<span style="margin-right:8px; font-size:12px;">📌</span>' : '';
            
            return `
            <div class="goal-row" style="opacity: 0; animation: fadeInUp 0.5s ease-out forwards; animation-delay: ${index * 0.1}s">
                <span class="goal-number">${num}</span>
                <span class="goal-content">${pinIcon}${this.escapeHtml(goal.text)}</span>
                <span class="goal-meta">${this.escapeHtml(tag)}</span>
            </div>
            `;
        }).join('');
    }

    renderAllGoals() {
        const list = document.getElementById('allGoalsList');
        const counter = document.getElementById('goalsCounter');
        if (!list) return;

        const goals = this.dataManager.getGoals();
        const completedCount = goals.filter(g => g.completed).length;
        
        // Update counter
        if (counter) {
            counter.textContent = `${completedCount} / ${goals.length}`;
        }
        
        if (goals.length === 0) {
            list.innerHTML = `
                <div class="all-goal-item empty-state">
                    <span class="all-goal-text">No goals yet. <a href="list100.html">Add your first aspiration →</a></span>
                </div>
            `;
            return;
        }

        // Sort same as list100.html: pinned first, then by customOrder, then by createdAt
        const sortedGoals = [...goals].sort((a, b) => {
            // Pinned goals first
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;

            // Then by customOrder
            const orderA = a.customOrder || 0;
            const orderB = b.customOrder || 0;
            if (orderA !== orderB) {
                return orderA - orderB;
            }

            // Finally by creation date
            return new Date(a.createdAt) - new Date(b.createdAt);
        });

        list.innerHTML = sortedGoals.map((goal, index) => {
            // Use original index in the sorted array
            const originalIndex = goals.indexOf(goal) + 1;
            const num = (index + 1).toString().padStart(2, '0');
            const completedClass = goal.completed ? 'completed' : '';
            const checkmark = goal.completed ? '<span class="checkmark">✓</span>' : '';
            // Skip rendering if goal text is empty
            const goalText = goal.text && goal.text.trim() ? this.escapeHtml(goal.text) : '<span class="empty-goal">Empty goal</span>';
            
            return `
            <div class="all-goal-item ${completedClass}" style="animation-delay: ${Math.min(index * 0.02, 0.5)}s">
                <span class="all-goal-number">${num}</span>
                <span class="all-goal-text">${checkmark}${goalText}</span>
            </div>
            `;
        }).join('');
    }

    animateValue(id, value) {
        const el = document.getElementById(id);
        if (!el) return;
        
        // Handle non-numeric gracefully
        if (typeof value === 'string' && isNaN(parseInt(value))) {
            el.textContent = value;
            return;
        }

        const start = 0;
        const end = parseInt(value, 10) || 0;
        
        // Optimize: If value is 0 or unchanged (we assume start is 0 on load), minimal anim
        if (end === 0) {
            el.textContent = '0';
            return;
        }

        const duration = 1500; // Slightly longer for smoothness
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // EaseOutQuart: 1 - (1 - x)^4
            // Much smoother deceleration than Expo
            const ease = 1 - Math.pow(1 - progress, 4);
            
            const current = Math.floor(start + (end - start) * ease);
            el.textContent = current;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.textContent = end; // Ensure final value is exact
            }
        };
        
        window.requestAnimationFrame(step);
    }

    escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LandingDashboard();
});
