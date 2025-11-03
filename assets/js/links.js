// Database页面的JavaScript功能
class ResourceDatabase {
    constructor() {
        this.resources = [];
        this.currentFilter = 'all';
        this.currentTag = '';
        this.searchQuery = '';
        
        this.init();
        this.loadData();
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
                category: 'development',
                tags: ['git', 'code', 'collaboration'],
                favicon: '🐙',
                dateAdded: new Date().toISOString()
            },
            {
                id: 2,
                title: 'Figma',
                url: 'https://figma.com',
                description: 'Collaborative interface design tool',
                category: 'design',
                tags: ['design', 'ui', 'collaboration'],
                favicon: '🎨',
                dateAdded: new Date().toISOString()
            },
            {
                id: 3,
                title: 'Notion',
                url: 'https://notion.so',
                description: 'All-in-one workspace for notes, docs, and collaboration',
                category: 'productivity',
                tags: ['notes', 'productivity', 'workspace'],
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
        });

        // 分类过滤
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.renderResources();
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
                                <option value="development">Development</option>
                                <option value="design">Design</option>
                                <option value="productivity">Productivity</option>
                                <option value="learning">Learning</option>
                                <option value="tools">Tools</option>
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
                        <button class="action-btn edit" onclick="resourceDB.editResource(${resource.id})" title="Edit">✏️</button>
                        <button class="action-btn delete" onclick="resourceDB.deleteResource(${resource.id})" title="Delete">🗑️</button>
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

        // 添加点击事件打开链接
        container.querySelectorAll('.resource-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.resource-actions') && !e.target.closest('.resource-url')) {
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
        modal.querySelector('.modal-save').onclick = () => {
            const formData = new FormData(form);
            
            resource.title = formData.get('title').trim();
            resource.url = formData.get('url').trim();
            resource.description = formData.get('description').trim();
            resource.category = formData.get('category');
            resource.tags = formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag);
            resource.favicon = formData.get('favicon').trim() || '🌐';

            this.saveData();
            this.renderResources();
            this.updateTagFilters();
            this.closeModal(modal);
        };

        document.body.appendChild(modal);
        modal.classList.add('show');
    }

    updateResourceCount() {
        const count = this.resources.length;
        document.getElementById('resourceCount').textContent = `${count} resource${count !== 1 ? 's' : ''}`;
    }

    updateTagFilters() {
        const allTags = [...new Set(this.resources.flatMap(resource => resource.tags))].sort();
        const tagFilterList = document.getElementById('tagFilterList');
        
        tagFilterList.innerHTML = `
            <button class="tag-filter-item active" data-tag="">
                <span class="tag-name">All Tags</span>
                <span class="tag-count">${this.resources.length}</span>
            </button>
            ${allTags.map(tag => {
                const count = this.resources.filter(resource => resource.tags.includes(tag)).length;
                return `
                    <button class="tag-filter-item" data-tag="${tag}">
                        <span class="tag-name">${tag}</span>
                        <span class="tag-count">${count}</span>
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
                this.renderResources();
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
}

// 初始化应用
let resourceDB;
document.addEventListener('DOMContentLoaded', () => {
    resourceDB = new ResourceDatabase();
});