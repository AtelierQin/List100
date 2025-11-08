class GoalDetail {
    constructor() {
        this.goalId = this.getGoalIdFromURL();
        this.goal = null;
        this.notes = [];
        this.pendingAttachments = [];
        this.autoSaveTimer = null;
        this.lastSaveTime = null;
        this.init();
    }

    getGoalIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('id')) || null;
    }

    async init() {
        if (!this.goalId) {
            alert('Goal not found');
            window.location.href = 'list100.html';
            return;
        }

        await this.loadGoal();
        if (!this.goal) {
            alert('Goal not found');
            window.location.href = 'list100.html';
            return;
        }

        this.loadNotes();
        this.bindEvents();
        this.render();
        this.setupAutoSave();
        this.addSaveStatusIndicator();
        this.setupDataSync();
    }

    async loadGoal() {
        try {
            const stored = localStorage.getItem('list100-items');
            if (stored) {
                const items = JSON.parse(stored);
                this.goal = items.find(item => item.id === this.goalId);
                
                // 如果没有找到目标，可能是数据不同步，尝试从备份加载
                if (!this.goal) {
                    const backup1 = localStorage.getItem('list100-backup-1');
                    const backup2 = localStorage.getItem('list100-backup-2');
                    
                    for (const backup of [backup1, backup2]) {
                        if (backup) {
                            try {
                                const backupItems = JSON.parse(backup);
                                this.goal = backupItems.find(item => item.id === this.goalId);
                                if (this.goal) {
                                    console.log('Goal loaded from backup');
                                    break;
                                }
                            } catch (e) {
                                continue;
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error loading goal:', error);
        }
    }

    loadNotes() {
        try {
            const stored = localStorage.getItem(`list100-notes-${this.goalId}`);
            if (stored) {
                this.notes = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading notes:', error);
            this.notes = [];
        }
    }

    saveGoal() {
        try {
            const stored = localStorage.getItem('list100-items');
            if (stored) {
                const items = JSON.parse(stored);
                const index = items.findIndex(item => item.id === this.goalId);
                if (index !== -1) {
                    // 更新目标数据
                    this.goal.lastModified = new Date().toISOString();
                    items[index] = this.goal;
                    
                    // 主要存储
                    localStorage.setItem('list100-items', JSON.stringify(items));
                    
                    // 创建多重备份
                    this.createBackups(items);
                    
                    // 更新保存状态
                    this.lastSaveTime = new Date();
                    this.updateSaveStatus();
                    
                    console.log('Goal saved successfully at', this.lastSaveTime.toLocaleTimeString());
                }
            }
        } catch (error) {
            console.error('Error saving goal:', error);
            this.showSaveError('Failed to save goal changes');
        }
    }

    saveNotes() {
        try {
            // 主要存储
            localStorage.setItem(`list100-notes-${this.goalId}`, JSON.stringify(this.notes));
            
            // 备份存储
            localStorage.setItem(`list100-notes-backup-${this.goalId}`, JSON.stringify(this.notes));
            
            // 带时间戳的历史备份
            const timestamp = new Date().toISOString();
            localStorage.setItem(`list100-notes-history-${this.goalId}-${Date.now()}`, JSON.stringify({
                notes: this.notes,
                timestamp: timestamp,
                goalId: this.goalId
            }));
            
            // 清理旧的历史备份（只保留最近5个）
            this.cleanupHistoryBackups();
            
            this.lastSaveTime = new Date();
            this.updateSaveStatus();
            
            console.log('Notes saved successfully at', this.lastSaveTime.toLocaleTimeString());
        } catch (error) {
            console.error('Error saving notes:', error);
            this.showSaveError('Failed to save notes');
        }
    }

    bindEvents() {
        // 目标标题编辑 - 使用防抖保存
        document.getElementById('goalTitle').addEventListener('input', (e) => {
            this.goal.text = e.target.value;
            this.debouncedSave();
        });

        // 目标描述编辑 - 使用防抖保存
        document.getElementById('goalDescription').addEventListener('input', (e) => {
            this.goal.description = e.target.value;
            this.debouncedSave();
        });

        // 完成状态切换
        document.getElementById('completeToggle').addEventListener('click', () => {
            this.toggleComplete();
        });

        // 完成日期输入
        document.getElementById('completionDateInput').addEventListener('change', (e) => {
            this.updateCompletionDate(e.target.value);
        });

        // 标签管理
        document.getElementById('addTagBtn').addEventListener('click', () => {
            this.showTagInput();
        });

        document.getElementById('tagInput').addEventListener('blur', () => {
            this.hideTagInput();
        });

        document.getElementById('tagInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.updateTags();
            } else if (e.key === 'Escape') {
                this.hideTagInput();
            }
        });

        // 笔记管理
        document.getElementById('addNoteBtn').addEventListener('click', () => {
            this.addNote();
        });

        document.getElementById('noteInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.addNote();
            }
        });

        // 照片上传
        document.getElementById('attachPhotoBtn').addEventListener('click', () => {
            document.getElementById('photoInput').click();
        });

        document.getElementById('photoInput').addEventListener('change', (e) => {
            this.handlePhotoUpload(e.target.files);
        });

        // 操作按钮
        document.getElementById('backToListBtn').addEventListener('click', () => {
            this.backToList();
        });

        document.getElementById('shareBtn').addEventListener('click', () => {
            this.shareGoal();
        });

        document.getElementById('exportGoalBtn').addEventListener('click', () => {
            this.exportGoalData();
        });

        document.getElementById('deleteBtn').addEventListener('click', () => {
            this.deleteGoal();
        });
    }

    render() {
        // 更新目标编号
        const goalNumber = this.getGoalNumber();
        document.getElementById('goalNumber').textContent = `#${goalNumber}`;

        // 更新标题
        document.getElementById('goalTitle').value = this.goal.text || '';

        // 更新描述
        document.getElementById('goalDescription').value = this.goal.description || '';

        // 更新状态
        this.updateStatus();

        // 更新日期
        this.updateDates();

        // 更新标签
        this.renderTags();

        // 更新笔记
        this.renderNotes();

        // 更新统计
        this.updateStats();
    }

    getGoalNumber() {
        try {
            const stored = localStorage.getItem('list100-items');
            if (stored) {
                const items = JSON.parse(stored);
                const index = items.findIndex(item => item.id === this.goalId);
                return index + 1;
            }
        } catch (error) {
            console.error('Error getting goal number:', error);
        }
        return 1;
    }

    updateStatus() {
        const statusIndicator = document.getElementById('statusIndicator');
        const statusText = document.getElementById('statusText');
        const completeToggle = document.getElementById('completeToggle');
        const toggleText = completeToggle.querySelector('.toggle-text');

        if (this.goal.completed) {
            statusIndicator.classList.add('completed');
            statusText.textContent = 'Completed';
            completeToggle.classList.add('completed');
            toggleText.textContent = 'Mark Incomplete';
        } else {
            statusIndicator.classList.remove('completed');
            statusText.textContent = 'In Progress';
            completeToggle.classList.remove('completed');
            toggleText.textContent = 'Mark Complete';
        }
    }

    updateDates() {
        const createdDate = document.getElementById('createdDate');
        const completionDateSection = document.getElementById('completionDateSection');
        const completionDateInput = document.getElementById('completionDateInput');

        if (this.goal.createdAt) {
            const date = new Date(this.goal.createdAt);
            createdDate.textContent = `Created on ${date.toLocaleDateString()}`;
        }

        if (this.goal.completed) {
            completionDateSection.classList.remove('hidden');
            if (this.goal.completedAt) {
                const date = new Date(this.goal.completedAt);
                completionDateInput.value = date.toISOString().split('T')[0];
            } else {
                // 如果没有完成日期，设置为今天，但不自动保存
                const today = new Date();
                completionDateInput.value = today.toISOString().split('T')[0];
            }
        } else {
            completionDateSection.classList.add('hidden');
        }
    }

    renderTags() {
        const tagsDisplay = document.getElementById('tagsDisplay');
        
        if (this.goal.tags && this.goal.tags.length > 0) {
            tagsDisplay.innerHTML = this.goal.tags.map(tag => 
                `<span class="tag ${this.getTagColor(tag)}" data-tag="${tag}">${tag}</span>`
            ).join('');
        } else {
            tagsDisplay.innerHTML = '';
        }

        // 绑定标签点击事件
        tagsDisplay.querySelectorAll('.tag').forEach(tag => {
            tag.addEventListener('click', () => {
                this.showTagInput();
            });
        });
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

    showTagInput() {
        const tagInput = document.getElementById('tagInput');
        const addTagBtn = document.getElementById('addTagBtn');
        
        tagInput.classList.remove('hidden');
        addTagBtn.classList.add('hidden');
        
        if (this.goal.tags) {
            tagInput.value = this.goal.tags.join(', ');
        }
        
        tagInput.focus();
    }

    hideTagInput() {
        const tagInput = document.getElementById('tagInput');
        const addTagBtn = document.getElementById('addTagBtn');
        
        this.updateTags();
        
        tagInput.classList.add('hidden');
        addTagBtn.classList.remove('hidden');
    }

    updateTags() {
        const tagInput = document.getElementById('tagInput');
        const tagsString = tagInput.value;
        
        this.goal.tags = tagsString
            .split(/[,\s]+/)
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);
        
        this.saveGoal();
        this.renderTags();
    }

    renderNotes() {
        const notesList = document.getElementById('notesList');
        
        if (this.notes.length === 0) {
            notesList.innerHTML = '<p style="color: var(--color-text-muted); font-size: 14px; text-align: center; padding: 20px;">No notes yet. Add your first note below.</p>';
            return;
        }

        notesList.innerHTML = this.notes.map((note, index) => {
            const photosHtml = note.photos && note.photos.length > 0 
                ? `<div class="note-photos">${note.photos.map(photo => 
                    `<div class="note-photo" onclick="goalDetail.openPhotoModal('${photo}')">
                        <img src="${photo}" alt="Note photo">
                    </div>`
                ).join('')}</div>`
                : '';
            
            return `
                <div class="note-item" data-index="${index}">
                    <div class="note-content">${this.escapeHtml(note.content)}</div>
                    ${photosHtml}
                    <div class="note-meta">
                        <span>${new Date(note.createdAt).toLocaleString()}</span>
                        <div class="note-actions">
                            <button class="note-action edit-note" data-index="${index}">Edit</button>
                            <button class="note-action delete-note" data-index="${index}">Delete</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // 绑定笔记操作事件
        notesList.querySelectorAll('.edit-note').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.editNote(index);
            });
        });

        notesList.querySelectorAll('.delete-note').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.deleteNote(index);
            });
        });
    }

    addNote() {
        const noteInput = document.getElementById('noteInput');
        const content = noteInput.value.trim();
        
        if (!content && this.pendingAttachments.length === 0) return;

        const note = {
            id: Date.now(),
            content: content,
            photos: [...this.pendingAttachments],
            createdAt: new Date().toISOString()
        };

        this.notes.unshift(note);
        this.saveNotes();
        this.renderNotes();
        this.updateStats();
        
        noteInput.value = '';
        this.pendingAttachments = [];
        this.renderAttachmentPreviews();
    }

    editNote(index) {
        const note = this.notes[index];
        const newContent = prompt('Edit note:', note.content);
        
        if (newContent !== null && newContent.trim()) {
            this.notes[index].content = newContent.trim();
            this.notes[index].updatedAt = new Date().toISOString();
            this.saveNotes();
            this.renderNotes();
        }
    }

    deleteNote(index) {
        if (confirm('Are you sure you want to delete this note?')) {
            this.notes.splice(index, 1);
            this.saveNotes();
            this.renderNotes();
            this.updateStats();
        }
    }

    toggleComplete() {
        const wasCompleted = this.goal.completed;
        this.goal.completed = !this.goal.completed;
        
        if (this.goal.completed) {
            // 标记为完成
            this.goal.progress = 100;
            if (!this.goal.completedAt) {
                this.goal.completedAt = new Date().toISOString();
            }
            this.showToast('Goal marked as completed! 🎉');
        } else {
            // 取消完成
            this.goal.completedAt = null;
            // 如果进度是100%，降到95%以表示未完成
            if (this.goal.progress === 100) {
                this.goal.progress = 95;
            }
            this.showToast('Goal marked as in progress');
        }
        
        this.saveGoal();
        this.updateAllUI();
    }

    updateCompletionDate(dateString) {
        if (!dateString || !this.goal.completed) {
            return;
        }
        
        const selectedDate = new Date(dateString + 'T12:00:00');
        const createdDate = new Date(this.goal.createdAt);
        const today = new Date();
        
        // 验证日期合理性
        if (selectedDate < createdDate) {
            // 如果完成日期早于创建日期，询问用户是否要记录之前完成的目标
            const confirmMessage = `The completion date (${selectedDate.toLocaleDateString()}) is earlier than when you created this goal (${createdDate.toLocaleDateString()}).\n\nDid you complete this goal before adding it to your list?`;
            
            if (!confirm(confirmMessage)) {
                // 重置为之前的日期
                if (this.goal.completedAt) {
                    const currentDate = new Date(this.goal.completedAt);
                    document.getElementById('completionDateInput').value = currentDate.toISOString().split('T')[0];
                } else {
                    // 如果没有之前的日期，设置为创建日期
                    document.getElementById('completionDateInput').value = createdDate.toISOString().split('T')[0];
                }
                return;
            }
            
            // 用户确认要记录之前完成的目标
            this.showToast('Recording previously completed goal');
        }
        
        if (selectedDate > today) {
            const daysDiff = Math.ceil((selectedDate - today) / (1000 * 60 * 60 * 24));
            const confirmMessage = `Completion date is ${daysDiff} day${daysDiff > 1 ? 's' : ''} in the future. Are you sure?`;
            
            if (!confirm(confirmMessage)) {
                // 重置为之前的日期
                if (this.goal.completedAt) {
                    const currentDate = new Date(this.goal.completedAt);
                    document.getElementById('completionDateInput').value = currentDate.toISOString().split('T')[0];
                } else {
                    // 如果没有之前的日期，设置为今天
                    document.getElementById('completionDateInput').value = today.toISOString().split('T')[0];
                }
                return;
            }
        }
        
        this.goal.completedAt = selectedDate.toISOString();
        this.saveGoal();
        this.showToast('Completion date updated');
    }



    updateStats() {
        // 计算活跃天数
        const createdDate = new Date(this.goal.createdAt);
        const now = new Date();
        const daysActive = Math.ceil((now - createdDate) / (1000 * 60 * 60 * 24));
        
        document.getElementById('daysActive').textContent = daysActive;
        document.getElementById('notesCount').textContent = this.notes.length;
        
        // 最后更新时间
        const lastUpdated = this.getLastUpdatedTime();
        document.getElementById('lastUpdated').textContent = lastUpdated;
    }

    getLastUpdatedTime() {
        const times = [this.goal.createdAt];
        
        if (this.goal.completedAt) {
            times.push(this.goal.completedAt);
        }
        
        if (this.notes.length > 0) {
            times.push(...this.notes.map(note => note.createdAt));
            times.push(...this.notes.filter(note => note.updatedAt).map(note => note.updatedAt));
        }
        
        const latestTime = new Date(Math.max(...times.map(time => new Date(time))));
        const now = new Date();
        const diffMinutes = Math.floor((now - latestTime) / (1000 * 60));
        
        if (diffMinutes < 1) {
            return 'Just now';
        } else if (diffMinutes < 60) {
            return `${diffMinutes}m ago`;
        } else if (diffMinutes < 1440) {
            return `${Math.floor(diffMinutes / 60)}h ago`;
        } else {
            return `${Math.floor(diffMinutes / 1440)}d ago`;
        }
    }

    backToList() {
        // 保存当前数据
        this.saveGoal();
        if (this.notes.length > 0) {
            this.saveNotes();
        }
        
        // 返回到List100页面
        window.location.href = 'list100.html';
    }

    shareGoal() {
        const shareText = `${this.goal.text}${this.goal.description ? `\n\n${this.goal.description}` : ''}${this.goal.tags && this.goal.tags.length > 0 ? `\n\nTags: ${this.goal.tags.join(', ')}` : ''}`;
        
        navigator.clipboard.writeText(shareText).then(() => {
            // 显示成功提示
            const successIndicator = document.createElement('div');
            successIndicator.style.cssText = `
                position: fixed;
                top: 60px;
                right: 20px;
                background: rgba(16, 185, 129, 0.9);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 500;
                z-index: 1000;
                transition: opacity 0.3s ease;
            `;
            successIndicator.textContent = 'Goal text copied to clipboard!';
            document.body.appendChild(successIndicator);
            
            setTimeout(() => {
                if (successIndicator.parentNode) {
                    successIndicator.parentNode.removeChild(successIndicator);
                }
            }, 3000);
        }).catch(() => {
            alert('Unable to copy to clipboard');
        });
    }



    deleteGoal() {
        const goalTitle = this.goal.text || 'Untitled Goal';
        const confirmMessage = `Are you sure you want to delete "${goalTitle}"?\n\nThis will permanently remove:\n• The goal and its description\n• All notes and photos\n• All progress data\n\nThis action cannot be undone.`;
        
        if (confirm(confirmMessage)) {
            // 二次确认
            const finalConfirm = prompt('To confirm deletion, please type "DELETE" (in capital letters):');
            
            if (finalConfirm === 'DELETE') {
                try {
                    const stored = localStorage.getItem('list100-items');
                    if (stored) {
                        const items = JSON.parse(stored);
                        const filteredItems = items.filter(item => item.id !== this.goalId);
                        
                        // 保存更新后的列表
                        localStorage.setItem('list100-items', JSON.stringify(filteredItems));
                        
                        // 创建备份
                        this.createBackups(filteredItems);
                        
                        // 删除相关数据
                        localStorage.removeItem(`list100-notes-${this.goalId}`);
                        localStorage.removeItem(`list100-notes-backup-${this.goalId}`);
                        
                        // 清理历史备份
                        for (let i = 0; i < localStorage.length; i++) {
                            const key = localStorage.key(i);
                            if (key && key.startsWith(`list100-notes-history-${this.goalId}-`)) {
                                localStorage.removeItem(key);
                                i--; // 调整索引，因为localStorage长度改变了
                            }
                        }
                        
                        alert('Goal deleted successfully!');
                        window.location.href = 'list100.html';
                    }
                } catch (error) {
                    console.error('Error deleting goal:', error);
                    alert('Error deleting goal. Please try again.');
                }
            } else if (finalConfirm !== null) {
                alert('Deletion cancelled. You must type "DELETE" exactly to confirm.');
            }
        }
    }

    handlePhotoUpload(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.pendingAttachments.push(e.target.result);
                    this.renderAttachmentPreviews();
                };
                reader.readAsDataURL(file);
            }
        });
        
        // 清空文件输入
        document.getElementById('photoInput').value = '';
    }

    renderAttachmentPreviews() {
        const attachmentsContainer = document.getElementById('noteAttachments');
        
        if (this.pendingAttachments.length === 0) {
            attachmentsContainer.innerHTML = '';
            return;
        }

        attachmentsContainer.innerHTML = this.pendingAttachments.map((photo, index) => `
            <div class="attachment-preview">
                <img src="${photo}" alt="Preview">
                <button class="attachment-remove" onclick="goalDetail.removeAttachment(${index})">×</button>
            </div>
        `).join('');
    }

    removeAttachment(index) {
        this.pendingAttachments.splice(index, 1);
        this.renderAttachmentPreviews();
    }

    openPhotoModal(photoSrc) {
        // 创建模态框显示大图
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            cursor: pointer;
        `;
        
        const img = document.createElement('img');
        img.src = photoSrc;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 8px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        `;
        
        modal.appendChild(img);
        document.body.appendChild(modal);
        
        modal.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }

    createBackups(items) {
        try {
            // 创建多个备份位置
            localStorage.setItem('list100-backup-1', JSON.stringify(items));
            localStorage.setItem('list100-backup-2', JSON.stringify(items));
            
            // 带时间戳的备份
            const timestamp = new Date().toISOString();
            localStorage.setItem('list100-last-save', timestamp);
            
            // 每10次保存创建一个历史备份
            const saveCount = parseInt(localStorage.getItem('list100-save-count') || '0') + 1;
            localStorage.setItem('list100-save-count', saveCount.toString());
            
            if (saveCount % 10 === 0) {
                localStorage.setItem(`list100-history-${saveCount}`, JSON.stringify({
                    items: items,
                    timestamp: timestamp,
                    count: items.length
                }));
            }
        } catch (error) {
            console.error('Error creating backups:', error);
        }
    }

    cleanupHistoryBackups() {
        try {
            const historyKeys = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(`list100-notes-history-${this.goalId}-`)) {
                    historyKeys.push({
                        key: key,
                        timestamp: parseInt(key.split('-').pop())
                    });
                }
            }
            
            // 按时间戳排序，保留最新的5个
            historyKeys.sort((a, b) => b.timestamp - a.timestamp);
            
            // 删除多余的备份
            for (let i = 5; i < historyKeys.length; i++) {
                localStorage.removeItem(historyKeys[i].key);
            }
        } catch (error) {
            console.error('Error cleaning up history backups:', error);
        }
    }

    setupAutoSave() {
        // 每30秒自动保存一次
        setInterval(() => {
            if (this.goal) {
                this.saveGoal();
            }
            if (this.notes.length > 0) {
                this.saveNotes();
            }
        }, 30000);

        // 页面关闭前保存
        window.addEventListener('beforeunload', () => {
            if (this.goal) {
                this.saveGoal();
            }
            if (this.notes.length > 0) {
                this.saveNotes();
            }
        });

        // 页面失去焦点时保存
        window.addEventListener('blur', () => {
            if (this.goal) {
                this.saveGoal();
            }
        });
    }

    setupDataSync() {
        // 监听localStorage变化，实时同步数据
        window.addEventListener('storage', (e) => {
            if (e.key === 'list100-items' && e.newValue) {
                this.handleDataSync(e.newValue);
            }
        });

        // 监听自定义数据更新事件
        window.addEventListener('list100DataUpdate', (e) => {
            if (e.detail.itemId === this.goalId) {
                console.log(`Received data update for goal ${this.goalId}, type: ${e.detail.updateType}`);
                this.refreshGoalData();
            }
        });

        // 页面获得焦点时重新加载数据
        window.addEventListener('focus', () => {
            this.refreshGoalData();
        });

        // 定期检查数据同步（每5秒）
        setInterval(() => {
            this.checkDataSync();
        }, 5000);
    }

    handleDataSync(newValue) {
        try {
            const items = JSON.parse(newValue);
            const updatedGoal = items.find(item => item.id === this.goalId);
            if (updatedGoal) {
                // 检查是否有实际变化
                const hasChanges = this.hasGoalChanged(updatedGoal);
                if (hasChanges) {
                    console.log('Goal data changed, updating UI');
                    this.goal = updatedGoal;
                    this.updateAllUI();
                    this.showToast('Goal updated from main page', 'info');
                }
            }
        } catch (error) {
            console.error('Error syncing data:', error);
        }
    }

    hasGoalChanged(newGoal) {
        if (!this.goal) return true;
        
        // 比较关键字段
        const fieldsToCompare = ['text', 'description', 'tags', 'completed', 'pinned', 'progress', 'lastModified'];
        
        for (const field of fieldsToCompare) {
            if (JSON.stringify(this.goal[field]) !== JSON.stringify(newGoal[field])) {
                console.log(`Field ${field} changed:`, this.goal[field], '->', newGoal[field]);
                return true;
            }
        }
        
        return false;
    }

    checkDataSync() {
        // 检查localStorage中的数据是否比当前数据更新
        try {
            const stored = localStorage.getItem('list100-items');
            if (stored) {
                const items = JSON.parse(stored);
                const storedGoal = items.find(item => item.id === this.goalId);
                if (storedGoal && storedGoal.lastModified && this.goal.lastModified) {
                    const storedTime = new Date(storedGoal.lastModified);
                    const currentTime = new Date(this.goal.lastModified);
                    
                    if (storedTime > currentTime) {
                        console.log('Detected newer data in localStorage, syncing...');
                        this.goal = storedGoal;
                        this.updateAllUI();
                    }
                }
            }
        } catch (error) {
            console.error('Error checking data sync:', error);
        }
    }

    refreshGoalData() {
        try {
            const stored = localStorage.getItem('list100-items');
            if (stored) {
                const items = JSON.parse(stored);
                const updatedGoal = items.find(item => item.id === this.goalId);
                if (updatedGoal) {
                    const hasChanges = this.hasGoalChanged(updatedGoal);
                    if (hasChanges) {
                        console.log('Refreshing goal data with changes');
                        this.goal = updatedGoal;
                        this.updateAllUI();
                        console.log('Goal data refreshed successfully');
                    }
                }
            }
        } catch (error) {
            console.error('Error refreshing goal data:', error);
        }
    }

    debouncedSave() {
        // 清除之前的定时器
        if (this.autoSaveTimer) {
            clearTimeout(this.autoSaveTimer);
        }
        
        // 设置新的定时器，1秒后保存
        this.autoSaveTimer = setTimeout(() => {
            this.saveGoal();
        }, 1000);
    }

    addSaveStatusIndicator() {
        // 在页面顶部添加保存状态指示器
        const statusIndicator = document.createElement('div');
        statusIndicator.id = 'saveStatus';
        statusIndicator.style.cssText = `
            position: fixed;
            top: 60px;
            right: 20px;
            background: rgba(16, 185, 129, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        statusIndicator.textContent = 'Saved';
        document.body.appendChild(statusIndicator);
    }

    updateSaveStatus() {
        const statusIndicator = document.getElementById('saveStatus');
        if (statusIndicator && this.lastSaveTime) {
            statusIndicator.textContent = `Saved at ${this.lastSaveTime.toLocaleTimeString()}`;
            statusIndicator.style.opacity = '1';
            
            // 3秒后隐藏
            setTimeout(() => {
                statusIndicator.style.opacity = '0';
            }, 3000);
        }
    }

    showSaveError(message) {
        // 显示保存错误提示
        const errorIndicator = document.createElement('div');
        errorIndicator.style.cssText = `
            position: fixed;
            top: 60px;
            right: 20px;
            background: rgba(245, 101, 101, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            z-index: 1000;
            transition: opacity 0.3s ease;
        `;
        errorIndicator.textContent = message;
        document.body.appendChild(errorIndicator);
        
        // 5秒后移除
        setTimeout(() => {
            if (errorIndicator.parentNode) {
                errorIndicator.parentNode.removeChild(errorIndicator);
            }
        }, 5000);
    }

    exportGoalData() {
        try {
            const goalData = {
                goal: this.goal,
                notes: this.notes,
                exportedAt: new Date().toISOString(),
                version: '1.0'
            };
            
            const dataStr = JSON.stringify(goalData, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            
            const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
            const filename = `goal-${this.goalId}-backup-${timestamp}.json`;
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = filename;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
            
            alert(`Goal data exported as ${filename}`);
        } catch (error) {
            console.error('Error exporting goal data:', error);
            alert('Failed to export goal data');
        }
    }

    updateAllUI() {
        // 统一更新所有UI元素
        this.updateBasicInfo();
        this.renderTags();
        this.updateStatus();
        this.updateDates();
        this.updateStats();
    }

    updateBasicInfo() {
        // 更新基本信息
        const titleElement = document.getElementById('goalTitle');
        const descriptionElement = document.getElementById('goalDescription');
        
        if (titleElement) {
            titleElement.textContent = this.goal.text || 'Untitled Goal';
        }
        
        if (descriptionElement) {
            descriptionElement.textContent = this.goal.description || 'No description';
        }
    }

    showToast(message, type = 'success') {
        // 移除现有的toast
        const existingToast = document.getElementById('goalToast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // 定义不同类型的样式
        const colors = {
            success: 'rgba(16, 185, 129, 0.9)',
            info: 'rgba(59, 130, 246, 0.9)',
            warning: 'rgba(245, 158, 11, 0.9)',
            error: 'rgba(239, 68, 68, 0.9)'
        };
        
        // 创建提示消息
        const toast = document.createElement('div');
        toast.id = 'goalToast';
        toast.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: ${colors[type] || colors.success};
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            max-width: 300px;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // 显示动画
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 100);
        
        // 3秒后隐藏
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }



    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// 初始化应用
let goalDetail;
document.addEventListener('DOMContentLoaded', () => {
    goalDetail = new GoalDetail();
});