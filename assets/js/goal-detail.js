class GoalDetail {
    constructor() {
        this.goalId = this.getGoalIdFromURL();
        this.goal = null;
        this.notes = [];
        this.pendingAttachments = [];
        this.autoSaveTimer = null;
        this.lastSaveTime = null;

        // Collections data - loaded from full data sources
        this.mockCollections = this.loadCollections();

        this.init();
    }

    /**
     * Load collections data from full data sources
     * Books: From BOOKS_DATA (thu-book-list.js)
     * Tours: From world countries data (world.js)
     */
    loadCollections() {
        const collections = {
            books: [],
            tours: []
        };

        // Load books from BOOKS_DATA if available (defined in thu-book-list.js)
        if (typeof BOOKS_DATA !== 'undefined' && Array.isArray(BOOKS_DATA)) {
            collections.books = BOOKS_DATA.map(book => ({
                id: `book-${book.number}`,
                title: book.title,
                author: book.author,
                type: 'book',
                category: book.category || '',
                description: book.description || ''
            }));
            console.log(`Loaded ${collections.books.length} books from THU Book List`);
        } else {
            console.warn('BOOKS_DATA not found. Make sure thu-book-list.js is loaded.');
            // Fallback mock data
            collections.books = [
                { id: 'b1', title: '红楼梦', author: '曹雪芹', type: 'book' },
                { id: 'b2', title: '人类简史', author: '尤瓦尔·赫拉利', type: 'book' }
            ];
        }

        // Load world tours from travelMap countries if available (world.js)
        // Generate tour items from world countries
        if (typeof travelMap !== 'undefined' && travelMap.countries) {
            travelMap.countries.forEach((country, code) => {
                collections.tours.push({
                    id: `tour-${code}`,
                    title: `${country.name} (${country.nameCn})`,
                    location: country.continent,
                    capital: country.capital,
                    flag: country.flag,
                    type: 'tour'
                });
            });
            console.log(`Loaded ${collections.tours.length} tour destinations from World Map`);
        } else {
            // Fallback: Try to load from localStorage or use minimal mock
            const visitedData = localStorage.getItem('travel-visited-countries');
            if (visitedData) {
                try {
                    const visited = JSON.parse(visitedData);
                    // Use just the country codes as basic tour options
                    visited.forEach(([code, data]) => {
                        collections.tours.push({
                            id: `tour-${code}`,
                            title: code,
                            location: 'World',
                            type: 'tour'
                        });
                    });
                } catch (e) {
                    console.warn('Could not parse travel data');
                }
            }

            // If still empty, add basic fallback tours
            if (collections.tours.length === 0) {
                console.warn('World map data not found. Using fallback tours.');
                collections.tours = [
                    { id: 't-JP', title: 'Japan (日本)', location: 'Asia', type: 'tour' },
                    { id: 't-FR', title: 'France (法国)', location: 'Europe', type: 'tour' },
                    { id: 't-US', title: 'United States (美国)', location: 'North America', type: 'tour' }
                ];
            }
        }

        return collections;
    }

    getGoalIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('id')) || null;
    }

    async init() {
        console.log('=== Initializing GoalDetail ===');
        console.log('Goal ID:', this.goalId);

        this.initTabs();

        // 测试 localStorage 是否可用
        if (!this.testLocalStorage()) {
            alert('LocalStorage is not available. Notes cannot be saved. Please check your browser settings.');
            return;
        }

        if (!this.goalId) {
            alert('Goal not found');
            window.location.href = 'list100.html';
            return;
        }

        console.log('Loading goal...');
        await this.loadGoal();
        if (!this.goal) {
            alert('Goal not found');
            window.location.href = 'list100.html';
            return;
        }
        console.log('Goal loaded:', this.goal.text);

        console.log('Loading notes...');
        this.loadNotes();
        console.log('Notes loaded, count:', this.notes.length);

        console.log('Binding events...');
        this.bindEvents();

        console.log('Rendering UI...');
        this.render();

        console.log('Setting up auto-save...');
        this.setupAutoSave();

        console.log('Adding save status indicator...');
        this.addSaveStatusIndicator();

        console.log('Setting up data sync...');
        this.setupDataSync();

        console.log('=== Initialization complete ===');
    }

    testLocalStorage() {
        try {
            const testKey = 'list100-test';
            const testValue = 'test-value-' + Date.now();
            localStorage.setItem(testKey, testValue);
            const retrieved = localStorage.getItem(testKey);
            localStorage.removeItem(testKey);

            if (retrieved === testValue) {
                console.log('✓ LocalStorage is working correctly');
                return true;
            } else {
                console.error('✗ LocalStorage test failed: value mismatch');
                return false;
            }
        } catch (error) {
            console.error('✗ LocalStorage is not available:', error);
            return false;
        }
    }

    async loadGoal() {
        try {
            const stored = localStorage.getItem('list100-items');
            if (stored) {
                const items = JSON.parse(stored);
                this.goal = items.find(item => item.id === this.goalId);

                if (this.goal && !this.goal.milestones) {
                    this.goal.milestones = [];
                }

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
            const key = `list100-notes-${this.goalId}`;
            console.log('Loading notes with key:', key);
            const stored = localStorage.getItem(key);
            console.log('Stored notes data:', stored);

            if (stored) {
                this.notes = JSON.parse(stored);
                console.log('Loaded notes:', this.notes.length, 'notes');
            } else {
                console.log('No stored notes found');
                this.notes = [];
            }
        } catch (error) {
            console.error('Error loading notes:', error);
            this.notes = [];

            // 尝试从备份恢复
            try {
                const backupKey = `list100-notes-backup-${this.goalId}`;
                const backup = localStorage.getItem(backupKey);
                if (backup) {
                    this.notes = JSON.parse(backup);
                    console.log('Restored notes from backup:', this.notes.length, 'notes');
                    // 重新保存到主存储
                    this.saveNotes();
                }
            } catch (backupError) {
                console.error('Error loading backup notes:', backupError);
            }
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
            const key = `list100-notes-${this.goalId}`;
            const notesData = JSON.stringify(this.notes);

            console.log('Saving notes with key:', key);
            console.log('Notes count:', this.notes.length);
            console.log('Notes data size:', notesData.length, 'characters');

            // 主要存储
            localStorage.setItem(key, notesData);
            console.log('Notes saved to main storage');

            // 验证保存
            const verification = localStorage.getItem(key);
            if (verification === notesData) {
                console.log('✓ Notes save verified successfully');
            } else {
                console.error('✗ Notes save verification failed!');
                throw new Error('Save verification failed');
            }

            // 备份存储
            localStorage.setItem(`list100-notes-backup-${this.goalId}`, notesData);

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
            this.showToast('Notes saved successfully', 'success');
        } catch (error) {
            console.error('Error saving notes:', error);
            this.showSaveError('Failed to save notes: ' + error.message);
            alert('Failed to save notes. Please check browser console for details.');
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

        // Add Link Button
        const attachLinkBtn = document.getElementById('attachLinkBtn');
        if (attachLinkBtn) {
            attachLinkBtn.addEventListener('click', () => {
                const url = prompt('Enter link URL:');
                if (url) {
                    if (!this.pendingLinks) this.pendingLinks = [];
                    this.pendingLinks.push({
                        url: url,
                        title: url // Can be enhanced to fetch title later
                    });
                    this.showToast('Link attached (will be saved with note)');
                }
            });
        }

        // Generate Review Button
        const generateReviewBtn = document.getElementById('generateReviewBtn');
        if (generateReviewBtn) {
            generateReviewBtn.addEventListener('click', () => {
                this.generateReview();
            });
        }

        // Milestone interactions
        const showAddMilestoneBtn = document.getElementById('showAddMilestoneBtn');
        if (showAddMilestoneBtn) {
            showAddMilestoneBtn.addEventListener('click', () => {
                document.getElementById('addMilestoneForm').classList.remove('hidden');
                document.getElementById('showAddMilestoneBtn').classList.add('hidden');
                document.getElementById('newMilestoneTitle').focus();
            });

            document.getElementById('cancelMilestoneBtn').addEventListener('click', () => {
                document.getElementById('addMilestoneForm').classList.add('hidden');
                document.getElementById('showAddMilestoneBtn').classList.remove('hidden');
                document.getElementById('newMilestoneTitle').value = '';
                document.getElementById('newMilestoneDate').value = '';
            });

            document.getElementById('saveMilestoneBtn').addEventListener('click', () => {
                this.addMilestone();
            });

            document.getElementById('newMilestoneTitle').addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.addMilestone();
                }
            });
        }

        // Habit interactions
        const showAddHabitBtn = document.getElementById('showAddHabitBtn');
        const addHabitForm = document.getElementById('addHabitForm');
        const cancelHabitBtn = document.getElementById('cancelHabitBtn');

        if (showAddHabitBtn && addHabitForm && cancelHabitBtn) {
            showAddHabitBtn.addEventListener('click', () => {
                showAddHabitBtn.classList.add('hidden');
                addHabitForm.classList.remove('hidden');
                document.getElementById('newHabitTitle').focus();
            });

            cancelHabitBtn.addEventListener('click', () => {
                addHabitForm.classList.add('hidden');
                showAddHabitBtn.classList.remove('hidden');
                document.getElementById('newHabitTitle').value = '';
            });

            document.getElementById('saveHabitBtn').addEventListener('click', () => {
                this.addHabit();
            });

            document.getElementById('newHabitTitle').addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.addHabit();
                }
            });
        }

        // Phase 6: Resource Modal
        const addResourceBtn = document.getElementById('addResourceBtn');
        const resourceModal = document.getElementById('resourceModal');
        if (addResourceBtn && resourceModal) {
            addResourceBtn.addEventListener('click', () => {
                this.openResourceModal();
            });

            document.getElementById('closeResourceModal').addEventListener('click', () => {
                resourceModal.classList.add('hidden');
            });

            // Tab switching
            document.querySelectorAll('.resource-tab').forEach(tab => {
                tab.addEventListener('click', (e) => {
                    document.querySelectorAll('.resource-tab').forEach(t => t.classList.remove('active'));
                    e.target.classList.add('active');
                    this.renderResourceResults(e.target.dataset.type);
                });
            });

            // Search (simple filter)
            document.getElementById('resourceSearchInput').addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                const activeType = document.querySelector('.resource-tab.active').dataset.type;
                this.renderResourceResults(activeType, query);
            });
        }
    }

    renderResources() {
        const list = document.getElementById('resourcesList');
        if (!list) return;

        const resources = this.goal.resources || [];

        if (resources.length === 0) {
            list.innerHTML = `
                <div class="empty-state-small">
                    <p>Link books or tours to this goal.</p>
                </div>
            `;
            return;
        }

        list.innerHTML = resources.map((r, index) => `
            <div class="resource-item">
                <div class="resource-icon">${r.type === 'book' ? '📖' : '✈️'}</div>
                <div class="resource-info">
                    <div class="resource-title">${this.escapeHtml(r.title)}</div>
                    <div class="resource-subtitle">${this.escapeHtml(r.author || r.location || '')}</div>
                </div>
                <button class="btn-icon-only" onclick="goalDetail.unlinkResource(${index})" title="Unlink">×</button>
            </div>
        `).join('');
    }

    openResourceModal() {
        document.getElementById('resourceModal').classList.remove('hidden');
        this.renderResourceResults('books'); // Default tab
    }

    renderResourceResults(type, query = '') {
        const resultsContainer = document.getElementById('resourceResults');
        const items = this.mockCollections[type] || [];

        const filtered = items.filter(item =>
            item.title.toLowerCase().includes(query) ||
            (item.author && item.author.toLowerCase().includes(query)) ||
            (item.location && item.location.toLowerCase().includes(query))
        );

        resultsContainer.innerHTML = filtered.map(item => `
            <div class="resource-result-item" onclick='goalDetail.linkResource(${JSON.stringify(item)})'>
                <div class="result-icon">${item.type === 'book' ? '📖' : '✈️'}</div>
                <div class="result-info">
                    <div class="result-title">${this.escapeHtml(item.title)}</div>
                    <div class="result-sub">${this.escapeHtml(item.author || item.location)}</div>
                </div>
                <div class="result-add">+ Link</div>
            </div>
        `).join('');
    }

    linkResource(item) {
        if (!this.goal.resources) this.goal.resources = [];

        // Check duplicate
        if (this.goal.resources.some(r => r.id === item.id)) {
            this.showToast('Resource already linked');
            return;
        }

        this.goal.resources.push(item);
        this.saveGoal();
        this.renderResources();
        document.getElementById('resourceModal').classList.add('hidden');
        this.showToast(`Linked "${item.title}"`);
    }

    unlinkResource(index) {
        if (!confirm('Unlink this resource?')) return;
        this.goal.resources.splice(index, 1);
        this.saveGoal();
        this.renderResources();
    }

    renderHabits() {
        const list = document.getElementById('habitsList');
        if (!list) return;

        const habits = this.goal.habits || [];

        if (habits.length === 0) {
            list.innerHTML = `
                <div class="empty-state-small" style="margin-top: 20px;">
                    <p>No habits yet. Set a recurring routine!</p>
                </div>
            `;
            return;
        }

        const today = new Date().toISOString().split('T')[0];

        list.innerHTML = habits.map((h, index) => {
            const isCheckedIn = h.history && h.history.includes(today);
            const streak = this.calculateStreak(h);

            return `
            <div class="habit-item" data-index="${index}">
                <div class="habit-content">
                    <span class="habit-title">${this.escapeHtml(h.title)}</span>
                    <span class="habit-meta">
                        ${h.frequency === 'daily' ? 'Daily' : 'Weekly'} • 
                        <span class="habit-streak">🔥 ${streak} day streak</span>
                    </span>
                </div>
                <div class="habit-actions">
                    <button class="habit-checkin-btn ${isCheckedIn ? 'checked' : ''}" 
                        onclick="goalDetail.toggleHabitCheckin(${index})">
                        ${isCheckedIn ? '✓ Done Today' : 'Check-in'}
                    </button>
                    <button class="btn-icon-only" onclick="goalDetail.deleteHabit(${index})" title="Delete">🗑️</button>
                </div>
            </div>
        `}).join('');
    }

    addHabit() {
        const titleInput = document.getElementById('newHabitTitle');
        const freqInput = document.getElementById('newHabitFrequency');
        const title = titleInput.value.trim();
        const freq = freqInput.value;

        if (!title) return;

        if (!this.goal.habits) this.goal.habits = [];

        this.goal.habits.push({
            id: Date.now(),
            title: title,
            frequency: freq,
            history: [],
            createdAt: new Date().toISOString()
        });

        // Clear inputs
        titleInput.value = '';
        document.getElementById('addHabitForm').classList.add('hidden');
        document.getElementById('showAddHabitBtn').classList.remove('hidden');

        this.saveGoal();
        this.renderHabits();
    }

    toggleHabitCheckin(index) {
        if (!this.goal.habits || !this.goal.habits[index]) return;

        const habit = this.goal.habits[index];
        const today = new Date().toISOString().split('T')[0];

        if (!habit.history) habit.history = [];

        if (habit.history.includes(today)) {
            // Uncheck
            habit.history = habit.history.filter(d => d !== today);
        } else {
            // Check-in
            habit.history.push(today);
            // Trigger confetti or something fun?
        }

        this.saveGoal();
        this.renderHabits();
    }

    deleteHabit(index) {
        if (!confirm('Delete this habit?')) return;

        this.goal.habits.splice(index, 1);
        this.saveGoal();
        this.renderHabits();
    }

    calculateStreak(habit) {
        if (!habit.history || habit.history.length === 0) return 0;

        // Simple streak logic: consecutive days ending today or yesterday
        const dates = [...habit.history].sort().reverse(); // Newest first
        const today = new Date().toISOString().split('T')[0];
        // const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        let streak = 0;
        let current = new Date();

        // Check if checked in today
        if (dates.includes(today)) {
            streak++;
            current.setDate(current.getDate() - 1);
        } else {
            // If not today, check yesterday (streak not broken yet)
            // But if checking for specific "current streak", maybe we only count consecutive past days?
            // Let's keep it simple: count backwards from today. If today not done, check if yesterday done.
            const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];
            if (dates.includes(yesterdayStr)) {
                current.setDate(current.getDate() - 1); // Start counting from yesterday
            } else {
                return 0;
            }
        }

        while (true) {
            const dateStr = current.toISOString().split('T')[0];
            if (dates.includes(dateStr)) {
                streak++;
                current.setDate(current.getDate() - 1);
            } else {
                // If we already counted today (in first block), we don't double count.
                // Actually my logic above `streak++` handled the start day.
                // Wait, if I started from yesterday, streak is already 0? No.
                // Let's refine strict loop.
                break;
            }
        }

        // Refined Logic:
        // 1. Get unique sorted dates
        // 2. Iterate backwards from today (or yesterday)
        const sortedUnique = [...new Set(habit.history)].sort();
        let currentStreak = 0;
        let checkDate = new Date();

        // Check today
        let checkStr = checkDate.toISOString().split('T')[0];
        if (sortedUnique.includes(checkStr)) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            // If today missing, check yesterday. If yesterday missing, streak 0.
            checkDate.setDate(checkDate.getDate() - 1);
            checkStr = checkDate.toISOString().split('T')[0];
            if (!sortedUnique.includes(checkStr)) {
                return 0;
            }
        }

        // Loop backwards
        while (true) {
            checkStr = checkDate.toISOString().split('T')[0];
            if (sortedUnique.includes(checkStr)) {
                currentStreak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                break;
            }
        }

        return currentStreak;
    }

    generateReview() {
        const today = new Date();
        const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        // 1. Calculate Milestones completed in last 7 days
        // We don't track *when* a milestone was completed explicitly in the current simple model unless we checked 'completedAt' on milestone but we only have 'completed' boolean and maybe we didn't store date.
        // Wait, looking at addMilestone, we track 'createdAt'. checking toggleMilestone...
        // We need to update toggleMilestone to save 'completedAt'.
        // For now, let's just count total completed / total.
        const milestones = this.goal.milestones || [];
        const completedMilestones = milestones.filter(m => m.completed).length;
        const totalMilestones = milestones.length;

        // 2. Calculate Habit consistency (last 7 days)
        const habits = this.goal.habits || [];
        let habitSummary = '';
        if (habits.length > 0) {
            habitSummary = '\n**Habits Check-in (Last 7 Days):**\n';
            habits.forEach(h => {
                // Count check-ins in last 7 days
                let count = 0;
                for (let i = 0; i < 7; i++) {
                    const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
                    const dStr = d.toISOString().split('T')[0];
                    if (h.history && h.history.includes(dStr)) count++;
                }
                habitSummary += `- ${h.title}: ${count}/7 days\n`;
            });
        }

        // 3. Construct Template
        const template = `# ⚡️ Weekly Review (${today.toLocaleDateString()})

**Progress Update:**
- Milestones: ${completedMilestones}/${totalMilestones} completed
${habitSummary}
**Reflection:**
1. What went well this week?
- 

2. What obstacles did I face?
- 

3. Focus for next week:
- 
`;

        const noteInput = document.getElementById('noteInput');
        noteInput.value = template;
        noteInput.style.height = '300px'; // Expand for writing
        noteInput.focus();

        this.showToast('Review template generated!');
    }

    render() {
        console.log('render() called');
        console.log('Goal:', this.goal);
        console.log('Notes count:', this.notes.length);

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
        console.log('About to call renderNotes()...');
        this.populateMilestoneSelect();
        this.populateMilestoneSelect();
        this.renderNotes();
        this.renderMilestones();
        this.renderHabits();
        this.renderResources();

        // 更新统计
        this.updateStats();

        console.log('render() completed');
    }

    populateMilestoneSelect() {
        const select = document.getElementById('noteMilestoneSelect');
        if (!select) return;

        // Save current selection if any
        const currentVal = select.value;

        // Clear existing options except first
        while (select.options.length > 1) {
            select.remove(1);
        }

        if (this.goal.milestones && this.goal.milestones.length > 0) {
            this.goal.milestones.forEach((m, index) => {
                const option = document.createElement('option');
                option.value = m.id;
                option.textContent = `Milestone: ${m.title} (${m.completed ? 'Done' : 'Pending'})`;
                select.appendChild(option);
            });
        }

        // Restore selection if still valid
        if (currentVal) {
            const exists = Array.from(select.options).some(o => o.value === currentVal);
            if (exists) select.value = currentVal;
        }
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

        // 这些元素在当前 HTML 中不存在，添加空值检查
        if (statusIndicator) {
            if (this.goal.completed) {
                statusIndicator.classList.add('completed');
            } else {
                statusIndicator.classList.remove('completed');
            }
        }

        if (statusText) {
            statusText.textContent = this.goal.completed ? 'Completed' : 'In Progress';
        }

        if (completeToggle) {
            const toggleText = completeToggle.querySelector('.toggle-text');
            if (this.goal.completed) {
                completeToggle.classList.add('completed');
                if (toggleText) toggleText.textContent = 'Mark Incomplete';
            } else {
                completeToggle.classList.remove('completed');
                if (toggleText) toggleText.textContent = 'Mark Complete';
            }
        }
    }

    updateDates() {
        const createdDate = document.getElementById('createdDate');
        const completionDateSection = document.getElementById('completionDateSection');
        const completionDateInput = document.getElementById('completionDateInput');

        if (createdDate && this.goal.createdAt) {
            const date = new Date(this.goal.createdAt);
            createdDate.textContent = `Created on ${date.toLocaleDateString()}`;
        }

        if (completionDateSection && completionDateInput) {
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
    }

    renderTags() {
        const tagsDisplay = document.getElementById('tagsDisplay');

        if (!tagsDisplay) {
            console.warn('tagsDisplay element not found');
            return;
        }

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
        console.log('renderNotes() called');
        console.log('Notes to render:', this.notes.length);
        console.log('Notes data:', this.notes);

        const notesList = document.getElementById('notesList');

        if (!notesList) {
            console.error('notesList element not found!');
            return;
        }

        if (this.notes.length === 0) {
            console.log('No notes to display');
            notesList.innerHTML = '<p style="color: var(--color-text-muted); font-size: 14px; text-align: center; padding: 20px;">No notes yet. Add your first note below.</p>';
            return;
        }

        console.log('Rendering', this.notes.length, 'notes...');

        notesList.innerHTML = this.notes.map((note, index) => {
            const photosHtml = note.photos && note.photos.length > 0
                ? `<div class="note-photos">${note.photos.map(photo =>
                    `<div class="note-photo" onclick="goalDetail.openPhotoModal('${photo}')">
                        <img src="${photo}" alt="Note photo">
                    </div>`
                ).join('')}</div>`
                : '';

            const linksHtml = note.links && note.links.length > 0
                ? note.links.map(link => `
                    <a href="${link.url}" target="_blank" class="note-link-attachment">
                        <span class="note-link-icon">🔗</span>
                        ${this.escapeHtml(link.title || link.url)}
                    </a>
                `).join('')
                : '';

            const milestoneBadge = note.milestoneId
                ? (() => {
                    const m = this.goal.milestones?.find(ms => ms.id.toString() === note.milestoneId.toString());
                    return m ? `<div class="note-milestone-badge">🎯 ${this.escapeHtml(m.title)}</div>` : '';
                })()
                : '';

            const isReview = note.content.startsWith('# ⚡️');

            return `
                <div class="note-item ${isReview ? 'review-note' : ''}" data-index="${index}">
                    ${milestoneBadge}
                    <div class="note-content">${this.escapeHtml(note.content)}</div>
                    ${photosHtml}
                    ${linksHtml}
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
        const milestoneSelect = document.getElementById('noteMilestoneSelect');
        const content = noteInput.value.trim();
        const milestoneId = milestoneSelect ? milestoneSelect.value : null;

        console.log('addNote() called');

        // Check for pending links (simple implementation: prompt on button click, but ideally stored in a pending array)
        // For this version we will assume links are added via prompt immediately to the note? 
        // Or we need a pendingLinks array similar to pendingAttachments.
        // Let's implement pendingLinks quickly.

        if (!content && this.pendingAttachments.length === 0 && (!this.pendingLinks || this.pendingLinks.length === 0)) {
            return;
        }

        const note = {
            id: Date.now(),
            content: content,
            milestoneId: milestoneId,
            links: this.pendingLinks || [],
            photos: [...this.pendingAttachments],
            createdAt: new Date().toISOString()
        };

        console.log('Created note:', note);
        console.log('Current notes count before add:', this.notes.length);

        this.notes.unshift(note);

        console.log('Current notes count after add:', this.notes.length);
        console.log('Calling saveNotes()...');

        this.saveNotes();

        console.log('Calling renderNotes()...');
        this.renderNotes();

        console.log('Updating stats...');
        this.updateStats();

        noteInput.value = '';
        if (milestoneSelect) milestoneSelect.value = '';
        this.pendingLinks = [];
        this.pendingAttachments = [];
        this.renderAttachmentPreviews();

        console.log('addNote() completed');
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

        const daysActiveEl = document.getElementById('daysActive');
        const notesCountEl = document.getElementById('notesCount');
        const lastUpdatedEl = document.getElementById('lastUpdated');

        if (daysActiveEl) daysActiveEl.textContent = daysActive;
        if (notesCountEl) notesCountEl.textContent = this.notes.length;

        // 最后更新时间
        const lastUpdated = this.getLastUpdatedTime();
        if (lastUpdatedEl) lastUpdatedEl.textContent = lastUpdated;
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
            const timestamp = new Date().toISOString();
            const dataWithMeta = {
                version: '1.0',
                items: items,
                lastUpdated: timestamp
            };
            const metaDataString = JSON.stringify(dataWithMeta);

            // 轮换备份：先将当前数据移到 backup-prev，再保存新数据
            const currentBackup = localStorage.getItem('list100-backup-current');
            if (currentBackup) {
                localStorage.setItem('list100-backup-prev', currentBackup);
            }
            localStorage.setItem('list100-backup-current', metaDataString);

            // 保存时间戳
            localStorage.setItem('list100-last-save', timestamp);

            // 每10次保存创建一个历史备份
            const saveCount = parseInt(localStorage.getItem('list100-save-count') || '0') + 1;
            localStorage.setItem('list100-save-count', saveCount.toString());

            if (saveCount % 10 === 0) {
                localStorage.setItem(`list100-history-${saveCount}`, JSON.stringify({
                    version: '1.0',
                    items: items,
                    timestamp: timestamp,
                    count: items.length
                }));
                // 清理旧的历史备份
                this.cleanupList100HistoryBackups();
            }
        } catch (error) {
            console.error('Error creating backups:', error);
        }
    }

    cleanupList100HistoryBackups(maxBackups = 10) {
        try {
            const historyKeys = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('list100-history-')) {
                    const num = parseInt(key.replace('list100-history-', ''));
                    if (!isNaN(num)) {
                        historyKeys.push({ key, num });
                    }
                }
            }

            if (historyKeys.length > maxBackups) {
                historyKeys.sort((a, b) => a.num - b.num);
                const toDelete = historyKeys.slice(0, historyKeys.length - maxBackups);
                toDelete.forEach(({ key }) => {
                    localStorage.removeItem(key);
                    console.log(`Cleaned up old backup: ${key}`);
                });
            }
        } catch (error) {
            console.error('Error cleaning up list100 history backups:', error);
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

        // 添加调试面板
        const debugPanel = document.createElement('div');
        debugPanel.id = 'debugPanel';
        debugPanel.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.85);
            color: #00ff00;
            padding: 12px;
            border-radius: 6px;
            font-size: 11px;
            font-family: monospace;
            z-index: 1000;
            max-width: 300px;
            max-height: 200px;
            overflow-y: auto;
            line-height: 1.4;
        `;
        debugPanel.innerHTML = `
            <div style="color: #fff; font-weight: bold; margin-bottom: 8px;">Debug Info</div>
            <div id="debugInfo">Initializing...</div>
        `;
        document.body.appendChild(debugPanel);

        // 定期更新调试信息
        setInterval(() => {
            this.updateDebugInfo();
        }, 1000);
    }

    updateDebugInfo() {
        const debugInfo = document.getElementById('debugInfo');
        if (!debugInfo) return;

        try {
            const key = `list100-notes-${this.goalId}`;
            const stored = localStorage.getItem(key);
            const storedNotes = stored ? JSON.parse(stored) : [];

            debugInfo.innerHTML = `
                Goal ID: ${this.goalId}<br>
                Memory Notes: ${this.notes.length}<br>
                Stored Notes: ${storedNotes.length}<br>
                Storage Key: ${key}<br>
                Last Save: ${this.lastSaveTime ? this.lastSaveTime.toLocaleTimeString() : 'Never'}<br>
                <span style="color: ${this.notes.length === storedNotes.length ? '#00ff00' : '#ff0000'}">
                    Status: ${this.notes.length === storedNotes.length ? '✓ Synced' : '✗ Out of Sync'}
                </span>
            `;
        } catch (error) {
            debugInfo.innerHTML = `<span style="color: #ff0000;">Error: ${error.message}</span>`;
        }
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
            const dataBlob = new Blob([dataStr], { type: 'application/json' });

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
            titleElement.value = this.goal.text || '';
        }

        if (descriptionElement) {
            descriptionElement.value = this.goal.description || '';
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



    initTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetTab = e.target.dataset.tab;

                // Update buttons
                tabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');

                // Update panes
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('active');
                    if (pane.id === `tab-${targetTab}`) {
                        pane.classList.add('active');
                    }
                });
            });
        });
    }

    renderMilestones() {
        const list = document.getElementById('milestonesList');
        const progressFill = document.getElementById('milestoneProgress');
        const progressText = document.getElementById('progressText');
        const countSpan = document.getElementById('milestoneCount');

        if (!list) return;

        const milestones = this.goal.milestones || [];
        const total = milestones.length;
        const completed = milestones.filter(m => m.completed).length;
        const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

        // Update stats
        if (progressFill) progressFill.style.width = `${percent}%`;
        if (progressText) progressText.textContent = `${percent}%`;
        if (countSpan) countSpan.textContent = `${completed}/${total}`;

        if (total === 0) {
            list.innerHTML = `
                <div class="empty-state-small">
                    <p>No milestones yet. Break your goal down into smaller steps!</p>
                </div>
            `;
            return;
        }

        list.innerHTML = milestones.map((m, index) => `
            <div class="milestone-item ${m.completed ? 'completed' : ''}" data-index="${index}">
                <div class="milestone-checkbox ${m.completed ? 'checked' : ''}" 
                     onclick="goalDetail.toggleMilestone(${index})">
                    ${m.completed ? '✓' : ''}
                </div>
                <div class="milestone-content">
                    <span class="milestone-title">${this.escapeHtml(m.title)}</span>
                    ${m.dueDate ? `<span class="milestone-meta">Due: ${new Date(m.dueDate).toLocaleDateString()}</span>` : ''}
                </div>
                <div class="milestone-actions">
                    <button class="btn-icon-only" onclick="goalDetail.deleteMilestone(${index})" title="Delete">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    addMilestone() {
        const titleInput = document.getElementById('newMilestoneTitle');
        const dateInput = document.getElementById('newMilestoneDate');
        const title = titleInput.value.trim();
        const date = dateInput.value;

        if (!title) return;

        if (!this.goal.milestones) this.goal.milestones = [];

        this.goal.milestones.push({
            id: Date.now(),
            title: title,
            dueDate: date || null,
            completed: false,
            createdAt: new Date().toISOString()
        });

        // Clear inputs
        titleInput.value = '';
        dateInput.value = '';
        document.getElementById('addMilestoneForm').classList.add('hidden');
        document.getElementById('showAddMilestoneBtn').classList.remove('hidden');

        this.saveGoal();
        this.renderMilestones();
    }

    toggleMilestone(index) {
        if (!this.goal.milestones || !this.goal.milestones[index]) return;

        this.goal.milestones[index].completed = !this.goal.milestones[index].completed;

        // Check if all milestones completed, maybe offer to complete goal?
        // keeping it simple for now

        this.saveGoal();
        this.renderMilestones();
    }

    deleteMilestone(index) {
        if (!confirm('Delete this milestone?')) return;

        this.goal.milestones.splice(index, 1);
        this.saveGoal();
        this.renderMilestones();
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