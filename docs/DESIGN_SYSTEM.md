# FutureCast 设计系统

## 概述
FutureCast 采用现代化、简洁的设计语言，注重用户体验和视觉一致性。设计系统基于原子设计理念，提供可复用的组件和统一的设计规范。

## 品牌标识

### 品牌名称与层次
- **主品牌**: FutureCast - 整体产品套件的品牌名称
- **核心产品**: List 100 - 主要的目标管理应用
- **子产品**: World Map, China Map, Database - 相关功能模块

### 品牌理念
- **核心理念**: "Life is a collection of moments"
- **设计哲学**: 简洁、优雅、有意义的体验设计
- **用户价值**: 帮助用户记录和追踪人生中重要的时刻与目标

## 设计原则

### 1. 简洁性 (Simplicity)
- 减少视觉噪音，突出核心功能
- 使用留白创造呼吸感
- 避免过度装饰

### 2. 一致性 (Consistency)
- 统一的颜色、字体、间距系统
- 一致的交互模式和反馈
- 跨页面的设计语言统一

### 3. 可访问性 (Accessibility)
- 符合WCAG 2.1标准
- 良好的颜色对比度
- 键盘导航支持

### 4. 响应式 (Responsive)
- 移动优先的设计理念
- 流畅的跨设备体验
- 自适应布局

## 颜色系统

### 主色调
```css
--color-primary: #667eea        /* 主品牌色 */
--color-primary-hover: #5a67d8  /* 悬停状态 */
--color-primary-light: #edf2f7  /* 浅色变体 */
--color-primary-dark: #4c51bf   /* 深色变体 */
```

### 中性色
```css
--color-text-primary: #1a202c    /* 主要文字 */
--color-text-secondary: #4a5568  /* 次要文字 */
--color-text-muted: #a0aec0      /* 辅助文字 */
--color-border: #e2e8f0          /* 边框色 */
--color-surface: #ffffff         /* 表面色 */
--color-bg: #fafbfc              /* 背景色 */
```

### 状态色
```css
--color-success: #48bb78   /* 成功 */
--color-danger: #f56565    /* 危险 */
--color-warning: #ed8936   /* 警告 */
--color-info: #4299e1      /* 信息 */
```

## 字体系统

### 字体族
- **主字体**: Inter - 用于界面元素、正文和大部分标题
- **装饰字体**: Playfair Display - 用于英雄标题、引言和装饰性文本
- **备用字体**: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### 字体大小层级
```css
--font-size-xs: 11px     /* 极小 - 标签、说明文字 */
--font-size-sm: 12px     /* 小 - 次要文字、表单标签 */
--font-size-base: 14px   /* 基础 - 正文、默认大小 */
--font-size-lg: 16px     /* 大 - 较大正文 */
--font-size-xl: 18px     /* 特大 - 子标题 */
--font-size-2xl: 20px    /* 超大 - 章节标题 */
--font-size-3xl: 24px    /* 巨大 - 页面标题 */
--font-size-4xl: 28px    /* 大标题 */
--font-size-5xl: 32px    /* 英雄标题 */
```

### 字重系统
- **Light (300)**: 装饰性文字
- **Regular (400)**: 正文内容
- **Medium (500)**: 导航链接、按钮
- **Semibold (600)**: 标题、重要信息
- **Bold (700)**: 强调标题

## 间距系统

```css
--spacing-xs: 4px      /* 极小间距 */
--spacing-sm: 8px      /* 小间距 */
--spacing-md: 16px     /* 中等间距 */
--spacing-lg: 24px     /* 大间距 */
--spacing-xl: 32px     /* 特大间距 */
--spacing-2xl: 48px    /* 超大间距 */
```

## 圆角系统

```css
--border-radius-sm: 8px      /* 小圆角 */
--border-radius: 12px        /* 标准圆角 */
--border-radius-lg: 16px     /* 大圆角 */
--border-radius-xl: 20px     /* 特大圆角 */
--border-radius-full: 9999px /* 完全圆角 */
```

## 阴影系统

```css
--shadow-sm: 0 1px 3px rgba(0,0,0,0.1)     /* 轻微阴影 */
--shadow-md: 0 4px 6px rgba(0,0,0,0.1)     /* 中等阴影 */
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1)   /* 大阴影 */
--shadow-xl: 0 20px 25px rgba(0,0,0,0.1)   /* 特大阴影 */
--shadow-2xl: 0 25px 50px rgba(0,0,0,0.25) /* 超大阴影 */
```

## 导航系统

### 统一Header设计
基于landing page的优雅设计，所有页面采用统一的导航栏：

#### 结构组成
- **固定定位**: 始终位于页面顶部
- **背景效果**: 95%透明度白色背景 + 20px模糊效果
- **高度**: 64px (桌面端)
- **最大宽度**: 1200px，居中对齐

#### 导航元素
```html
<nav class="nav">
  <div class="nav-container">
    <a href="landing.html" class="logo">FutureCast</a>
    <div class="nav-links">
      <a href="index.html" class="nav-link">List 100</a>
      <a href="travel-map.html" class="nav-link">World</a>
      <a href="china-map.html" class="nav-link">China</a>
      <a href="database.html" class="nav-link">Database</a>
      <!-- 特殊元素：进度条、状态指示器等 -->
    </div>
  </div>
</nav>
```

#### 交互状态
- **默认状态**: 次要文字颜色 (#4a5568)
- **悬停状态**: 主要文字颜色 + 浅色背景
- **激活状态**: 品牌色 + 品牌色浅色背景

### Motto Section
每个页面在导航栏下方都有一个优雅的格言区域：

#### 设计特点
- **渐变背景**: 从 #f8fafc 到 #f1f5f9
- **装饰效果**: 径向渐变叠加，营造深度感
- **字体**: Playfair Display 斜体，20px
- **动画**: 1.8秒淡入动画，延迟0.4秒开始

#### 内容策略
- **List 100**: "Life is like a box of chocolates, and I've chosen 100 to taste."
- **World Map**: "The world is a book, and those who do not travel read only one page."
- **China Map**: "读万卷书，行万里路。"
- **Database**: "Knowledge is a treasure, but practice is the key to it."

## 组件规范

### 按钮 (Button)

#### 主要按钮 (.btn-primary)
- 用于主要操作
- 蓝色背景，白色文字
- 悬停时加深颜色并上移1px

#### 次要按钮 (.btn-secondary)
- 用于次要操作
- 白色背景，灰色边框
- 悬停时背景变浅灰色

#### 幽灵按钮 (.btn-ghost)
- 用于不重要的操作
- 透明背景，灰色边框
- 悬停时显示背景色

#### 危险按钮 (.btn-danger)
- 用于删除等危险操作
- 红色背景，白色文字

### 卡片 (Card)

#### 基础卡片 (.card)
- 白色背景
- 轻微阴影
- 12px圆角
- 悬停时阴影加深并上移

#### 高级卡片 (.card-elevated)
- 渐变背景
- 更深的阴影
- 用于重要内容区域

### 表单元素

#### 输入框
- 12px内边距
- 8px圆角
- 灰色边框
- 聚焦时蓝色边框和阴影

#### 标签
- 11px字体大小
- 多种颜色变体
- 5px圆角
- 悬停效果

## 动画系统

### 过渡时间
```css
--transition-fast: 0.15s ease    /* 快速过渡 */
--transition-base: 0.2s ease     /* 标准过渡 */
--transition-slow: 0.3s ease     /* 慢速过渡 */
```

### 常用动画
- fadeIn: 淡入效果
- slideIn: 滑入效果
- scaleIn: 缩放进入
- pulse: 脉冲效果

## 状态系统

### 加载状态
- 旋转的圆形加载器
- 灰色文字提示

### 空状态
- 虚线边框的容器
- 居中的图标和文字
- 引导用户操作的按钮

### 错误状态
- 红色背景和边框
- 错误图标
- 清晰的错误信息

## 响应式断点

```css
/* 移动设备 */
@media (max-width: 768px) {
    /* 移动端样式 */
}

/* 平板设备 */
@media (min-width: 769px) and (max-width: 1024px) {
    /* 平板端样式 */
}

/* 桌面设备 */
@media (min-width: 1025px) {
    /* 桌面端样式 */
}
```

## 使用指南

### 1. 颜色使用
- 主色调用于重要操作和品牌元素
- 中性色用于文字和界面元素
- 状态色用于反馈和提示

### 2. 间距使用
- 使用8px网格系统
- 相关元素使用较小间距
- 不相关元素使用较大间距

### 3. 字体使用
- 标题使用较大字号和较重字重
- 正文使用14px基础字号
- 辅助信息使用较小字号

### 4. 组件组合
- 优先使用现有组件
- 保持组件间的一致性
- 遵循设计原则进行扩展

## 最佳实践

1. **保持一致性**：使用设计系统中定义的变量和组件
2. **注重可访问性**：确保足够的颜色对比度和键盘导航
3. **响应式设计**：考虑不同设备的使用场景
4. **性能优化**：合理使用动画和过渡效果
5. **用户体验**：提供清晰的反馈和引导

## 更新日志

### v1.1.0 (2025-11-02) - 统一Header设计
- **品牌升级**: 从 List100 升级为 FutureCast 品牌体系
- **统一导航**: 基于landing page设计，统一所有页面的header
- **字体优化**: 引入 Playfair Display 装饰字体，完善字体层级
- **Motto系统**: 为每个页面添加优雅的格言区域
- **响应式优化**: 改进移动端导航体验
- **动画增强**: 添加淡入动画和悬停效果

### v1.0.0 (2025-11-02)
- 建立基础设计系统
- 统一颜色、字体、间距规范
- 创建核心组件库
- 实现响应式设计
- 添加动画和交互效果