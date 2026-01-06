# FutureCast List100 优化路线图

> 最后更新: 2026-01-06
> 状态: P1.2 IMDb Top 250 页面迁移已完成，正在进行 DG120 和 THU Book List 的迁移工作

---

## 已完成 ✅

### P0 - CSS 架构重构
- [x] 创建模块化 CSS 架构 (`base/`, `components/`)
- [x] 统一设计变量系统 (`variables.css`)
- [x] 提取可复用组件 (navbar, buttons, modal, toast, cards, forms)
- [x] 重构页面特定 CSS (global, landing, imdb, dg120, thu-book-list)
- [x] 减少 28% CSS 代码量，消除重复定义

### P1.1 - JavaScript 模块化基础架构
- [x] 创建 `core/storage.js` - 统一 localStorage 封装 (DataStore, CollectionStore)
- [x] 创建 `core/utils.js` - 通用工具函数 (debounce, throttle, getDecade, formatDate, downloadAsJson, readFileAsJson, createElement, delegate 等)
- [x] 创建 `core/collection-page.js` - 集合页面基类 (CollectionPage)
- [x] 创建 `components/modal.js` - 可复用模态框组件 (Modal)
- [x] 创建 `components/filters.js` - 筛选器组件 (FilterManager, FilterConfigs)
- [x] 创建 `components/toast.js` - Toast 通知组件 (Toast, getToast)
- [x] 创建 `components/list-renderer.js` - 列表渲染器 (ListRenderer, SidebarListRenderer)

### P1.2 - IMDb Top 250 页面迁移
- [x] 重构 `imdb-top-250.js` 使用新模块 (继承 CollectionPage)
- [x] 更新 `imdb-top-250.html` 引入新模块脚本
- [x] 实现旧数据迁移支持 (watchedMovies → list100_imdb_markedItems)
- [x] 测试验证功能正常

**当前模块结构**:
```
assets/js/
├── core/
│   ├── storage.js          # ✅ DataStore + CollectionStore 类
│   ├── utils.js            # ✅ 通用工具函数集合
│   └── collection-page.js  # ✅ 集合页面基类
├── components/
│   ├── modal.js            # ✅ 可复用模态框
│   ├── filters.js          # ✅ 筛选器管理器
│   ├── toast.js            # ✅ Toast 通知组件
│   └── list-renderer.js    # ✅ 列表/侧边栏渲染器
├── imdb-top-250.js         # ✅ 已迁移使用新模块
├── dg120.js                # 🔄 待迁移 (包含巨型数据数组)
└── thu-book-list.js        # 🔄 待迁移 (硬编码 innerHTML)
```

---

## 进行中 🔄

### P1.2 - JavaScript 模块化重构 (Phase 2 - 剩余页面迁移)

**DG 120 页面迁移 (`dg120.html` / `dg120.js`)**:
- [ ] **数据分离**: 将 `dg120Albums` 巨型数组提取为独立数据文件或 JSON (在迁移前或迁移中完成)
- [ ] **类实现**: 创建 `DG120Page` 类继承 `CollectionPage`
- [ ] **筛选器配置**: 将 `dg120.html` 中的硬编码 `<select>` 选项移至 JS `filterConfig`
- [ ] **清理代码**: 移除旧的 `dg120.js` 全局函数和事件绑定

**THU Book List 页面迁移 (`thu-book-list.html` / `thu-book-list.js`)**:
- [ ] **类实现**: 创建 `THUBookPage` 类继承 `CollectionPage`
- [ ] **模板优化**: 使用 `ListRenderer` 替换旧的 innerHTML 拼接逻辑
- [ ] **状态管理**: 移除旧的 `booksState` 对象，使用父类的数据流
- [ ] **筛选器迁移**: 同样将硬编码的 Category/Status 筛选器配置化

**迁移策略** (渐进式):
1. 在 HTML 中按顺序引入核心模块
2. 保留原有页面 JS 文件中的数据定义 (逐步移至 `assets/data/`)
3. 创建新的页面类文件 (如 `dg120-new.js` 或直接重写)
4. 实现页面特定的渲染和逻辑
5. 测试验证后移除冗余代码

---

## 待优化项目

### P1.3 统一数据层 (已部分完成)
**目标**: 建立抽象的数据访问层

**已实现** (在 `core/storage.js` 中):
- [x] 实现 DataStore 基类
- [x] 实现 CollectionStore 派生类
- [x] 数据验证和错误处理
- [x] 导入/导出标准化

**待完成**:
- [ ] **数据迁移脚本**: 为 DG120 和 THU 实现旧 localStorage 格式到新格式的自动迁移
- [ ] **自动备份**: 实现简单的定期自动备份到 LocalStorage 备份槽

### P1.4 性能优化 - 虚拟滚动
**目标**: 优化长列表渲染性能

**当前问题**:
- IMDb 250, DG 121, THU 120 列表长度尚可，但未来扩展或移动端可能会卡顿
- DOM 节点过多影响重绘性能

**实施方案**:
- 实现 `VirtualList` 类或扩展 `ListRenderer` 支持虚拟滚动
- 仅渲染视口可见区域的 items

---

### P2 - 中优先级

#### 2.1 代码维护性提升
- [ ] **数据与逻辑分离**: 将 `dg120.js` 和 `thu-book-list.js` 中的静态数据 (`dg120Albums`, `BOOKS_DATA`) 移至 `assets/data/` 目录下的 `.js` 或 `.json` 文件。
- [ ] **动态筛选器 UI**: 修改 `FilterManager` 或 `CollectionPage`，支持根据 `config` 自动生成 HTML 筛选器控件，消除 HTML 中的硬编码 options。

#### 2.2 用户体验增强

**2.2.1 交互反馈优化**
- [ ] 统一 Loading 状态指示器
- [ ] 操作成功/失败反馈动画
- [ ] 骨架屏 (Skeleton Screen) 加载
- [ ] 拖拽排序的视觉反馈增强

**2.2.2 移动端优化**
- [ ] 触摸手势支持 (滑动删除、下拉刷新)
- [ ] 移动端导航栏优化 (汉堡菜单)
- [ ] 响应式断点优化

**2.2.3 可访问性 (a11y)**
- [ ] 添加 ARIA 标签
- [ ] 键盘导航支持
- [ ] 焦点管理

---

### P3 - 低优先级 / 长期规划

#### 3.1 架构升级

**3.1.1 构建系统**
考虑引入轻量级构建工具 (Vite/Preact)，但目前保持无构建步骤的静态站点也是一种优势（部署简单）。

**3.1.2 国际化 (i18n)**
- [ ] 提取硬编码的中文字符串到资源文件
- [ ] 实现简单的 i18n store

#### 3.2 功能增强
- [ ] 云端备份支持 (GitHub Gist / Dropbox)
- [ ] 多设备同步
- [ ] 数据可视化 (年度回顾、统计图表)
- [ ] 分享清单功能

---

## 优先级评估标准

| 级别 | 影响范围 | 实施难度 | 用户价值 |
|------|----------|----------|----------|
| P0   | 全站     | 中       | 高       |
| P1   | 全站     | 高       | 高       |
| P2   | 部分页面 | 中       | 中       |
| P3   | 可选增强 | 高       | 中低     |

---

## 下一步行动建议

1. **立即执行**: 开始 `dg120.js` 的重构，首先将 `dg120Albums` 数据提取出来。
2. **紧随其后**: 完成 DG120 页面类实现，确保与 IMDb 页面体验一致。
3. **之后**: 进行 THU Book List 的迁移。
