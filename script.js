class List100 {
    constructor() {
        this.items = [];
        this.currentFilter = 'all';
        this.currentTag = '';
        this.init();
    }

    async init() {
        this.items = await this.loadFromStorage();
        this.bindEvents();
        this.updateTagFilter();
        this.render();
        this.updateProgress();
        this.updateSaveStatus();
        
        // 检查是否需要提醒备份
        this.checkBackupReminder();
    }
    
    checkBackupReminder() {
        const lastExport = localStorage.getItem('list100-last-export');
        const itemCount = this.items.length;
        
        // 如果有超过10个目标且7天没有导出过，提醒用户
        if (itemCount >= 10) {
            const daysSinceExport = lastExport ? 
                (Date.now() - new Date(lastExport).getTime()) / (1000 * 60 * 60 * 24) : 999;
            
            if (daysSinceExport >= 7) {
                setTimeout(() => {
                    if (confirm('建议定期备份你的数据！现在要导出备份吗？')) {
                        this.exportData();
                    }
                }, 2000);
            }
        }
    }

    bindEvents() {
        // 添加新项目
        document.getElementById('addItemBtn').addEventListener('click', () => {
            this.addItem();
        });



        // 筛选按钮
        document.querySelectorAll('.filter-tab').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // 标签筛选
        document.getElementById('tagFilterList').addEventListener('click', (e) => {
            const tagItem = e.target.closest('.tag-filter-item');
            if (tagItem) {
                document.querySelectorAll('.tag-filter-item').forEach(item => {
                    item.classList.remove('active');
                });
                tagItem.classList.add('active');
                this.currentTag = tagItem.dataset.tag;
                this.render();
            }
        });

        // 导入导出按钮
        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });

        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportData();
        });

        document.getElementById('fileInput').addEventListener('change', (e) => {
            this.importData(e.target.files[0]);
        });

        // 数据恢复按钮
        document.getElementById('recoverBtn').addEventListener('click', () => {
            this.recoverData();
        });

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.addItem();
            }
        });
    }

    addItem() {
        if (this.items.length >= 100) {
            alert('You have reached the limit of 100 goals!');
            return;
        }

        const newItem = {
            id: Date.now(),
            text: '',
            description: '',
            tags: [],
            completed: false,
            pinned: false,
            customOrder: this.items.length,
            createdAt: new Date().toISOString()
        };

        this.items.push(newItem);
        this.saveToStorage();
        this.render();
        this.updateProgress();

        setTimeout(() => {
            const newInput = document.querySelector(`[data-id="${newItem.id}"] .todo-text`);
            if (newInput) {
                newInput.focus();
            }
        }, 100);
    }

    deleteItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveToStorage();
        this.render();
        this.updateProgress();
    }

    toggleComplete(id) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.completed = !item.completed;
            
            if (item.completed) {
                item.completedAt = new Date().toISOString();
                item.progress = 100; // 确保进度也更新为100%
            } else {
                item.completedAt = null;
                // 如果取消完成，将进度设为95%（表示接近完成但未完成）
                if (item.progress === 100) {
                    item.progress = 95;
                }
            }
            
            this.saveToStorage();
            this.render();
            this.updateProgress();
        }
    }

    updateText(id, text) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.text = text;
            this.saveToStorage();
        }
    }

    updateDescription(id, description) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.description = description;
            this.saveToStorage();
        }
    }

    updateTags(id, tagsString) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.tags = tagsString
                .split(/[,\s]+/)
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);
            this.saveToStorage();
            this.updateTagFilter();
        }
    }

    togglePin(id) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.pinned = !item.pinned;
            
            // 如果取消置顶，重置自定义顺序
            if (!item.pinned) {
                item.customOrder = 0;
            } else {
                // 置顶时，设置为当前时间戳，确保最新置顶的在最前面
                item.customOrder = Date.now();
            }
            
            this.saveToStorage();
            this.render();
            
            // 显示提示
            const message = item.pinned ? 'Goal pinned to top!' : 'Goal unpinned!';
            this.showToast(message);
        }
    }

    setupDragAndDrop() {
        const todoList = document.getElementById('todoList');
        let draggedElement = null;
        let draggedId = null;

        // 拖动开始
        todoList.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('todo-item')) {
                draggedElement = e.target;
                draggedId = parseInt(e.target.dataset.id);
                e.target.style.opacity = '0.5';
                e.dataTransfer.effectAllowed = 'move';
            }
        });

        // 拖动结束
        todoList.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('todo-item')) {
                e.target.style.opacity = '';
                draggedElement = null;
                draggedId = null;
            }
        });

        // 拖动经过
        todoList.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            
            const afterElement = this.getDragAfterElement(todoList, e.clientY);
            if (afterElement == null) {
                todoList.appendChild(draggedElement);
            } else {
                todoList.insertBefore(draggedElement, afterElement);
            }
        });

        // 放置
        todoList.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedId) {
                this.updateItemOrder(draggedId);
            }
        });
    }

    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.todo-item:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    updateItemOrder(draggedId) {
        const todoList = document.getElementById('todoList');
        const items = [...todoList.querySelectorAll('.todo-item')];
        
        // 重新排序items数组
        const newOrder = [];
        items.forEach((element, index) => {
            const id = parseInt(element.dataset.id);
            const item = this.items.find(item => item.id === id);
            if (item) {
                item.customOrder = index;
                newOrder.push(item);
            }
        });
        
        // 更新items数组顺序
        this.items = newOrder;
        this.saveToStorage();
        
        this.showToast('Goal order updated!');
    }

    showToast(message, type = 'success') {
        // 移除现有的toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // 创建提示消息
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // 添加图标
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.success}</span>
            ${message}
        `;
        
        document.body.appendChild(toast);
        
        // 显示动画
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // 3秒后隐藏
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }



    setFilter(filter) {
        this.currentFilter = filter;
        
        document.querySelectorAll('.filter-tab').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.render();
    }

    getFilteredItems() {
        let filtered = this.items;
        
        switch (this.currentFilter) {
            case 'completed':
                filtered = filtered.filter(item => item.completed);
                break;
            case 'pending':
                filtered = filtered.filter(item => !item.completed);
                break;
        }
        
        if (this.currentTag) {
            filtered = filtered.filter(item => 
                item.tags && item.tags.includes(this.currentTag)
            );
        }
        
        // 排序：置顶的目标在前，然后按照自定义顺序或创建时间
        return filtered.sort((a, b) => {
            // 置顶的目标优先
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            
            // 如果都是置顶或都不是置顶，按照自定义顺序
            const orderA = a.customOrder || 0;
            const orderB = b.customOrder || 0;
            
            if (orderA !== orderB) {
                return orderA - orderB;
            }
            
            // 最后按创建时间排序
            return new Date(a.createdAt) - new Date(b.createdAt);
        });
    }

    render() {
        const todoList = document.getElementById('todoList');
        const filteredItems = this.getFilteredItems();

        if (filteredItems.length === 0) {
            todoList.innerHTML = this.getEmptyStateHTML();
            return;
        }

        todoList.innerHTML = filteredItems.map((item, index) => {
            const originalIndex = this.items.indexOf(item) + 1;
            return this.createItemHTML(item, originalIndex);
        }).join('');

        this.bindItemEvents();
    }

    getTagColor(tag) {
        const colors = [
            'tag-blue', 'tag-success', 'tag-orange', 'tag-purple', 
            'tag-teal', 'tag-pink', 'tag-warning', 'tag-indigo',
            'tag-red', 'tag-emerald', 'tag-amber', 'tag-violet'
        ];
        
        let hash = 0;
        for (let i = 0; i < tag.length; i++) {
            const char = tag.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        
        return colors[Math.abs(hash) % colors.length];
    }

    createItemHTML(item, number) {
        const tagsDisplay = item.tags && item.tags.length > 0 
            ? item.tags.map(tag => `<span class="tag ${this.getTagColor(tag)}" data-tag="${tag}">${tag}</span>`).join('')
            : '';
        
        const isPinned = item.pinned || false;
        const pinnedClass = isPinned ? 'pinned' : '';
        
        return `
            <li class="todo-item ${item.completed ? 'completed' : ''} ${pinnedClass}" data-id="${item.id}" draggable="true">
                <div class="drag-handle" title="Drag to reorder">⋮⋮</div>
                <span class="todo-number goal-link" data-id="${item.id}" title="View goal details">${number}</span>
                <div class="todo-checkbox ${item.completed ? 'checked' : ''}" data-id="${item.id}"></div>
                <div class="todo-content">
                    <input type="text" class="todo-text" value="${item.text || ''}" data-id="${item.id}" placeholder="Enter your goal...">
                    <input type="text" class="todo-description" value="${item.description || ''}" data-id="${item.id}" placeholder="Add description (optional)...">
                    <div class="tags-section">
                        <div class="tags-display">${tagsDisplay}</div>
                        <button class="add-tag-btn" data-id="${item.id}" title="Add tags">+</button>
                        <input type="text" class="todo-tags hidden" data-id="${item.id}" placeholder="Enter tags separated by commas...">
                    </div>
                </div>
                <div class="item-actions">
                    <button class="pin-btn ${isPinned ? 'pinned' : ''}" data-id="${item.id}" title="${isPinned ? 'Unpin goal' : 'Pin goal to top'}">
                        ${isPinned ? '●' : '○'}
                    </button>
                    <button class="delete-btn" data-id="${item.id}" title="Delete goal">×</button>
                </div>
            </li>
        `;
    }

    getEmptyStateHTML() {
        const messages = {
            all: { title: 'No goals yet', subtitle: 'Click "Add Goal" to start your journey' },
            completed: { title: 'No completed goals', subtitle: 'Start working on your first goal!' },
            pending: { title: 'All done!', subtitle: 'You have completed all your goals' }
        };

        const message = messages[this.currentFilter];
        return `
            <div class="empty-state">
                <h3>${message.title}</h3>
                <p>${message.subtitle}</p>
            </div>
        `;
    }

    bindItemEvents() {
        // 目标编号点击事件 - 跳转到详情页
        document.querySelectorAll('.goal-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                window.location.href = `goal-detail.html?id=${id}`;
            });
        });

        // 复选框点击事件
        document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
            checkbox.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.toggleComplete(id);
            });
        });

        // 置顶按钮事件
        document.querySelectorAll('.pin-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(e.target.dataset.id);
                this.togglePin(id);
            });
        });

        // 拖动排序事件
        this.setupDragAndDrop();

        // 文本输入事件
        document.querySelectorAll('.todo-text').forEach(input => {
            input.addEventListener('input', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.updateText(id, e.target.value);
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const descInput = e.target.parentElement.querySelector('.todo-description');
                    if (descInput) {
                        descInput.focus();
                    }
                }
            });
        });

        // 描述输入事件
        document.querySelectorAll('.todo-description').forEach(input => {
            input.addEventListener('input', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.updateDescription(id, e.target.value);
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const tagsInput = e.target.parentElement.querySelector('.add-tag-btn');
                    if (tagsInput) {
                        tagsInput.click();
                    }
                }
            });
        });

        // 添加标签按钮事件
        document.querySelectorAll('.add-tag-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const tagInput = e.target.parentElement.querySelector('.todo-tags');
                const addBtn = e.target;
                
                tagInput.classList.remove('hidden');
                addBtn.classList.add('hidden');
                tagInput.focus();
                
                const item = this.items.find(item => item.id === id);
                if (item && item.tags) {
                    tagInput.value = item.tags.join(', ');
                }
            });
        });

        // 标签输入事件
        document.querySelectorAll('.todo-tags').forEach(input => {
            input.addEventListener('blur', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.updateTags(id, e.target.value);
                
                e.target.classList.add('hidden');
                const addBtn = e.target.parentElement.querySelector('.add-tag-btn');
                addBtn.classList.remove('hidden');
                
                this.render();
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.target.blur();
                } else if (e.key === 'Escape') {
                    e.target.classList.add('hidden');
                    const addBtn = e.target.parentElement.querySelector('.add-tag-btn');
                    addBtn.classList.remove('hidden');
                    e.target.value = '';
                }
            });
        });

        // 标签点击编辑事件
        document.querySelectorAll('.tag').forEach(tag => {
            tag.addEventListener('click', (e) => {
                const tagText = e.target.textContent;
                const tagSection = e.target.closest('.tags-section');
                const tagInput = tagSection.querySelector('.todo-tags');
                const addBtn = tagSection.querySelector('.add-tag-btn');
                
                tagInput.classList.remove('hidden');
                addBtn.classList.add('hidden');
                tagInput.focus();
                
                const id = parseInt(tagInput.dataset.id);
                const item = this.items.find(item => item.id === id);
                if (item && item.tags) {
                    tagInput.value = item.tags.join(', ');
                }
            });
        });

        // 删除按钮事件
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                if (confirm('Are you sure you want to delete this goal?')) {
                    this.deleteItem(id);
                }
            });
        });
    }

    getAllTags() {
        const allTags = new Set();
        this.items.forEach(item => {
            if (item.tags) {
                item.tags.forEach(tag => allTags.add(tag));
            }
        });
        return Array.from(allTags).sort();
    }

    getTagCount(tag) {
        if (!tag) {
            return this.items.length;
        }
        return this.items.filter(item => 
            item.tags && item.tags.includes(tag)
        ).length;
    }

    updateTagFilter() {
        const tagFilterList = document.getElementById('tagFilterList');
        const allTags = this.getAllTags();
        const currentTag = this.currentTag || '';
        
        tagFilterList.innerHTML = '';
        
        const allTagsItem = document.createElement('button');
        allTagsItem.className = `tag-filter-item ${currentTag === '' ? 'active' : ''}`;
        allTagsItem.dataset.tag = '';
        
        const allCount = this.getTagCount('');
        allTagsItem.innerHTML = `
            <span class="tag-name">All Tags</span>
            <span class="tag-count">${allCount}</span>
        `;
        tagFilterList.appendChild(allTagsItem);
        
        // 按标签使用次数从高到低排序
        const tagsWithCounts = allTags.map(tag => ({
            name: tag,
            count: this.getTagCount(tag)
        }));
        
        tagsWithCounts.sort((a, b) => b.count - a.count);
        
        tagsWithCounts.forEach(tagData => {
            const tagItem = document.createElement('button');
            tagItem.className = `tag-filter-item ${currentTag === tagData.name ? 'active' : ''}`;
            tagItem.dataset.tag = tagData.name;
            
            tagItem.innerHTML = `
                <span class="tag-name">${tagData.name}</span>
                <span class="tag-count">${tagData.count}</span>
            `;
            tagFilterList.appendChild(tagItem);
        });
    }

    updateProgress() {
        const completedCount = this.items.filter(item => item.completed).length;
        const totalCount = this.items.length;
        const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

        // 检查进度元素是否存在，避免在删除进度模块后出错
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        if (progressText) {
            progressText.textContent = `${completedCount}/${totalCount}`;
        }
    }

    saveToStorage() {
        // 保存到localStorage
        localStorage.setItem('list100-items', JSON.stringify(this.items));
        
        // 同时保存到多个备份位置
        localStorage.setItem('list100-backup-1', JSON.stringify(this.items));
        localStorage.setItem('list100-backup-2', JSON.stringify(this.items));
        
        // 保存带时间戳的版本
        const timestamp = new Date().toISOString();
        localStorage.setItem('list100-last-save', timestamp);
        
        // 每10次保存创建一个历史备份
        const saveCount = parseInt(localStorage.getItem('list100-save-count') || '0') + 1;
        localStorage.setItem('list100-save-count', saveCount.toString());
        
        if (saveCount % 10 === 0) {
            localStorage.setItem(`list100-history-${saveCount}`, JSON.stringify({
                items: this.items,
                timestamp: timestamp,
                count: this.items.length
            }));
        }
        
        // 更新保存时间显示
        this.updateSaveStatus();
    }
    
    updateSaveStatus() {
        const lastSave = localStorage.getItem('list100-last-save');
        const lastSaveElement = document.getElementById('lastSaveTime');
        
        if (lastSave && lastSaveElement) {
            const saveTime = new Date(lastSave);
            const now = new Date();
            const diffMinutes = Math.floor((now - saveTime) / (1000 * 60));
            
            let timeText;
            if (diffMinutes < 1) {
                timeText = 'Just now';
            } else if (diffMinutes < 60) {
                timeText = `${diffMinutes}m ago`;
            } else {
                timeText = saveTime.toLocaleTimeString();
            }
            
            lastSaveElement.textContent = timeText;
        }
    }

    async loadFromStorage() {
        // 优先从localStorage加载
        const stored = localStorage.getItem('list100-items');
        if (stored) {
            try {
                const items = JSON.parse(stored);
                if (Array.isArray(items) && items.length > 0) {
                    console.log(`Found ${items.length} items in localStorage`);
                    return items;
                }
            } catch (error) {
                console.error('Error parsing localStorage data:', error);
            }
        }
        
        // 尝试从JSON文件加载
        try {
            const response = await fetch('./data.json');
            if (response.ok) {
                const data = await response.json();
                if (data.items && Array.isArray(data.items)) {
                    return data.items;
                }
            }
        } catch (error) {
            console.log('Loading from JSON file failed');
        }
        
        return [];
    }

    exportData() {
        const now = new Date();
        const data = {
            items: this.items,
            lastUpdated: now.toISOString(),
            exportedAt: now.toISOString(),
            totalItems: this.items.length,
            completedItems: this.items.filter(item => item.completed).length,
            version: '1.0'
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        // 生成带时间戳的文件名
        const timestamp = now.toISOString().slice(0, 19).replace(/:/g, '-');
        const filename = `list100-backup-${timestamp}.json`;
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        
        // 记录导出时间
        localStorage.setItem('list100-last-export', now.toISOString());
        
        alert(`数据已导出为 ${filename}`);
    }

    async importData(file) {
        if (!file) return;
        
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            
            if (data.items && Array.isArray(data.items)) {
                if (confirm('This will replace all current goals. Are you sure?')) {
                    this.items = data.items;
                    this.saveToStorage();
                    this.render();
                    this.updateProgress();
                    alert('Data imported successfully!');
                }
            } else {
                alert('Invalid file format. Please select a valid JSON file.');
            }
        } catch (error) {
            alert('Error reading file. Please make sure it is a valid JSON file.');
            console.error('Import error:', error);
        }
        
        document.getElementById('fileInput').value = '';
    }

    recoverData() {
        // 尝试多个备份源
        const backupSources = [
            'list100-items',
            'list100-backup-1', 
            'list100-backup-2'
        ];
        
        for (const source of backupSources) {
            const stored = localStorage.getItem(source);
            if (stored) {
                try {
                    const items = JSON.parse(stored);
                    if (Array.isArray(items) && items.length > 0) {
                        this.items = items;
                        this.render();
                        this.updateProgress();
                        this.updateTagFilter();
                        alert(`Successfully recovered ${items.length} items from ${source}!`);
                        return;
                    }
                } catch (error) {
                    console.error(`Error parsing ${source}:`, error);
                    continue;
                }
            }
        }
        
        // 尝试历史备份
        const historyBackups = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('list100-history-')) {
                try {
                    const backup = JSON.parse(localStorage.getItem(key));
                    historyBackups.push({
                        key: key,
                        data: backup,
                        count: backup.count,
                        timestamp: backup.timestamp
                    });
                } catch (error) {
                    continue;
                }
            }
        }
        
        if (historyBackups.length > 0) {
            // 按时间戳排序，最新的在前
            historyBackups.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            const latest = historyBackups[0];
            
            if (confirm(`Found historical backup with ${latest.count} items from ${new Date(latest.timestamp).toLocaleString()}. Restore this backup?`)) {
                this.items = latest.data.items;
                this.render();
                this.updateProgress();
                this.updateTagFilter();
                alert(`Successfully recovered ${latest.count} items from historical backup!`);
                return;
            }
        }
        
        alert('No recoverable data found in any backup location.');
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new List100();
});