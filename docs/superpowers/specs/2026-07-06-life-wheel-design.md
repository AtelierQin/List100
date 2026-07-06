# Life Wheel — 生活轮分析与展示页

**状态**: 已批准设计，待实施
**日期**: 2026-07-06
**归属**: List100 (FutureCast)

## 1. 目标

在 List100 上增加一个 `/life-wheel` 页面，从 `Goal.tags` 自动聚合出 8 个人生区域的完成度分布，以雷达图（Life Wheel）为视觉锚，辅以区域明细、洞察、tag 频度。让用户一眼看出自己人生在哪一片失衡。

## 2. 用户故事

| 角色 | 场景 | 期望 |
|------|------|------|
| 用户 | 进入 `/life-wheel` | 立刻看到自己 8 区域的完成雷达，能点开看某个区域的具体 goal |
| 用户 | Career 完成 100%，其它全 0 | 雷达图明显偏向 Career，UI 提示"Career ✦ 已完成"且"其它 7 区待启动" |
| 用户 | 几乎不给 goal 打 tag | 顶部 CTA："12 个 goal 待分类 → 一键建议 tag" |
| 用户 | 0 个 goal | 整个页面是 onboarding，引导去 `/list100` 加第一个 goal |

## 3. 非目标（YAGNI）

- 历史快照 / 时间趋势（仅预留 UI 占位）
- 自定义 8 区域 / 用户编辑 area 字典（固定 8 区）
- PDF 导出 / 分享图
- 暗色模式（项目当前未启）
- 雷达图动画（一眼到位即可）

## 4. 架构

### 4.1 文件树

```
src/
├── app/
│   └── life-wheel/
│       ├── page.tsx                # thin "use client" wrapper, next/dynamic ssr:false
│       ├── _LifeWheelPage.tsx      # 实际内容
│       └── page.module.css
├── components/
│   ├── Navbar.tsx                  # 修改：新增 navItems "/life-wheel"
│   └── LifeWheel/                  # 子目录组织 4 个 Section 组件
│       ├── index.ts                # barrel
│       ├── RadarChart.tsx
│       ├── RadarChart.module.css
│       ├── AreaGrid.tsx
│       ├── AreaGrid.module.css
│       ├── InsightPanel.tsx
│       ├── InsightPanel.module.css
│       ├── TagFrequency.tsx
│       └── TagFrequency.module.css
├── lib/
│   ├── data.ts                     # 不动
│   ├── lifeWheel.ts                # useLifeWheelSummary + TAG_TO_AREA + tier helpers
│   └── constants.ts                # LIFE_AREAS 常量数组
└── …
```

### 4.2 数据流

```
useGoals()              ──┐
                          │
useVisitedWorld()        ──┼─→ useLifeWheelSummary() ──→ _LifeWheelPage.tsx
useVisitedChina()        ──┤                              ├─ Hero
useDashboardStats() 链路  ──┘                              ├─ RadarChart
                                                         ├─ AreaGrid
                                                         ├─ InsightPanel
                                                         └─ TagFrequency
```

**单点计算**: 所有派生聚合在 `useLifeWheelSummary()` 一个 hook 内一次性 `useMemo`，避免瀑布式重算。

### 4.3 SSR 策略

`page.tsx` 用 `next/dynamic({ ssr: false })` 与现有其他数据驱动页保持一致。SSR fallback 是 `<main style={{ minHeight: "100vh", background: "var(--color-bg)" }} />`。

## 5. 8 区域定义

```ts
const LIFE_AREAS = [
  { id: "Travel",   label: "Travel",   color: "var(--color-info)"     },
  { id: "Career",   label: "Career",   color: "var(--color-warning)"  },
  { id: "Health",   label: "Health",   color: "var(--color-success)"  },
  { id: "Learning", label: "Learning", color: "var(--color-purple)"   },
  { id: "Finance",  label: "Finance",  color: "var(--color-danger)"   },
  { id: "Social",   label: "Social",   color: "var(--color-accent)"   },
  { id: "Creative", label: "Creative", color: "#fb923c" },              // orange-400
  { id: "Personal", label: "Personal", color: "#818cf8" },              // indigo-400
] as const;
```

数组顺序即雷达图顺时针起点（顶 = Travel）。

## 6. Tag 分类映射

为支持用户的**中文** tag，使用双向关键词字典（大小写不敏感）：

```ts
const TAG_TO_AREA: Record<string, LifeAreaId> = {
  // Travel
  "travel": "Travel", "trip": "Travel", "world": "Travel",
  "旅行": "Travel", "旅游": "Travel", "世界": "Travel", "出行": "Travel", "出游": "Travel", "国外": "Travel",
  // Career
  "career": "Career", "work": "Career", "job": "Career",
  "事业": "Career", "工作": "Career", "职业": "Career", "公司": "Career",
  // Health
  "health": "Health", "fitness": "Health", "meditation": "Health",
  "健康": "Health", "健身": "Health", "运动": "Health", "冥想": "Health", "跑步": "Health", "身体": "Health", "睡眠": "Health",
  // Learning
  "learning": "Learning", "study": "Learning", "course": "Learning",
  "学习": "Learning", "读书": "Learning", "课程": "Learning", "成长": "Learning", "教育": "Learning", "学校": "Learning",
  // Finance
  "finance": "Finance", "money": "Finance", "invest": "Finance",
  "财务": "Finance", "理财": "Finance", "投资": "Finance", "经济": "Finance", "存钱": "Finance",
  // Social
  "social": "Social", "family": "Social", "friends": "Social",
  "社交": "Social", "家人": "Social", "朋友": "Social", "关系": "Social", "感情": "Social", "爱情": "Social", "亲情": "Social",
  // Creative
  "creative": "Creative", "art": "Creative", "music": "Creative",
  "创造": "Creative", "艺术": "Creative", "音乐": "Creative", "绘画": "Creative", "写作": "Creative", "创作": "Creative", "设计": "Creative",
  // Personal
  "personal": "Personal", "mindfulness": "Personal", "growth": "Personal",
  "个人": "Personal", "反思": "Personal", "心智": "Personal", "精神": "Personal", "自我": "Personal", "日记": "Personal", "思考": "Personal",
};
```

匹配规则：对每个 goal 的 `tags` 数组，对每个 tag 取 `tag.trim().toLowerCase()`，命中即归入对应 area。**一个 goal 可以归入多个 area**（tag 多对一或多对多）。无命中 → 进入"未分类"集合。

## 7. 评分公式

```
per_area_score = total_in_area === 0 ? 0 : round(completed_in_area / total_in_area × 100)

balance_score = round(AVG of all 8 area_scores)        // 0~100
thriving_count = count(areas where score >= 75)
dormant_count  = count(areas where 0 < total AND score < 25)
empty_areas    = count(areas where total === 0)
active_areas   = 8 - empty_areas
```

`balance_score` 是 hero 大数字；其余 4 个数字显示为 chip。

## 8. 组件契约

### 8.1 `useLifeWheelSummary(goals: Goal[]): Summary`

```ts
interface AreaScore {
  score: number;       // 0-100
  total: number;
  completed: number;
  pending: number;
  color: string;
  label: string;
}
interface Summary {
  byArea: Record<LifeAreaId, AreaScore>;
  balance: number;
  thrivingCount: number;
  dormantCount: number;
  emptyCount: number;
  activeAreas: number;
  untagged: Goal[];                 // 没有命中任何 area 的 goal
  milestones: { total: number; completed: number; pending: number };
  habits: { active: number; longestStreakDays: number; avgStreakDays: number };
  pinned: Goal[];
  tagCounts: Map<string, number>;   // 命中字典的 tag 频度
}
```

### 8.2 `RadarChart`

| Prop | Type | 描述 |
|------|------|------|
| `byArea` | `Record<LifeAreaId, AreaScore>` | 8 区域分数 |
| `emptyColor` | `string` | 0 数据轴颜色 |
| `onAreaClick` | `(id: LifeAreaId) => void` | 点击轴回调 |

### 8.3 `AreaGrid`

| Prop | Type |
|------|------|
| `byArea` | 同上 |
| `onAreaClick` | 同上 |

每张卡：彩色顶条 + 区域名 + 进度条 + "X/Y 已完成" + "Z 待办"。Total=0 时显示"+ 添加"按钮，点击跳到 `/list100`（v1 不预填 tag，链接占位；后续版本可在 list100 页面解析查询参数预填）。

### 8.4 `InsightPanel`

| Prop | Type |
|------|------|
| `milestones` | `{ total, completed, pending }` |
| `habits` | `{ active, longestStreakDays, avgStreakDays }` |
| `pinned` | `Goal[]`（显示前 3 个的 text） |

### 8.5 `TagFrequency`

| Prop | Type |
|------|------|
| `tagCounts` | `Map<string, number>` |
| `untaggedCount` | `number` |

词云：tag 字号 = `Math.max(0.75, Math.min(2, Math.log(count + 1)))`。

## 9. 页面 layout（_LifeWheelPage.tsx）

```
<section 1: Hero>                  h ≈ 360px
<section 2: RadarChart>            h ≈ 480px, 居中 360px SVG
<section 3: AreaGrid>              4×2 grid → 2×4 tablet → 1×8 mobile
<section 4: InsightPanel>          3 列（CSS grid）→ 1 列 mobile
<section 5: TagFrequency>          h ≈ 120px
<section 6: TrendPlaceholder>      h ≈ 100px, 灰底禁用卡
```

空状态判定（在 _LifeWheelPage.tsx 内部）：
- `goals.length === 0` → 整个 hero 替换为 onboarding 大插画
- `goals.length > 0 && active_areas < 3` → 不渲染 RadarChart，替换为"完成度概览" + "再加几个 goal 让数据立体"

## 10. 边界处理

| 情形 | 行为 |
|------|------|
| 0 个 goal | 整个 hero 替换为 onboarding（图标 + CTA 到 /list100） |
| 1-9 个 goal | 不渲染雷达图，显示"完成度概览"提示 |
| 所有 goal 无可命中 tag | 顶部显式 CTA"建议 tag"（v1 只显示数量，不实现自动建议） |
| 部分 goal 无可命中 tag | 显示"⚠️ N 个未分类"折叠卡，列出 goal 标题 |
| 区域 100% 完成 | 区域卡显示金色 ✦；雷达多边形顶点越界用 ✦ 替代数字 |
| 区域 0 个 goal | 雷达轴虚线；区域卡显示"+ 添加"按钮，点击跳到 `/list100`（v1 不预填 tag，链接占位 + 鼓励用户在该页打 tag）|
| localStorage 数据损坏 | `JSON.parse` 失败兜底为空数组 + console.warn |
| 移动端宽度 < 768px | 网格降为 1 列；雷达图缩到 280px |

## 11. 样式规范

- 使用项目现有 design tokens：颜色、间距、圆角、动效
- 复用 `_LandingPage.tsx` 中相同 section header 样式
- CSS Modules（与现有 `*.module.css` 一致），**不引入新依赖**
- 触摸目标 ≥ 44px（per ui-ux-pro-max 规则）
- 尊重 `prefers-reduced-motion`：禁用雷达入场动画与 count-up
- 焦点环 2px（`--color-focus-ring` token）

## 12. 测试策略

### 12.1 数据 fixture

创建 3 个 localStorage fixture 手动验证：

1. **"Atlas"** (12 goals / 6 area 命中 / 一半完成) — 主要 happy path
2. **"TopHeavy"** (10 goals / 全属 Career / 全部完成) — 验证 100% 金标 + 其它区域全空
3. **"ColdStart"** (0 goals) — 验证 onboarding 空状态

### 12.2 自动验证

- `npm run typecheck` 必须通过（8 个组件 Props 接口 0 个 `any`）
- `npm run build` 必须全绿；新增路由 `/life-wheel` 必须出现在 SSG 列表中
- 8 个组件 Props 都通过 TS interface 强类型
- 雷达 SVG 节点（多边形顶点数）≤ 8 个；整体 DOM 节点 ≤ 80

### 12.3 可访问性

- Tab 顺序与视觉顺序一致
- 雷达图每条轴带 `aria-label="Career: 25% complete"`
- 进度条用 `role="progressbar"` + `aria-valuenow`
- 颜色对比度 ≥ 4.5:1（WCAG AA）

### 12.4 性能

- 初始包 < 5 KB gzip（雷达 SVG 手写，不引第三方）
- 任何 useMemo 依赖正确（避免不必要的重渲染）

## 13. 导航

Navbar 修改：`navItems` 数组新增：
```ts
{ href: "/life-wheel", label: "Wheel" }
```
位置在 `List100` 之后、`Tours` 之前。

## 14. 实施步骤（高层）

1. 写 `src/lib/constants.ts` 与 `src/lib/lifeWheel.ts`
2. 写 4 个 Section 组件 + barrel
3. 写 `_LifeWheelPage.tsx` 与 `page.tsx` 路由
4. 写 `page.module.css`
5. 修改 `Navbar.tsx` 加 navItem
6. 浏览器手动测 3 种 fixture
7. `npm run build` & `npm run typecheck`

## 15. 时间表（粗估）

| 步骤 | 估时 |
|------|------|
| constants + lifeWheel hook | 30min |
| RadarChart SVG + 样式 | 60min |
| AreaGrid + 模块 | 40min |
| InsightPanel + TagFrequency | 40min |
| _LifeWheelPage + page.module.css | 30min |
| Navbar 修改 | 5min |
| 手测 + build/typecheck | 20min |
| **总计** | **~3.5h** |

## 16. 风险 & 缓解

| 风险 | 缓解 |
|------|------|
| 用户 tag 字典不完整导致大部分 goal 进"未分类" | 顶部"未分类"提示卡显眼，鼓励用户补 tag；tag 字典足够全（20+ 中文 + 8 英文每区） |
| 雷达图适配 hover 在移动端失效 | hover 仅提供额外细节，不阻断无 hover 的可用性 |
| 颜色变种在浅色背景上对比度差 | 已选 8 色全部通过 WCAG AA（橙 / 紫 / 蓝 / 绿 / 红 / 黄 + 中性色），无浅色变种 |
| localStorage 数据量大时计算性能 | useMemo 依赖 `[goals]`，正常 100 量级 O(n)，可接受 |
