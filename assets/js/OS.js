// OS页面的JavaScript功能
class ResourceDatabase {
    constructor() {
        this.list100Items = [];
        this.currentFilter = 'all';
        this.currentTag = '';
        this.searchQuery = '';
        
        this.init();
        this.loadList100Data();
        this.bindEvents();
    }

    init() {
        // 初始化数据
    }

    bindEvents() {
        // 搜索功能
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.renderGoals();
        });

        // 分类过滤
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.renderGoals();
            });
        });
    }





    updateTagFilters() {
        // 只处理List100目标标签
        const goalTags = this.list100Items.flatMap(item => item.tags || []);
        const allTags = [...new Set(goalTags)];
        
        console.log('Updating tag filters...');
        console.log('Goal tags:', goalTags);
        console.log('All unique tags:', allTags);
        
        const tagFilterList = document.getElementById('tagFilterList');
        
        // All Tags 只统计目标数量（与 List100 页面一致）
        const totalGoals = this.list100Items.length;
        
        // 创建 tags 数组，包含 tag 名称和数量（只统计目标）
        const tagsWithCounts = allTags.map(tag => {
            const goalCount = this.list100Items.filter(item => 
                item.tags && item.tags.includes(tag)
            ).length;
            
            return {
                name: tag,
                count: goalCount
            };
        });
        
        // 按数量从高到低排序（与 List100 页面一致）
        tagsWithCounts.sort((a, b) => b.count - a.count);
        
        console.log('Tags sorted by count:', tagsWithCounts);
        
        tagFilterList.innerHTML = `
            <button class="tag-filter-item ${!this.currentTag ? 'active' : ''}" data-tag="">
                <span class="tag-name">All Tags</span>
                <span class="tag-count">${totalGoals}</span>
            </button>
            ${tagsWithCounts.map(tagData => {
                return `
                    <button class="tag-filter-item ${this.currentTag === tagData.name ? 'active' : ''}" data-tag="${tagData.name}">
                        <span class="tag-name">${tagData.name}</span>
                        <span class="tag-count">${tagData.count}</span>
                    </button>
                `;
            }).join('')}
        `;

        // 绑定标签过滤事件
        tagFilterList.querySelectorAll('.tag-filter-item').forEach(item => {
            item.addEventListener('click', (e) => {
                tagFilterList.querySelectorAll('.tag-filter-item').forEach(i => i.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.currentTag = e.currentTarget.dataset.tag;
                console.log('Tag filter changed to:', this.currentTag || 'All');
                this.renderGoals();
            });
        });
    }

    // 加载List100数据
    async loadList100Data() {
        console.log('Loading List100 data...');
        
        try {
            // 首先尝试从localStorage加载
            const stored = localStorage.getItem('list100-items');
            if (stored) {
                const items = JSON.parse(stored);
                if (Array.isArray(items) && items.length > 0) {
                    this.list100Items = items;
                    console.log('Loaded', items.length, 'items from localStorage');
                    this.renderGoals();
                    this.updateTagFilters();
                    return;
                }
            }

            // 如果localStorage为空，从JSON文件加载
            const response = await fetch('./assets/data/list100-data.json');
            if (response.ok) {
                const data = await response.json();
                if (data.items && Array.isArray(data.items)) {
                    this.list100Items = data.items;
                    console.log('Loaded', data.items.length, 'items from JSON file');
                    this.renderGoals();
                    this.updateTagFilters();
                }
            }
        } catch (error) {
            console.error('Error loading List100 data:', error);
        }

        // 监听List100数据更新（跨标签页）
        window.addEventListener('storage', (e) => {
            if (e.key === 'list100-items' && e.newValue) {
                try {
                    console.log('List100 data updated from another tab');
                    this.list100Items = JSON.parse(e.newValue);
                    this.renderGoals();
                    this.updateTagFilters();
                } catch (error) {
                    console.error('Error parsing updated List100 data:', error);
                }
            }
        });
        
        // 监听页面获得焦点时重新加载数据
        window.addEventListener('focus', () => {
            console.log('Page focused, reloading List100 data...');
            this.reloadList100Data();
        });
        
        // 定期检查数据更新（每5秒）
        setInterval(() => {
            this.reloadList100Data();
        }, 5000);
    }
    
    // 重新加载List100数据
    reloadList100Data() {
        try {
            const stored = localStorage.getItem('list100-items');
            if (stored) {
                const items = JSON.parse(stored);
                
                // 检查数据是否有变化
                const currentData = JSON.stringify(this.list100Items);
                const newData = JSON.stringify(items);
                
                if (currentData !== newData) {
                    console.log('List100 data changed, updating...');
                    this.list100Items = items;
                    this.renderGoals();
                    this.updateTagFilters();
                }
            }
        } catch (error) {
            console.error('Error reloading List100 data:', error);
        }
    }

    // 渲染List100目标
    renderGoals() {
        const goalsContainer = document.getElementById('goalsList');
        if (!goalsContainer) return;

        // 根据当前标签过滤目标
        let filteredGoals = this.list100Items;
        if (this.currentTag) {
            filteredGoals = this.list100Items.filter(item => 
                item.tags && item.tags.includes(this.currentTag)
            );
        }

        // 根据category过滤器过滤目标（通过匹配tags）
        // 如果category不是'all'，则只显示包含该category作为tag的目标
        if (this.currentFilter !== 'all') {
            filteredGoals = filteredGoals.filter(item =>
                item.tags && item.tags.some(tag => 
                    tag.toLowerCase() === this.currentFilter.toLowerCase()
                )
            );
        }

        // 根据搜索查询过滤
        if (this.searchQuery) {
            filteredGoals = filteredGoals.filter(item =>
                item.text.toLowerCase().includes(this.searchQuery) ||
                (item.description && item.description.toLowerCase().includes(this.searchQuery)) ||
                (item.tags && item.tags.some(tag => tag.toLowerCase().includes(this.searchQuery)))
            );
        }

        if (filteredGoals.length === 0) {
            goalsContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🎯</div>
                    <h3>No goals found</h3>
                    <p>Visit <a href="list100.html">List100</a> to add your goals.</p>
                </div>
            `;
            return;
        }

        // 按状态分组：置顶、进行中、已完成
        const pinnedGoals = filteredGoals.filter(item => item.pinned && !item.completed);
        const activeGoals = filteredGoals.filter(item => !item.pinned && !item.completed);
        const completedGoals = filteredGoals.filter(item => item.completed);

        goalsContainer.innerHTML = `
            ${pinnedGoals.length > 0 ? `
                <div class="goals-group">
                    <h3 class="goals-group-title">📌 Pinned Goals</h3>
                    <div class="goals-grid">
                        ${pinnedGoals.map(item => this.createGoalCard(item)).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${activeGoals.length > 0 ? `
                <div class="goals-group">
                    <h3 class="goals-group-title">🎯 Active Goals</h3>
                    <div class="goals-grid">
                        ${activeGoals.map(item => this.createGoalCard(item)).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${completedGoals.length > 0 ? `
                <div class="goals-group">
                    <h3 class="goals-group-title">✅ Completed Goals</h3>
                    <div class="goals-grid">
                        ${completedGoals.map(item => this.createGoalCard(item)).join('')}
                    </div>
                </div>
            ` : ''}
        `;

        // 绑定点击事件
        goalsContainer.querySelectorAll('.goal-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                window.location.href = `goal-detail.html?id=${id}`;
            });
        });
    }

    createGoalCard(item) {
        const tagsHTML = item.tags && item.tags.length > 0 
            ? item.tags.map(tag => `<span class="goal-tag">${tag}</span>`).join('')
            : '';

        return `
            <div class="goal-card ${item.completed ? 'completed' : ''}" data-id="${item.id}">
                <div class="goal-header">
                    <h4 class="goal-title">${item.text || 'Untitled Goal'}</h4>
                    ${item.pinned ? '<span class="goal-pin">📌</span>' : ''}
                </div>
                ${item.description ? `<p class="goal-description">${item.description}</p>` : ''}
                ${tagsHTML ? `<div class="goal-tags">${tagsHTML}</div>` : ''}
                ${item.completed ? `
                    <div class="goal-completed-badge">
                        <span class="completed-icon">✓</span>
                        Completed
                    </div>
                ` : ''}
            </div>
        `;
    }
}

// 初始化应用
let resourceDB;
document.addEventListener('DOMContentLoaded', () => {
    resourceDB = new ResourceDatabase();
});
