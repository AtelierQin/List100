// OS页面的JavaScript功能
class ResourceDatabase {
    constructor() {
        this.resources = [];
        this.list100Items = [];
        this.currentFilter = 'all';
        this.currentTag = '';
        this.searchQuery = '';
        
        this.init();
        this.loadData();
        this.loadList100Data();
        this.bindEvents();
        this.updateResourceCount();
    }

    init() {
        // 初始化一些示例数据
        this.resources = [
            {
                id: 1,
                title: 'GitHub',
                url: 'https://github.com',
                description: 'The world\'s leading software development platform',
                category: 'tool',
                tags: ['git', 'code', 'collaboration'],
                favicon: '🐙',
                dateAdded: new Date().toISOString()
            },
            {
                id: 2,
                title: 'TechCrunch',
                url: 'https://techcrunch.com',
                description: 'Latest technology news and startup information',
                category: 'news',
                tags: ['tech', 'startup', 'news'],
                favicon: '📰',
                dateAdded: new Date().toISOString()
            },
            {
                id: 3,
                title: 'Medium',
                url: 'https://medium.com',
                description: 'Platform for reading and writing articles',
                category: 'article',
                tags: ['writing', 'reading', 'blog'],
                favicon: '📝',
                dateAdded: new Date().toISOString()
            }
        ];
    }

    bindEvents() {
        // 添加资源按钮
        document.getElementById('addResourceBtn').addEventListener('click', () => {
            this.showAddResourceModal();
        });

        // 搜索功能
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.renderResources();
            this.renderGoals();
        });

        // 分类过滤
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.renderResources();
                this.renderGoals();
            });
        });

        // 导入导出功能
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportData();
        });

        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });

        document.getElementById('fileInput').addEventListener('change', (e) => {
            this.importData(e.target.files[0]);
        });
    }

    showAddResourceModal() {
        const modal = this.createModal();
        document.body.appendChild(modal);
        modal.classList.add('show');
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">Add New Resource</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="resourceForm">
                        <div class="form-group">
                            <label class="form-label">Title *</label>
                            <input type="text" class="form-input" name="title" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">URL *</label>
                            <input type="url" class="form-input" name="url" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Description</label>
                            <textarea class="form-textarea" name="description" placeholder="Brief description of the resource"></textarea>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Category</label>
                            <select class="form-select" name="category">
                                <option value="news">News</option>
                                <option value="database">Database</option>
                                <option value="article">Article</option>
                                <option value="tool">Tool</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Tags</label>
                            <input type="text" class="form-input" name="tags" placeholder="Separate tags with commas">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Favicon (emoji or text)</label>
                            <input type="text" class="form-input" name="favicon" placeholder="🌐" maxlength="2">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary modal-cancel">Cancel</button>
                    <button type="submit" class="btn btn-blue modal-save">Save Resource</button>
                </div>
            </div>
        `;

        // 绑定模态框事件
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal(modal);
        });

        modal.querySelector('.modal-cancel').addEventListener('click', () => {
            this.closeModal(modal);
        });

        modal.querySelector('.modal-save').addEventListener('click', () => {
            this.saveResource(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });

        return modal;
    }

    closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 200);
    }

    saveResource(modal) {
        const form = modal.querySelector('#resourceForm');
        const formData = new FormData(form);
        
        const title = formData.get('title').trim();
        const url = formData.get('url').trim();
        
        if (!title || !url) {
            alert('Please fill in required fields');
            return;
        }

        const resource = {
            id: Date.now(),
            title: title,
            url: url,
            description: formData.get('description').trim(),
            category: formData.get('category'),
            tags: formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag),
            favicon: formData.get('favicon').trim() || '🌐',
            dateAdded: new Date().toISOString()
        };

        this.resources.unshift(resource);
        this.saveData();
        this.renderResources();
        this.updateResourceCount();
        this.updateTagFilters();
        this.closeModal(modal);
    }

    renderResources() {
        const container = document.getElementById('resourcesList');
        const filteredResources = this.getFilteredResources();

        if (filteredResources.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📚</div>
                    <h3>No resources found</h3>
                    <p>Try adjusting your search or filters, or add a new resource.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredResources.map(resource => `
            <div class="resource-card" data-id="${resource.id}">
                <div class="resource-header">
                    <div style="display: flex; align-items: flex-start;">
                        <div class="resource-favicon">${resource.favicon}</div>
                        <div class="resource-title-section">
                            <h3 class="resource-title">${resource.title}</h3>
                            <a href="${resource.url}" target="_blank" class="resource-url">${resource.url}</a>
                        </div>
                    </div>
                    <div class="resource-actions">
                        <button class="action-btn edit" data-action="edit" data-id="${resource.id}" title="Edit">✏️</button>
                        <button class="action-btn delete" data-action="delete" data-id="${resource.id}" title="Delete">🗑️</button>
                    </div>
                </div>
                ${resource.description ? `<div class="resource-description">${resource.description}</div>` : ''}
                <div class="resource-meta">
                    <span class="resource-category category-${resource.category}">${resource.category}</span>
                    <span class="resource-date">${this.formatDate(resource.dateAdded)}</span>
                </div>
                ${resource.tags.length > 0 ? `
                    <div class="resource-tags">
                        ${resource.tags.map(tag => `<span class="resource-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        `).join('');

        // 添加点击事件
        container.querySelectorAll('.resource-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const actionBtn = e.target.closest('.action-btn');
                if (actionBtn) {
                    e.stopPropagation();
                    const action = actionBtn.dataset.action;
                    const id = parseInt(actionBtn.dataset.id);
                    
                    if (action === 'edit') {
                        this.editResource(id);
                    } else if (action === 'delete') {
                        this.deleteResource(id);
                    }
                } else if (!e.target.closest('.resource-actions') && !e.target.closest('.resource-url')) {
                    const url = card.querySelector('.resource-url').href;
                    window.open(url, '_blank');
                }
            });
        });
    }

    getFilteredResources() {
        return this.resources.filter(resource => {
            const matchesFilter = this.currentFilter === 'all' || resource.category === this.currentFilter;
            const matchesTag = !this.currentTag || resource.tags.includes(this.currentTag);
            const matchesSearch = !this.searchQuery || 
                resource.title.toLowerCase().includes(this.searchQuery) ||
                resource.description.toLowerCase().includes(this.searchQuery) ||
                resource.tags.some(tag => tag.toLowerCase().includes(this.searchQuery));
            
            return matchesFilter && matchesTag && matchesSearch;
        });
    }

    deleteResource(id) {
        if (confirm('Are you sure you want to delete this resource?')) {
            this.resources = this.resources.filter(resource => resource.id !== id);
            this.saveData();
            this.renderResources();
            this.updateResourceCount();
            this.updateTagFilters();
        }
    }

    editResource(id) {
        const resource = this.resources.find(r => r.id === id);
        if (!resource) return;

        const modal = this.createModal();
        modal.querySelector('.modal-title').textContent = 'Edit Resource';
        
        // 填充表单数据
        const form = modal.querySelector('#resourceForm');
        form.title.value = resource.title;
        form.url.value = resource.url;
        form.description.value = resource.description;
        form.category.value = resource.category;
        form.tags.value = resource.tags.join(', ');
        form.favicon.value = resource.favicon;

        // 修改保存逻辑
        modal.querySelector('.modal-save').addEventListener('click', () => {
            const formData = new FormData(form);
            
            const title = formData.get('title').trim();
            const url = formData.get('url').trim();
            
            if (!title || !url) {
                alert('Please fill in required fields');
                return;
            }
            
            resource.title = title;
            resource.url = url;
            resource.description = formData.get('description').trim();
            resource.category = formData.get('category');
            resource.tags = formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag);
            resource.favicon = formData.get('favicon').trim() || '🌐';

            this.saveData();
            this.renderResources();
            this.updateTagFilters();
            this.closeModal(modal);
        });

        document.body.appendChild(modal);
        modal.classList.add('show');
    }

    updateResourceCount() {
        const resourceCountElement = document.getElementById('resourceCount');
        if (resourceCountElement) {
            const count = this.resources.length;
            resourceCountElement.textContent = `${count} resource${count !== 1 ? 's' : ''}`;
        }
    }

    updateTagFilters() {
        // 合并资源标签和List100目标标签
        const resourceTags = this.resources.flatMap(resource => resource.tags || []);
        const goalTags = this.list100Items.flatMap(item => item.tags || []);
        const allTags = [...new Set([...resourceTags, ...goalTags])];
        
        console.log('Updating tag filters...');
        console.log('Resource tags:', resourceTags);
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
                this.renderResources();
                this.renderGoals();
            });
        });
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    }

    saveData() {
        localStorage.setItem('resourceDatabase', JSON.stringify(this.resources));
    }

    loadData() {
        const saved = localStorage.getItem('resourceDatabase');
        if (saved) {
            this.resources = JSON.parse(saved);
        }
        this.renderResources();
        this.updateTagFilters();
    }

    exportData() {
        const dataStr = JSON.stringify(this.resources, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `resource-database-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    importData(file) {
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (Array.isArray(imported)) {
                    this.resources = imported;
                    this.saveData();
                    this.renderResources();
                    this.updateResourceCount();
                    this.updateTagFilters();
                    alert('Data imported successfully!');
                } else {
                    alert('Invalid file format');
                }
            } catch (error) {
                alert('Error reading file');
            }
        };
        reader.readAsText(file);
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
