// DG 120 Page JavaScript

// DG 120专辑数据 - 完整的121张CD
const dg120Albums = [];

// 添加前5张重要的历史录音
const historicAlbums = [
    {
        discNumber: 1,
        category: "Orchestral",
        title: "Nikisch conducts Beethoven's 5th",
        mainArtists: ["Arthur Nikisch", "Berliner Philharmoniker"],
        recordingPeriod: "1913",
        description: "收录了音乐史上第一个重要的里程碑：亚瑟·尼基什指挥柏林爱乐乐团演绎的贝多芬第五交响曲。这是世界上首次对一部交响乐的完整录音，标志着录音技术从记录片段转向了完整呈现艺术作品。"
    },
    {
        discNumber: 2,
        category: "Orchestral", 
        title: "Strauss conducts his Alpine Symphony",
        mainArtists: ["Richard Strauss", "Orchester der Staatsoper Berlin"],
        recordingPeriod: "1924-1928",
        description: "作曲家理查·施特劳斯亲自指挥自己作品的珍贵历史录音。这张专辑的核心是他的《阿尔卑斯交响曲》选段，以及《唐璜》和《玫瑰骑士》组曲。"
    },
    {
        discNumber: 3,
        category: "Orchestral",
        title: "Pfitzner & Walter conduct German Romanticism", 
        mainArtists: ["Hans Pfitzner", "Bruno Walter"],
        recordingPeriod: "1928-1935",
        description: "汇集了两位德奥指挥巨匠的早期录音。汉斯·普菲茨纳指挥的贝多芬和门德尔松展现了深厚的德国传统；而布鲁诺·瓦尔特棒下的莫扎特则以其温暖的人性光辉和歌唱性著称。"
    },
    {
        discNumber: 4,
        category: "Orchestral",
        title: "Karajan's Early Recordings",
        mainArtists: ["Herbert von Karajan", "Orchestra del Maggio Musicale Fiorentino"],
        recordingPeriod: "1938-1943", 
        description: "展示了指挥皇帝卡拉扬在DG的首次亮相。这些在二战期间录制的莫扎特、柴可夫斯基等作品，已经显露出他日后对音响平衡、线条流畅的极致追求。"
    },
    {
        discNumber: 5,
        category: "Orchestral",
        title: "Furtwängler conducts Beethoven",
        mainArtists: ["Wilhelm Furtwängler", "Berliner Philharmoniker"],
        recordingPeriod: "1947-1954",
        description: "富特文格勒指挥柏林爱乐乐团演绎贝多芬交响曲的传奇录音。他的指挥风格深刻而富有哲理，将贝多芬音乐的精神内核展现得淋漓尽致。"
    }
];

dg120Albums.push(...historicAlbums);

// 生成剩余的116张专辑数据 (CD 6-121)
const categories = ["Orchestral", "Piano", "Violin", "Chamber", "Opera", "Oratorio & Sacred", "Lied", "Archiv Produktion", "Avant-garde", "Neoclassical", "Spoken Word"];

for (let i = 6; i <= 121; i++) {
    const category = categories[(i - 6) % categories.length];
    
    let title, artists, period, description;
    
    if (i === 121) {
        // 最后一张特殊处理 - Bonus CD
        title = "DG 120 - A Journey through Time";
        artists = ["Various Artists"];
        period = "1903-2018";
        description = "这张作为结尾的Bonus CD，如同一部声音的蒙太奇，将DG 120年历史中不同时期、不同风格的录音片段巧妙地编织在一起。从最早的男高音咏叹调，到卡拉扬的立体声，再到当代艺术家的最新录音，它带领听众进行了一场穿越时空的声音之旅。";
    } else {
        title = `Classic Recording ${i}`;
        artists = ["Various Artists"];
        period = "1950-2000";
        description = `DG历史上的重要录音作品第${i}号，展现了古典音乐的丰富多样性和艺术价值。这些录音代表了各个时期DG在${category}领域的杰出成就。`;
    }
    
    dg120Albums.push({
        discNumber: i,
        category: i === 121 ? "Bonus CD" : category,
        title: title,
        mainArtists: artists,
        recordingPeriod: period,
        description: description
    });
}

// 验证专辑总数
console.log(`Total albums: ${dg120Albums.length}`);

// 全局变量
let filteredAlbums = [...dg120Albums];
let listenedAlbums = JSON.parse(localStorage.getItem('dg120ListenedAlbums')) || [];
let currentAlbum = null;

// DOM元素
const albumsList = document.getElementById('albumsList');
const categoryFilter = document.getElementById('categoryFilter');
const periodFilter = document.getElementById('periodFilter');
const statusFilter = document.getElementById('statusFilter');
const clearFiltersBtn = document.getElementById('clearFilters');
const resultsCount = document.getElementById('resultsCount');
const listenedCount = document.getElementById('listenedCount');
const listenedPercentage = document.getElementById('listenedPercentage');
const listenedAlbumsCount = document.getElementById('listenedAlbumsCount');
const listenedAlbumsList = document.getElementById('listenedAlbumsList');
const totalAlbums = document.getElementById('totalAlbums');
const totalDiscs = document.getElementById('totalDiscs');

// 模态框元素
const albumModal = document.getElementById('albumModal');
const closeModal = document.getElementById('closeModal');
const albumTitle = document.getElementById('albumTitle');
const albumDiscNumber = document.getElementById('albumDiscNumber');
const albumCategory = document.getElementById('albumCategory');
const albumArtists = document.getElementById('albumArtists');
const albumPeriod = document.getElementById('albumPeriod');
const albumStatus = document.getElementById('albumStatus');
const albumDescriptionText = document.getElementById('albumDescriptionText');
const listenInfo = document.getElementById('listenInfo');
const listenDate = document.getElementById('listenDate');
const personalRating = document.getElementById('personalRating');
const listenNotes = document.getElementById('listenNotes');
const markListenedBtn = document.getElementById('markListenedBtn');
const removeAlbumBtn = document.getElementById('removeAlbumBtn');

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    renderAlbums();
    updateStats();
    updateListenedAlbumsList();
    
    // 事件监听器
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (periodFilter) periodFilter.addEventListener('change', applyFilters);
    if (statusFilter) statusFilter.addEventListener('change', applyFilters);
    if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', clearFilters);
    
    if (closeModal) closeModal.addEventListener('click', hideModal);
    if (albumModal) {
        albumModal.addEventListener('click', function(e) {
            if (e.target === albumModal) {
                hideModal();
            }
        });
    }
    
    if (markListenedBtn) markListenedBtn.addEventListener('click', toggleListenedStatus);
    if (removeAlbumBtn) removeAlbumBtn.addEventListener('click', removeFromListened);
    
    // 快速操作按钮
    const importDataBtn = document.getElementById('importDataBtn');
    const importFileInput = document.getElementById('importFileInput');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const exportDataBtn = document.getElementById('exportDataBtn');
    
    if (importDataBtn && importFileInput) {
        importDataBtn.addEventListener('click', function() {
            importFileInput.click();
        });
        importFileInput.addEventListener('change', importData);
    }
    
    if (clearAllBtn) clearAllBtn.addEventListener('click', clearAllData);
    if (exportDataBtn) exportDataBtn.addEventListener('click', exportData);
});// 核心
功能函数

// 渲染专辑列表
function renderAlbums() {
    if (!albumsList) return;
    
    albumsList.innerHTML = '';
    
    filteredAlbums.forEach(album => {
        const isListened = listenedAlbums.some(listened => listened.discNumber === album.discNumber);
        
        const albumElement = document.createElement('div');
        albumElement.className = `album-item ${isListened ? 'listened' : ''}`;
        albumElement.onclick = () => showAlbumModal(album);
        
        const descriptionPreview = album.description.length > 100 
            ? album.description.substring(0, 100) + '...' 
            : album.description;
        
        albumElement.innerHTML = `
            <div class="album-disc-number">CD ${album.discNumber}</div>
            <div class="album-content">
                <div class="album-title">${album.title}</div>
                <div class="album-artists">${album.mainArtists.join(', ')}</div>
                <div class="album-meta">
                    <span class="album-category">${album.category}</span>
                    <span class="album-period">${album.recordingPeriod}</span>
                </div>
                <div class="album-description-preview">${descriptionPreview}</div>
            </div>
        `;
        
        albumsList.appendChild(albumElement);
    });
    
    if (resultsCount) {
        resultsCount.textContent = `${filteredAlbums.length} 张专辑`;
    }
}

// 应用筛选器
function applyFilters() {
    const categoryValue = categoryFilter ? categoryFilter.value : '';
    const periodValue = periodFilter ? periodFilter.value : '';
    const statusValue = statusFilter ? statusFilter.value : '';
    
    filteredAlbums = dg120Albums.filter(album => {
        const categoryMatch = !categoryValue || album.category === categoryValue;
        
        let periodMatch = true;
        if (periodValue) {
            const period = album.recordingPeriod;
            switch (periodValue) {
                case '1900s-1920s':
                    periodMatch = period.includes('190') || period.includes('191') || period.includes('192');
                    break;
                case '1930s-1940s':
                    periodMatch = period.includes('193') || period.includes('194');
                    break;
                case '1950s-1960s':
                    periodMatch = period.includes('195') || period.includes('196');
                    break;
                case '1970s-1980s':
                    periodMatch = period.includes('197') || period.includes('198');
                    break;
                case '1990s-2000s':
                    periodMatch = period.includes('199') || period.includes('200');
                    break;
                case '2010s-2020s':
                    periodMatch = period.includes('201') || period.includes('202');
                    break;
            }
        }
        
        let statusMatch = true;
        if (statusValue) {
            const isListened = listenedAlbums.some(listened => listened.discNumber === album.discNumber);
            statusMatch = (statusValue === 'listened' && isListened) || 
                         (statusValue === 'unlistened' && !isListened);
        }
        
        return categoryMatch && periodMatch && statusMatch;
    });
    
    renderAlbums();
}

// 清除筛选器
function clearFilters() {
    if (categoryFilter) categoryFilter.value = '';
    if (periodFilter) periodFilter.value = '';
    if (statusFilter) statusFilter.value = '';
    filteredAlbums = [...dg120Albums];
    renderAlbums();
}// 模态框和数据
管理功能

// 显示专辑模态框
function showAlbumModal(album) {
    if (!albumModal) return;
    
    currentAlbum = album;
    const isListened = listenedAlbums.some(listened => listened.discNumber === album.discNumber);
    const listenedData = listenedAlbums.find(listened => listened.discNumber === album.discNumber);
    
    if (albumTitle) albumTitle.textContent = album.title;
    if (albumDiscNumber) albumDiscNumber.textContent = `CD ${album.discNumber}`;
    if (albumCategory) albumCategory.textContent = album.category;
    if (albumArtists) albumArtists.textContent = album.mainArtists.join(', ');
    if (albumPeriod) albumPeriod.textContent = album.recordingPeriod;
    if (albumStatus) albumStatus.textContent = isListened ? '已聆听' : '未聆听';
    if (albumDescriptionText) albumDescriptionText.textContent = album.description;
    
    if (isListened && listenedData) {
        if (listenInfo) listenInfo.style.display = 'block';
        if (listenDate) listenDate.value = listenedData.listenDate || '';
        if (personalRating) personalRating.value = listenedData.rating || '';
        if (listenNotes) listenNotes.value = listenedData.notes || '';
        if (markListenedBtn) markListenedBtn.textContent = '更新聆听信息';
        if (removeAlbumBtn) removeAlbumBtn.style.display = 'inline-block';
    } else {
        if (listenInfo) listenInfo.style.display = 'none';
        if (listenDate) listenDate.value = '';
        if (personalRating) personalRating.value = '';
        if (listenNotes) listenNotes.value = '';
        if (markListenedBtn) markListenedBtn.textContent = '标记为已聆听';
        if (removeAlbumBtn) removeAlbumBtn.style.display = 'none';
    }
    
    albumModal.classList.remove('hidden');
}

// 隐藏模态框
function hideModal() {
    if (albumModal) {
        albumModal.classList.add('hidden');
    }
    currentAlbum = null;
}

// 切换聆听状态
function toggleListenedStatus() {
    if (!currentAlbum) return;
    
    const existingIndex = listenedAlbums.findIndex(listened => listened.discNumber === currentAlbum.discNumber);
    
    if (existingIndex >= 0) {
        // 更新现有记录
        listenedAlbums[existingIndex] = {
            ...listenedAlbums[existingIndex],
            listenDate: listenDate ? listenDate.value : '',
            rating: personalRating && personalRating.value ? parseFloat(personalRating.value) : null,
            notes: listenNotes ? listenNotes.value : ''
        };
    } else {
        // 添加新记录
        const newListenedAlbum = {
            discNumber: currentAlbum.discNumber,
            title: currentAlbum.title,
            artists: currentAlbum.mainArtists.join(', '),
            listenDate: (listenDate && listenDate.value) || new Date().toISOString().split('T')[0],
            rating: personalRating && personalRating.value ? parseFloat(personalRating.value) : null,
            notes: listenNotes ? listenNotes.value : ''
        };
        
        listenedAlbums.push(newListenedAlbum);
        if (listenInfo) listenInfo.style.display = 'block';
        if (markListenedBtn) markListenedBtn.textContent = '更新聆听信息';
        if (removeAlbumBtn) removeAlbumBtn.style.display = 'inline-block';
    }
    
    localStorage.setItem('dg120ListenedAlbums', JSON.stringify(listenedAlbums));
    updateStats();
    updateListenedAlbumsList();
    renderAlbums();
    
    // 更新模态框状态显示
    if (albumStatus) albumStatus.textContent = '已聆听';
}

// 从已聆听列表中移除
function removeFromListened() {
    if (!currentAlbum) return;
    
    listenedAlbums = listenedAlbums.filter(listened => listened.discNumber !== currentAlbum.discNumber);
    localStorage.setItem('dg120ListenedAlbums', JSON.stringify(listenedAlbums));
    
    updateStats();
    updateListenedAlbumsList();
    renderAlbums();
    hideModal();
}// 
统计和数据管理功能

// 更新统计信息
function updateStats() {
    const totalCount = dg120Albums.length;
    const listenedCount_value = listenedAlbums.length;
    const percentage = totalCount > 0 ? Math.round((listenedCount_value / totalCount) * 100) : 0;
    
    if (listenedCount) listenedCount.textContent = listenedCount_value;
    if (listenedPercentage) listenedPercentage.textContent = `${percentage}%`;
    if (listenedAlbumsCount) listenedAlbumsCount.textContent = listenedCount_value;
    if (totalAlbums) totalAlbums.textContent = totalCount;
    if (totalDiscs) totalDiscs.textContent = totalCount;
}

// 更新已聆听专辑列表
function updateListenedAlbumsList() {
    if (!listenedAlbumsList) return;
    
    if (listenedAlbums.length === 0) {
        listenedAlbumsList.innerHTML = `
            <div class="empty-state">
                <p>暂无已聆听专辑</p>
                <small>点击专辑标记为已聆听</small>
            </div>
        `;
        return;
    }
    
    // 按聆听日期排序（最新的在前）
    const sortedListened = [...listenedAlbums].sort((a, b) => {
        const dateA = new Date(a.listenDate || '1900-01-01');
        const dateB = new Date(b.listenDate || '1900-01-01');
        return dateB - dateA;
    });
    
    listenedAlbumsList.innerHTML = sortedListened.map(album => `
        <div class="listened-album-item" onclick="showAlbumModalByDiscNumber(${album.discNumber})">
            <div class="listened-album-name">
                <span class="listened-album-disc">CD ${album.discNumber}</span>
                <span class="listened-album-title">${album.title}</span>
            </div>
            <span class="listened-album-date">${album.listenDate || '-'}</span>
        </div>
    `).join('');
}

// 通过CD编号显示专辑模态框
function showAlbumModalByDiscNumber(discNumber) {
    const album = dg120Albums.find(a => a.discNumber === discNumber);
    if (album) {
        showAlbumModal(album);
    }
}

// 数据导入导出功能
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (Array.isArray(data)) {
                listenedAlbums = data;
                localStorage.setItem('dg120ListenedAlbums', JSON.stringify(listenedAlbums));
                updateStats();
                updateListenedAlbumsList();
                renderAlbums();
                alert('数据导入成功！');
            } else {
                alert('无效的数据格式！');
            }
        } catch (error) {
            alert('文件解析失败！');
        }
    };
    reader.readAsText(file);
    
    // 清除文件输入
    event.target.value = '';
}

function clearAllData() {
    if (confirm('确定要清除所有聆听记录吗？此操作不可撤销。')) {
        listenedAlbums = [];
        localStorage.removeItem('dg120ListenedAlbums');
        updateStats();
        updateListenedAlbumsList();
        renderAlbums();
        hideModal();
        alert('所有数据已清除！');
    }
}

function exportData() {
    const dataStr = JSON.stringify(listenedAlbums, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `dg120-listened-albums-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
}

// 键盘事件处理
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && albumModal && !albumModal.classList.contains('hidden')) {
        hideModal();
    }
});