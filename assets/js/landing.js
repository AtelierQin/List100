class LandingGoals {
    constructor() {
        this.goals = [];
        this.init();
    }

    async init() {
        await this.loadGoals();
        this.renderGoals();
        this.setupStorageListener();
    }

    async loadGoals() {
        try {
            // 首先尝试从localStorage加载
            const stored = localStorage.getItem('list100-items');
            if (stored) {
                const items = JSON.parse(stored);
                if (Array.isArray(items) && items.length > 0) {
                    this.goals = items;
                    return;
                }
            }

            // 如果localStorage为空，从JSON文件加载
            const response = await fetch('./assets/data/list100-data.json');
            if (response.ok) {
                const data = await response.json();
                if (data.items && Array.isArray(data.items)) {
                    this.goals = data.items;
                }
            }
        } catch (error) {
            console.error('Error loading goals:', error);
            this.goals = [];
        }
    }

    renderGoals() {
        const goalsList = document.getElementById('landingGoalsList');
        if (!goalsList) return;

        // 显示所有有文本内容的目标
        const validGoals = this.goals
            .filter(goal => goal.text && goal.text.trim());

        if (validGoals.length === 0) {
            goalsList.innerHTML = '<li>No goals yet. <a href="list100.html">Start adding goals</a></li>';
            return;
        }

        goalsList.innerHTML = validGoals
            .map((goal, index) => {
                const completedClass = goal.completed ? ' class="completed"' : '';
                const number = index + 1;
                return `<li${completedClass} data-number="${number}">${goal.text}</li>`;
            })
            .join('');
    }

    setupStorageListener() {
        // 监听localStorage变化
        window.addEventListener('storage', (e) => {
            if (e.key === 'list100-items') {
                this.loadGoals().then(() => {
                    this.renderGoals();
                });
            }
        });

        // 监听自定义事件（同一页面内的更新）
        window.addEventListener('list100DataUpdate', () => {
            this.loadGoals().then(() => {
                this.renderGoals();
            });
        });

        // 定期检查更新（每30秒）
        setInterval(() => {
            this.loadGoals().then(() => {
                this.renderGoals();
            });
        }, 30000);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new LandingGoals();
});