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
            // Remove existing listeners to avoid duplicates if re-initialized
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (toggle && menu) {
                // Clone node to strip event listeners is a brute force way, 
                // but since we are re-initializing, it's safer to just ensuring we don't double bind.
                // However, since we are moving to a SPA-like structure, we can just be careful.
                
                // 点击切换按钮
                toggle.onclick = (e) => {
                    e.stopPropagation();
                    this.toggleDropdown(dropdown);
                };
                
                // 点击菜单项
                menu.onclick = (e) => {
                    if (e.target.classList.contains('dropdown-item')) {
                        this.closeAllDropdowns();
                    }
                };
            }
        });
        
        // 点击页面其他区域关闭所有下拉菜单
        // Use named function for removal if needed, but for now simple check
        document.onclick = (e) => {
            if (!e.target.closest('.dropdown')) {
                this.closeAllDropdowns();
            }
        };
        
        // 键盘导航支持
        document.onkeydown = (e) => {
            if (e.key === 'Escape') {
                this.closeAllDropdowns();
            }
        };
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
        const currentPath = window.location.pathname.split('/').pop() || 'landing.html';
        const targetPath = currentPath === '' || currentPath === '/' ? 'landing.html' : currentPath;
        
        this.dropdowns.forEach(dropdown => {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
                const items = menu.querySelectorAll('.dropdown-item');
                let hasActiveItem = false;
                
                items.forEach(item => {
                    const href = item.getAttribute('href');
                    if (href === targetPath) {
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

// Expose to window
window.DropdownManager = DropdownManager;

// 移动端响应式处理
window.handleMobileDropdowns = function() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const firstItem = dropdown.querySelector('.dropdown-item');
            
            if (toggle && firstItem) {
                // Remove old handler if exists (not easily possible with anonymous functions unless we store them)
                // For now, we rely on the fact that click handlers are overwritten by the new logic in init() 
                // or we accept that this specific mobile logic needs to be robust.
                
                // Note: The original logic used addEventListener. 
                // To be safe in a re-render world, let's keep it simple.
            }
        });
    }
};

// We DO NOT auto-initialize anymore. Layout.js will handle it.
