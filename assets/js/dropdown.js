// 下拉菜单交互功能
class DropdownManager {
    constructor() {
        this.dropdowns = [];
        this.init();
    }

    init() {
        // 获取所有下拉菜单
        this.dropdowns = document.querySelectorAll('.dropdown');
        
        // 为每个下拉菜单添加事件监听器
        this.dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (toggle && menu) {
                // 点击切换按钮
                toggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleDropdown(dropdown);
                });
                
                // 点击菜单项
                menu.addEventListener('click', (e) => {
                    if (e.target.classList.contains('dropdown-item')) {
                        this.closeAllDropdowns();
                    }
                });
            }
        });
        
        // 点击页面其他区域关闭所有下拉菜单
        document.addEventListener('click', () => {
            this.closeAllDropdowns();
        });
        
        // 键盘导航支持
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllDropdowns();
            }
        });
    }
    
    toggleDropdown(dropdown) {
        const isActive = dropdown.classList.contains('active');
        
        // 先关闭所有下拉菜单
        this.closeAllDropdowns();
        
        // 如果当前不是激活状态，则打开
        if (!isActive) {
            dropdown.classList.add('active');
            
            // 设置焦点到第一个菜单项
            const firstItem = dropdown.querySelector('.dropdown-item');
            if (firstItem) {
                firstItem.focus();
            }
        }
    }
    
    closeAllDropdowns() {
        this.dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    // 设置当前页面的下拉菜单状态
    setActivePage() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        this.dropdowns.forEach(dropdown => {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
                const items = menu.querySelectorAll('.dropdown-item');
                let hasActiveItem = false;
                
                items.forEach(item => {
                    const href = item.getAttribute('href');
                    if (href === currentPath || 
                        (currentPath === 'index.html' && href === 'landing.html') ||
                        (currentPath === '' && href === 'landing.html')) {
                        item.classList.add('active');
                        dropdown.querySelector('.dropdown-toggle').classList.add('active');
                        hasActiveItem = true;
                    } else {
                        item.classList.remove('active');
                    }
                });
                
                // 如果没有活跃的菜单项，确保切换按钮也不活跃
                if (!hasActiveItem) {
                    dropdown.querySelector('.dropdown-toggle').classList.remove('active');
                }
            }
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    const dropdownManager = new DropdownManager();
    dropdownManager.setActivePage();
});

// 移动端响应式处理
function handleMobileDropdowns() {
    const isMobile = window.innerWidth <= 768;
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        if (isMobile) {
            // 移动端：点击切换按钮直接跳转到第一个菜单项
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const firstItem = dropdown.querySelector('.dropdown-item');
            
            if (toggle && firstItem) {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.href = firstItem.getAttribute('href');
                });
            }
        }
    });
}

// 窗口大小变化时重新处理
document.addEventListener('DOMContentLoaded', () => {
    handleMobileDropdowns();
    window.addEventListener('resize', handleMobileDropdowns);
});