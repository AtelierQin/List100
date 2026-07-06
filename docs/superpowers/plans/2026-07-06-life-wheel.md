# Life Wheel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/life-wheel` page that aggregates all 100 List100 goals into 8 life-area buckets, displays them as an SVG radar chart, with per-area breakdowns and aggregate insights.

**Architecture:** Data layer (`lib/lifeWheel.ts` hook with `lib/constants.ts` taxonomy) feeds 4 pure UI components (RadarChart / AreaGrid / InsightPanel / TagFrequency). Page composition in `_LifeWheelPage.tsx`. Native CSS Modules + design tokens. No new dependencies.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript strict, SVG (handwritten, no chart lib), CSS Modules.

## Global Constraints

These constraints apply to every task:

- **No new dependencies** — handwritten SVG, no chart libraries.
- **CSS Modules** — every component uses `*.module.css` colocated in `src/components/LifeWheel/`.
- **Touch targets ≥ 44px** — all interactive elements must meet `min-height/width: 44px` (Apple HIG).
- **Respect `prefers-reduced-motion`** — wrap any non-essential animation in a media query.
- **No emoji as structural icons** — use inline SVG.
- **Types must be 100% strict** — `tsc --noEmit` (already configured via tsconfig) must pass with no `any`.
- **TS path alias `@/*` → `src/*`** is configured in tsconfig — use it.
- **Dark default theme** — zinc palette. Light mode overrides exist via `[data-theme="light"]` but feature works against `var(--color-*)` tokens.
- **Verification tool** for this project: `npx tsc --noEmit` and `npm run build` (no test framework installed).

## File Structure

```
src/
├── app/
│   └── life-wheel/
│       ├── page.tsx                    ← Task 4 (thin "use client" wrapper)
│       ├── _LifeWheelPage.tsx          ← Task 4 (page composition)
│       └── page.module.css             ← Task 4
├── components/
│   ├── Navbar.tsx                      ← Task 4 (add navItem)
│   └── LifeWheel/                      ← Tasks 2 + 3 (subfolder)
│       ├── index.ts                    ← Task 2 (barrel export)
│       ├── RadarChart.tsx              ← Task 2
│       ├── RadarChart.module.css       ← Task 2
│       ├── AreaGrid.tsx                ← Task 3
│       ├── AreaGrid.module.css         ← Task 3
│       ├── InsightPanel.tsx            ← Task 3
│       ├── InsightPanel.module.css     ← Task 3
│       ├── TagFrequency.tsx            ← Task 3
│       └── TagFrequency.module.css     ← Task 3
└── lib/
    ├── data.ts                         ← UNCHANGED
    ├── constants.ts                    ← Task 1 (LIFE_AREAS)
    └── lifeWheel.ts                    ← Task 1 (useLifeWheelSummary, types, TAG_TO_AREA)
```

---

## Task 1: Data Foundation — `lib/constants.ts` + `lib/lifeWheel.ts`

**Files:**
- Create: `src/lib/constants.ts`
- Create: `src/lib/lifeWheel.ts`

**Interfaces:**
- Produces:
  - `LIFE_AREAS: ReadonlyArray<{ id: LifeAreaId; label: string; color: string }>`
  - `LifeAreaId = "Travel" | "Career" | "Health" | "Learning" | "Finance" | "Social" | "Creative" | "Personal"`
  - `LifeAreaScore { score: number; total: number; completed: number; pending: number; color: string; label: string }`
  - `LifeWheelSummary { byArea, balance, thrivingCount, dormantCount, emptyCount, activeAreas, untagged: Goal[], milestones, habits, pinned: Goal[], tagCounts: Map<string, number> }`
  - `useLifeWheelSummary(goals: Goal[]): LifeWheelSummary`

- [ ] **Step 1.1: Create `src/lib/constants.ts`**

Write the file with this exact content:

```ts
/**
 * 8 life areas — fixed taxonomy used by the /life-wheel page.
 * Order is also the visual order on the radar chart (clockwise from top).
 * Colors resolve to globals.css design tokens or fixed Tailwind-era hex.
 */
export const LIFE_AREAS = [
    { id: "Travel",   label: "Travel",   color: "var(--color-info)"     },
    { id: "Career",   label: "Career",   color: "var(--color-warning)"  },
    { id: "Health",   label: "Health",   color: "var(--color-success)"  },
    { id: "Learning", label: "Learning", color: "var(--color-purple)"   },
    { id: "Finance",  label: "Finance",  color: "var(--color-danger)"   },
    { id: "Social",   label: "Social",   color: "var(--color-accent)"   },
    { id: "Creative", label: "Creative", color: "#fb923c" /* orange-400 */ },
    { id: "Personal", label: "Personal", color: "#818cf8" /* indigo-400 */ },
] as const;

export type LifeAreaId = (typeof LIFE_AREAS)[number]["id"];

export const LIFE_AREA_IDS: ReadonlyArray<LifeAreaId> = LIFE_AREAS.map((a) => a.id);
```

- [ ] **Step 1.2: Create `src/lib/lifeWheel.ts`**

Write the file with this exact content:

```ts
"use client";

import { useMemo } from "react";
import type { Goal, Milestone, Habit } from "./data";
import { LIFE_AREAS, LIFE_AREA_IDS, type LifeAreaId } from "./constants";

/**
 * Bilingual keyword dictionary mapping free-form Goal.tags
 * to one of the 8 life areas. Matching is case-insensitive and whitespace-trimmed.
 * A goal with multiple matching tags is counted in each matched area.
 * Tags not in this map fall into Summary.untagged for the UI to surface.
 */
export const TAG_TO_AREA: Record<string, LifeAreaId> = {
    // Travel
    travel: "Travel", trip: "Travel", world: "Travel",
    旅行: "Travel", 旅游: "Travel", 世界: "Travel", 出行: "Travel", 出游: "Travel", 国外: "Travel",
    // Career
    career: "Career", work: "Career", job: "Career",
    事业: "Career", 工作: "Career", 职业: "Career", 公司: "Career",
    // Health
    health: "Health", fitness: "Health", meditation: "Health",
    健康: "Health", 健身: "Health", 运动: "Health", 冥想: "Health", 跑步: "Health", 身体: "Health", 睡眠: "Health",
    // Learning
    learning: "Learning", study: "Learning", course: "Learning",
    学习: "Learning", 读书: "Learning", 课程: "Learning", 成长: "Learning", 教育: "Learning", 学校: "Learning",
    // Finance
    finance: "Finance", money: "Finance", invest: "Finance",
    财务: "Finance", 理财: "Finance", 投资: "Finance", 经济: "Finance", 存钱: "Finance",
    // Social
    social: "Social", family: "Social", friends: "Social",
    社交: "Social", 家人: "Social", 朋友: "Social", 关系: "Social", 感情: "Social", 爱情: "Social", 亲情: "Social",
    // Creative
    creative: "Creative", art: "Creative", music: "Creative",
    创造: "Creative", 艺术: "Creative", 音乐: "Creative", 绘画: "Creative", 写作: "Creative", 创作: "Creative", 设计: "Creative",
    // Personal
    personal: "Personal", mindfulness: "Personal", growth: "Personal",
    个人: "Personal", 反思: "Personal", 心智: "Personal", 精神: "Personal", 自我: "Personal", 日记: "Personal", 思考: "Personal",
};

export interface LifeAreaScore {
    /** 0-100; percentage of completed goals in this area. 0 when no goals exist. */
    score: number;
    /** Total goals tagged with this area. */
    total: number;
    /** Goals in this area marked completed. */
    completed: number;
    /** Goals in this area still pending. */
    pending: number;
    /** Color from LIFE_AREAS, used for axis highlight and card accent bar. */
    color: string;
    /** Display label. */
    label: string;
}

export interface LifeWheelSummary {
    byArea: Record<LifeAreaId, LifeAreaScore>;
    /** Round average of all 8 area scores (0-100). */
    balance: number;
    /** Count of areas with score >= 75. */
    thrivingCount: number;
    /** Count of areas with 0 < total AND score < 25. */
    dormantCount: number;
    /** Count of areas with total === 0. */
    emptyCount: number;
    /** 8 - emptyCount. */
    activeAreas: number;
    /** Goals that have no tag matching TAG_TO_AREA. */
    untagged: Goal[];
    /** Aggregated milestone stats across all goals. */
    milestones: { total: number; completed: number; pending: number };
    /** Aggregated habit stats across all goals. */
    habits: { active: number; longestStreakDays: number; avgStreakDays: number };
    /** Goals marked pinned. */
    pinned: Goal[];
    /** Frequency of each tag that successfully mapped to an area. */
    tagCounts: Map<string, number>;
}

interface InternalAccumulator {
    byArea: Record<LifeAreaId, LifeAreaScore>;
    matchedGoalsByArea: Record<LifeAreaId, Set<string>>;
    untagged: Goal[];
    matchedTagCounts: Map<string, number>;
}

function emptyArea(): LifeAreaScore {
    return { score: 0, total: 0, completed: 0, pending: 0, color: "", label: "" };
}

function buildAccumulator(): InternalAccumulator {
    const byArea = {} as Record<LifeAreaId, LifeAreaScore>;
    const matchedGoalsByArea = {} as Record<LifeAreaId, Set<string>>;
    for (const a of LIFE_AREAS) {
        byArea[a.id] = { ...emptyArea(), color: a.color, label: a.label };
        matchedGoalsByArea[a.id] = new Set();
    }
    return {
        byArea,
        matchedGoalsByArea,
        untagged: [],
        matchedTagCounts: new Map(),
    };
}

function classifyTag(rawTag: string): { normalized: string; area: LifeAreaId | null } {
    const normalized = rawTag.trim().toLowerCase();
    if (!normalized) return { normalized, area: null };
    const area = TAG_TO_AREA[normalized] ?? null;
    return { normalized, area };
}

function longestStreak(habit: Habit): number {
    // completedDates are ISO date strings (YYYY-MM-DD). Compute max consecutive run.
    const dates = habit.completedDates
        .map((d) => new Date(d).getTime())
        .filter((t) => !Number.isNaN(t))
        .sort((a, b) => a - b);
    if (dates.length === 0) return 0;
    let best = 1;
    let current = 1;
    const day = 24 * 60 * 60 * 1000;
    for (let i = 1; i < dates.length; i++) {
        const diff = Math.round((dates[i] - dates[i - 1]) / day);
        if (diff === 1) {
            current++;
            if (current > best) best = current;
        } else if (diff > 1) {
            current = 1;
        }
        // diff === 0 (same day twice) is ignored
    }
    return best;
}

export function useLifeWheelSummary(goals: Goal[]): LifeWheelSummary {
    return useMemo(() => {
        const acc = buildAccumulator();

        for (const goal of goals) {
            const ids = goal.tags ?? [];
            const matchedAreas = new Set<LifeAreaId>();
            for (const tag of ids) {
                const { normalized, area } = classifyTag(tag);
                if (!area) continue;
                matchedAreas.add(area);
                acc.matchedTagCounts.set(normalized, (acc.matchedTagCounts.get(normalized) ?? 0) + 1);
            }

            if (matchedAreas.size === 0) {
                acc.untagged.push(goal);
                continue;
            }

            for (const areaId of matchedAreas) {
                const set = acc.matchedGoalsByArea[areaId];
                if (set.has(goal.id)) continue; // de-dup if user used two synonyms for same area
                set.add(goal.id);
                const slot = acc.byArea[areaId];
                slot.total += 1;
                if (goal.completed) slot.completed += 1;
                slot.pending = slot.total - slot.completed;
                slot.score = Math.round((slot.completed / slot.total) * 100);
            }
        }

        const totalScore = LIFE_AREA_IDS.reduce((sum, id) => sum + acc.byArea[id].score, 0);
        const balance = Math.round(totalScore / LIFE_AREA_IDS.length);
        const thrivingCount = LIFE_AREA_IDS.filter((id) => acc.byArea[id].total > 0 && acc.byArea[id].score >= 75).length;
        const dormantCount = LIFE_AREA_IDS.filter((id) => acc.byArea[id].total > 0 && acc.byArea[id].score < 25).length;
        const emptyCount = LIFE_AREA_IDS.filter((id) => acc.byArea[id].total === 0).length;

        // Milestone aggregate
        let mTotal = 0;
        let mCompleted = 0;
        let habitsActive = 0;
        let longestStreakDays = 0;
        let streakSum = 0;
        let streakCount = 0;
        const pinned: Goal[] = [];
        for (const g of goals) {
            const ms = g.milestones ?? [];
            for (const m of ms) {
                mTotal += 1;
                if (m.completed) mCompleted += 1;
            }
            const hs = g.habits ?? [];
            for (const h of hs) {
                habitsActive += 1;
                const s = longestStreak(h);
                if (s > longestStreakDays) longestStreakDays = s;
                streakSum += s;
                streakCount += 1;
            }
            if (g.pinned) pinned.push(g);
        }
        const avgStreakDays = streakCount > 0 ? Math.round(streakSum / streakCount) : 0;

        return {
            byArea: acc.byArea,
            balance,
            thrivingCount,
            dormantCount,
            emptyCount,
            activeAreas: LIFE_AREA_IDS.length - emptyCount,
            untagged: acc.untagged,
            milestones: { total: mTotal, completed: mCompleted, pending: mTotal - mCompleted },
            habits: { active: habitsActive, longestStreakDays, avgStreakDays },
            pinned,
            tagCounts: acc.matchedTagCounts,
        };
    }, [goals]);
}

/**
 * Semantic color tier for a per-area progress bar based on its score.
 * - total === 0        → "empty" (no goals yet)
 * - score >= 75        → "success" (thriving)
 * - score >= 50        → "info"    (on track)
 * - score >= 25        → "warning" (in progress)
 * - score < 25         → "danger"  (neglected)
 */
export function tierForScore(
    score: number,
    total: number,
): "empty" | "success" | "info" | "warning" | "danger" {
    if (total === 0) return "empty";
    if (score >= 75) return "success";
    if (score >= 50) return "info";
    if (score >= 25) return "warning";
    return "danger";
}
```

- [ ] **Step 1.3: Run typecheck — must pass with zero errors**

Run: `npx tsc --noEmit`
Expected: command exits with code 0, no output (or only known warnings).

- [ ] **Step 1.4: Commit**

```bash
git add src/lib/constants.ts src/lib/lifeWheel.ts
git commit -m "feat(life-wheel): add constants + useLifeWheelSummary hook"
```

---

## Task 2: RadarChart Component + Barrel

**Files:**
- Create: `src/components/LifeWheel/RadarChart.tsx`
- Create: `src/components/LifeWheel/RadarChart.module.css`
- Create: `src/components/LifeWheel/index.ts`

**Interfaces:**
- Consumes: `LIFE_AREAS` and `LifeAreaId` from `@/lib/constants`, `LifeAreaScore` from `@/lib/lifeWheel`.
- Produces:
  ```ts
  RadarChart({ byArea, onAreaClick? }: {
    byArea: Record<LifeAreaId, LifeAreaScore>;
    onAreaClick?: (id: LifeAreaId) => void;
  }): JSX.Element
  ```
  Plus barrel re-export from `@/components/LifeWheel`.

- [ ] **Step 2.1: Create `src/components/LifeWheel/RadarChart.tsx`**

```tsx
"use client";

import { LIFE_AREAS, type LifeAreaId } from "@/lib/constants";
import type { LifeAreaScore } from "@/lib/lifeWheel";
import styles from "./RadarChart.module.css";

interface Props {
    byArea: Record<LifeAreaId, LifeAreaScore>;
    onAreaClick?: (id: LifeAreaId) => void;
}

const SIZE = 360;
const CENTER = SIZE / 2;
const MAX_RADIUS = SIZE / 2 - 56; // leaves room for labels

/**
 * 8-axis radar chart of life-area goal completion.
 * Each axis is one of LIFE_AREAS. Score 0–100 maps to a polygon vertex
 * distance from the center. Click an axis to focus on its area.
 */
export function RadarChart({ byArea, onAreaClick }: Props) {
    const N = LIFE_AREAS.length;

    // Pre-compute axis geometry (top, clockwise).
    const axes = LIFE_AREAS.map((area, i) => {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / N;
        return {
            id: area.id,
            label: area.label,
            color: area.color,
            angle,
            tipX: CENTER + MAX_RADIUS * Math.cos(angle),
            tipY: CENTER + MAX_RADIUS * Math.sin(angle),
            labelX: CENTER + (MAX_RADIUS + 28) * Math.cos(angle),
            labelY: CENTER + (MAX_RADIUS + 28) * Math.sin(angle),
        };
    });

    // Polygon vertices for the user's data.
    const dataPoints = axes.map((axis) => {
        const score = byArea[axis.id]?.score ?? 0;
        const r = (score / 100) * MAX_RADIUS;
        return {
            x: CENTER + r * Math.cos(axis.angle),
            y: CENTER + r * Math.sin(axis.angle),
            score,
            id: axis.id,
        };
    });
    const polygonPoints = dataPoints
        .map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`)
        .join(" ");

    // Concentric guide rings at 25/50/75/100 %.
    const rings = [25, 50, 75, 100].map((pct) => {
        const r = (pct / 100) * MAX_RADIUS;
        const pts = axes
            .map(
                (axis) =>
                    `${(CENTER + r * Math.cos(axis.angle)).toFixed(2)},${(CENTER + r * Math.sin(axis.angle)).toFixed(2)}`,
            )
            .join(" ");
        return { pct, pts };
    });

    return (
        <div className={styles.wrap}>
            <svg
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                className={styles.svg}
                role="img"
                aria-label="Life Wheel radar chart of 8 life areas"
            >
                {/* Guide rings */}
                {rings.map((ring) => (
                    <polygon
                        key={ring.pct}
                        points={ring.pts}
                        className={styles.ring}
                        fill="none"
                    />
                ))}

                {/* Axis lines */}
                {axes.map((axis) => (
                    <line
                        key={`axis-${axis.id}`}
                        x1={CENTER}
                        y1={CENTER}
                        x2={axis.tipX}
                        y2={axis.tipY}
                        className={styles.axis}
                    />
                ))}

                {/* Data polygon (filled) */}
                <polygon points={polygonPoints} className={styles.dataPolygon} />

                {/* Data dots */}
                {dataPoints.map((p) => (
                    <circle
                        key={`dot-${p.id}`}
                        cx={p.x}
                        cy={p.y}
                        r={3.5}
                        className={styles.dataDot}
                    />
                ))}

                {/* Axis labels (clickable) */}
                {axes.map((axis) => {
                    const score = byArea[axis.id]?.score ?? 0;
                    const total = byArea[axis.id]?.total ?? 0;
                    return (
                        <g
                            key={`label-${axis.id}`}
                            className={styles.labelGroup}
                            role="button"
                            tabIndex={0}
                            aria-label={`${axis.label}: ${score}%, ${total} goals`}
                            onClick={() => onAreaClick?.(axis.id)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    onAreaClick?.(axis.id);
                                }
                            }}
                        >
                            <text
                                x={axis.labelX}
                                y={axis.labelY}
                                className={styles.labelText}
                                textAnchor="middle"
                                dominantBaseline="middle"
                            >
                                {axis.label}
                            </text>
                            <text
                                x={axis.labelX}
                                y={axis.labelY + 14}
                                className={styles.scoreText}
                                textAnchor="middle"
                                dominantBaseline="middle"
                            >
                                {total === 0 ? "—" : `${score}%`}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
```

- [ ] **Step 2.2: Create `src/components/LifeWheel/RadarChart.module.css`**

```css
.wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 8px 0;
}

.svg {
    width: 100%;
    max-width: 360px;
    height: auto;
    aspect-ratio: 1 / 1;
    overflow: visible;
}

.ring {
    stroke: var(--color-border);
    stroke-width: 1;
    opacity: 0.4;
}

.axis {
    stroke: var(--color-border);
    stroke-width: 1;
    stroke-dasharray: 2 4;
    opacity: 0.5;
}

.dataPolygon {
    fill: var(--color-accent);
    fill-opacity: 0.18;
    stroke: var(--color-accent);
    stroke-width: 1.5;
    stroke-linejoin: round;
}

.dataDot {
    fill: var(--color-accent);
    stroke: var(--color-bg);
    stroke-width: 1.5;
}

.labelGroup {
    cursor: pointer;
    outline: none;
}

.labelGroup:focus-visible {
    /* Pulse the parent group's text via outline on the inner <text>. */
}

.labelGroup:focus-visible .labelText {
    fill: var(--color-focus-ring);
}

.labelText {
    font-family: var(--font-family-mono);
    font-size: 11px;
    font-weight: 500;
    fill: var(--color-text-primary);
    letter-spacing: 0.04em;
    transition: fill 0.15s ease-out;
}

.labelGroup:hover .labelText {
    fill: var(--color-accent);
}

.scoreText {
    font-family: var(--font-family-mono);
    font-size: 10px;
    fill: var(--color-text-muted);
    letter-spacing: 0.02em;
}

@media (prefers-reduced-motion: reduce) {
    .labelText {
        transition: none;
    }
}
```

- [ ] **Step 2.3: Create `src/components/LifeWheel/index.ts`**

```ts
export { RadarChart } from "./RadarChart";
export { AreaGrid } from "./AreaGrid";
export { InsightPanel } from "./InsightPanel";
export { TagFrequency } from "./TagFrequency";
```

> Note: Tasks 3 will create `AreaGrid.tsx`, `InsightPanel.tsx`, `TagFrequency.tsx`. If Task 2 runs in isolation (e.g., before Task 3 exists), those export lines will fail typecheck until Task 3 lands. That's expected — the next steps in Task 3 will create the missing files. Do NOT commit Task 2 alone if the missing modules fail the build; defer commit until at least one consumer page references the barrel, or skip barrel creation in Task 2 and move it to Task 4.

If executing tasks sequentially in the same session: proceed to Step 2.4 now. If executing in parallel: defer this file's creation until all three component files exist.

- [ ] **Step 2.4: Run typecheck — must pass**

Run: `npx tsc --noEmit`
Expected: exits with code 0.

If barrel exists and Task 3 components haven't been created yet, expect a temporary failure — that's fine, will resolve in Task 3.

- [ ] **Step 2.5: Commit only if Task 3 components exist**

```bash
git add src/components/LifeWheel/RadarChart.tsx src/components/LifeWheel/RadarChart.module.css src/components/LifeWheel/index.ts
git commit -m "feat(life-wheel): add RadarChart SVG component"
```

If Task 3 components are not yet created, defer this commit. The barrel + RadarChart should be committed together with Task 3's components in a single commit to keep history coherent.

---

## Task 3: AreaGrid + InsightPanel + TagFrequency Components

**Files:**
- Create: `src/components/LifeWheel/AreaGrid.tsx`
- Create: `src/components/LifeWheel/AreaGrid.module.css`
- Create: `src/components/LifeWheel/InsightPanel.tsx`
- Create: `src/components/LifeWheel/InsightPanel.module.css`
- Create: `src/components/LifeWheel/TagFrequency.tsx`
- Create: `src/components/LifeWheel/TagFrequency.module.css`

**Interfaces:**

AreaGrid:
```ts
AreaGrid({ byArea, onAreaClick? }: {
    byArea: Record<LifeAreaId, LifeAreaScore>;
    onAreaClick?: (id: LifeAreaId) => void;
}): JSX.Element
```

InsightPanel:
```ts
InsightPanel({
    milestones: { total: number; completed: number; pending: number };
    habits: { active: number; longestStreakDays: number; avgStreakDays: number };
    pinned: Goal[];
}): JSX.Element
```

TagFrequency:
```ts
TagFrequency({
    tagCounts: Map<string, number>;
    untaggedCount: number;
}): JSX.Element
```

- [ ] **Step 3.1: Create `src/components/LifeWheel/AreaGrid.tsx`**

```tsx
"use client";

import Link from "next/link";
import { LIFE_AREAS, type LifeAreaId } from "@/lib/constants";
import { tierForScore, type LifeAreaScore } from "@/lib/lifeWheel";
import styles from "./AreaGrid.module.css";

interface Props {
    byArea: Record<LifeAreaId, LifeAreaScore>;
    onAreaClick?: (id: LifeAreaId) => void;
}

export function AreaGrid({ byArea, onAreaClick }: Props) {
    return (
        <div className={styles.grid}>
            {LIFE_AREAS.map((area) => {
                const score = byArea[area.id];
                const tier = tierForScore(score.score, score.total);
                const isComplete = score.total > 0 && score.score === 100;
                return (
                    <button
                        key={area.id}
                        type="button"
                        className={`${styles.card} ${styles[`tier_${tier}`]}`}
                        onClick={() => onAreaClick?.(area.id)}
                        style={{ "--area-color": area.color } as React.CSSProperties}
                    >
                        <span className={styles.accent} aria-hidden="true" />
                        <span className={styles.label}>
                            {area.label}
                            {isComplete && <span className={styles.spark} aria-label="completed">✦</span>}
                        </span>
                        <span className={styles.percentage}>
                            {score.total === 0 ? "—" : `${score.score}%`}
                        </span>
                        <span className={styles.bar} aria-hidden="true">
                            <span
                                className={styles.barFill}
                                style={{ width: `${score.score}%` }}
                            />
                        </span>
                        <span className={styles.meta}>
                            {score.total === 0 ? (
                                <Link
                                    href="/list100"
                                    className={styles.addLink}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    + Add goal
                                </Link>
                            ) : (
                                <>
                                    {score.completed}/{score.total} done
                                    {score.pending > 0 && (
                                        <span className={styles.pending}> · {score.pending} to go</span>
                                    )}
                                </>
                            )}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
```

- [ ] **Step 3.2: Create `src/components/LifeWheel/AreaGrid.module.css`**

```css
.grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
}

@media (max-width: 1024px) {
    .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 560px) {
    .grid {
        grid-template-columns: 1fr;
    }
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
    padding: 14px 14px 16px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-lg, 12px);
    text-align: left;
    cursor: pointer;
    min-height: 110px;
    overflow: hidden;
    transition: transform 0.15s ease-out, border-color 0.15s ease-out;
    font-family: inherit;
    color: inherit;
}

.card:hover {
    border-color: var(--color-border-hover);
}

.card:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
}

.card:active {
    transform: scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
    .card {
        transition: none;
    }
    .card:active {
        transform: none;
    }
}

.accent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: var(--area-color);
    opacity: 0.85;
}

.label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-family-mono);
    font-size: 11px;
    font-weight: 500;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
}

.spark {
    color: #fbbf24; /* amber-400 */
    font-size: 13px;
}

.percentage {
    font-family: var(--font-family);
    font-size: 24px;
    font-weight: 600;
    color: var(--color-text-headline);
    line-height: 1.1;
}

.bar {
    display: block;
    width: 100%;
    height: 4px;
    background: var(--color-surface-deep, rgba(0, 0, 0, 0.2));
    border-radius: 999px;
    overflow: hidden;
}

.barFill {
    display: block;
    height: 100%;
    background: var(--area-color);
    transition: width 0.3s ease-out;
}

.tier_empty .barFill {
    background: var(--color-border);
}

.meta {
    font-family: var(--font-family-mono);
    font-size: 11px;
    color: var(--color-text-muted);
    letter-spacing: 0.02em;
}

.pending {
    color: var(--color-text-light);
}

.addLink {
    color: var(--color-accent);
    text-decoration: none;
    border-bottom: 1px dashed currentColor;
}

.addLink:hover {
    color: var(--color-accent-hover);
}
```

- [ ] **Step 3.3: Create `src/components/LifeWheel/InsightPanel.tsx`**

```tsx
"use client";

import type { Goal } from "@/lib/data";
import styles from "./InsightPanel.module.css";

interface Milestones {
    total: number;
    completed: number;
    pending: number;
}

interface Habits {
    active: number;
    longestStreakDays: number;
    avgStreakDays: number;
}

interface Props {
    milestones: Milestones;
    habits: Habits;
    pinned: Goal[];
}

function CompassIcon() {
    return (
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" stroke="none" />
        </svg>
    );
}

function FlameIcon() {
    return (
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 5.5 2 .5 2 2 2 4 0 2.485-1.79 4.5-4 4.5s-4-2.015-4-4.5z" />
            <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5 0 .5-.5 1.5-2 1.5-1 0-1.5-.5-2-1.5C9 11 8 12.9 8 14a4 4 0 1 0 8 0" />
        </svg>
    );
}

function PinIcon() {
    return (
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="17" x2="12" y2="22" />
            <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17z" />
        </svg>
    );
}

export function InsightPanel({ milestones, habits, pinned }: Props) {
    return (
        <div className={styles.grid}>
            <div className={styles.cell}>
                <div className={styles.header}>
                    <CompassIcon />
                    <h3 className={styles.title}>Milestones</h3>
                </div>
                <p className={styles.bigStat}>{milestones.completed}<span className={styles.unit}>/{milestones.total}</span></p>
                <p className={styles.subStat}>
                    {milestones.pending > 0
                        ? `${milestones.pending} in progress`
                        : milestones.total > 0 ? "All milestones complete" : "No milestones yet"}
                </p>
            </div>

            <div className={styles.cell}>
                <div className={styles.header}>
                    <FlameIcon />
                    <h3 className={styles.title}>Habits</h3>
                </div>
                <p className={styles.bigStat}>{habits.active}<span className={styles.unit}> active</span></p>
                <p className={styles.subStat}>
                    {habits.active === 0
                        ? "No habits tracked yet"
                        : `Longest streak: ${habits.longestStreakDays} day${habits.longestStreakDays === 1 ? "" : "s"}`}
                </p>
                {habits.active > 0 && (
                    <p className={styles.subStat}>
                        Avg streak: {habits.avgStreakDays} day{habits.avgStreakDays === 1 ? "" : "s"}
                    </p>
                )}
            </div>

            <div className={styles.cell}>
                <div className={styles.header}>
                    <PinIcon />
                    <h3 className={styles.title}>Pinned</h3>
                </div>
                {pinned.length === 0 ? (
                    <>
                        <p className={styles.bigStat}>0</p>
                        <p className={styles.subStat}>Pin goals in list100 to spotlight them here</p>
                    </>
                ) : (
                    <>
                        <p className={styles.bigStat}>{pinned.length}</p>
                        <ul className={styles.pinnedList}>
                            {pinned.slice(0, 3).map((g) => (
                                <li key={g.id} className={styles.pinnedItem}>
                                    {g.text?.trim() || <em>Empty goal</em>}
                                </li>
                            ))}
                            {pinned.length > 3 && (
                                <li className={styles.pinnedMore}>+{pinned.length - 3} more</li>
                            )}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}
```

- [ ] **Step 3.4: Create `src/components/LifeWheel/InsightPanel.module.css`**

```css
.grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
}

@media (max-width: 768px) {
    .grid {
        grid-template-columns: 1fr;
    }
}

.cell {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 18px 18px 20px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-lg, 12px);
    min-height: 140px;
}

.header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
}

.icon {
    width: 16px;
    height: 16px;
    color: var(--color-text-secondary);
}

.title {
    font-family: var(--font-family-mono);
    font-size: 11px;
    font-weight: 500;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0;
}

.bigStat {
    font-family: var(--font-family);
    font-size: 28px;
    font-weight: 600;
    color: var(--color-text-headline);
    line-height: 1.1;
    margin: 0;
}

.unit {
    font-size: 14px;
    color: var(--color-text-muted);
    font-weight: 400;
    margin-left: 2px;
}

.subStat {
    font-family: var(--font-family-mono);
    font-size: 11px;
    color: var(--color-text-muted);
    margin: 0;
    letter-spacing: 0.02em;
}

.pinnedList {
    list-style: none;
    margin: 8px 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.pinnedItem {
    font-size: 12px;
    color: var(--color-text-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.pinnedMore {
    font-family: var(--font-family-mono);
    font-size: 10px;
    color: var(--color-text-muted);
}
```

- [ ] **Step 3.5: Create `src/components/LifeWheel/TagFrequency.tsx`**

```tsx
"use client";

import styles from "./TagFrequency.module.css";

interface Props {
    tagCounts: Map<string, number>;
    untaggedCount: number;
}

const MAX_TAGS_DISPLAY = 16;

function fontSizeFor(count: number, maxCount: number): number {
    if (maxCount <= 1) return 0.85;
    const ratio = Math.log(count + 1) / Math.log(maxCount + 1);
    return Math.max(0.85, Math.min(2, ratio));
}

export function TagFrequency({ tagCounts, untaggedCount }: Props) {
    const sorted = [...tagCounts.entries()]
        .sort(([, a], [, b]) => b - a)
        .slice(0, MAX_TAGS_DISPLAY);
    const maxCount = sorted[0]?.[1] ?? 1;

    if (sorted.length === 0 && untaggedCount === 0) {
        return (
            <div className={styles.empty}>
                Add tags to your goals to see distribution by life area here.
            </div>
        );
    }

    return (
        <div className={styles.wrap}>
            {sorted.length > 0 ? (
                <div className={styles.cloud}>
                    {sorted.map(([tag, count]) => (
                        <span
                            key={tag}
                            className={styles.tag}
                            style={{
                                fontSize: `${fontSizeFor(count, maxCount)}em`,
                                opacity: 0.55 + (count / maxCount) * 0.45,
                            }}
                        >
                            {tag}
                            <span className={styles.tagCount}>{count}</span>
                        </span>
                    ))}
                </div>
            ) : (
                <div className={styles.empty}>
                    No tagged goals yet. Add tags to see distribution.
                </div>
            )}
            {untaggedCount > 0 && (
                <p className={styles.untaggedNote}>
                    <span className={styles.untaggedDot} aria-hidden="true" />{" "}
                    {untaggedCount} goal{untaggedCount === 1 ? "" : "s"} not yet mapped to any area —
                    add a tag in <code>/list100</code> to include them.
                </p>
            )}
        </div>
    );
}
```

- [ ] **Step 3.6: Create `src/components/LifeWheel/TagFrequency.module.css`**

```css
.wrap {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.cloud {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px 16px;
}

.tag {
    font-family: var(--font-family-mono);
    color: var(--color-text-primary);
    display: inline-flex;
    align-items: baseline;
    gap: 4px;
    padding: 4px 10px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 999px;
    line-height: 1.2;
}

.tagCount {
    font-size: 0.55em;
    color: var(--color-text-muted);
}

.untaggedNote {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-family-mono);
    font-size: 11px;
    color: var(--color-warning);
    margin: 0;
}

.untaggedDot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: var(--color-warning);
}

.empty {
    font-family: var(--font-family-mono);
    font-size: 12px;
    color: var(--color-text-muted);
    font-style: italic;
}

code {
    font-family: var(--font-family-mono);
    font-size: 0.95em;
    padding: 1px 6px;
    background: var(--color-surface-deep, rgba(0, 0, 0, 0.2));
    border-radius: 4px;
}
```

- [ ] **Step 3.7: Confirm `index.ts` from Task 2 is complete**

Verify `src/components/LifeWheel/index.ts` exists and exports all 4 components. If Task 2 was deferred, create it now with:

```ts
export { RadarChart } from "./RadarChart";
export { AreaGrid } from "./AreaGrid";
export { InsightPanel } from "./InsightPanel";
export { TagFrequency } from "./TagFrequency";
```

- [ ] **Step 3.8: Run typecheck — must pass**

Run: `npx tsc --noEmit`
Expected: exits with code 0. Fix any errors before continuing.

- [ ] **Step 3.9: Commit**

```bash
git add src/components/LifeWheel/
git commit -m "feat(life-wheel): add AreaGrid, InsightPanel, TagFrequency components"
```

---

## Task 4: Page Composition + Routing + Navbar + Verification

**Files:**
- Create: `src/app/life-wheel/_LifeWheelPage.tsx`
- Create: `src/app/life-wheel/page.tsx`
- Create: `src/app/life-wheel/page.module.css`
- Modify: `src/components/Navbar.tsx` (insert one navItem line)

**Interfaces:**
- Produces: `/life-wheel` route accessible via Navbar "Wheel" link, renders all 6 sections.

- [ ] **Step 4.1: Create `src/app/life-wheel/_LifeWheelPage.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useGoals } from "@/lib/data";
import { useLifeWheelSummary } from "@/lib/lifeWheel";
import { RadarChart, AreaGrid, InsightPanel, TagFrequency } from "@/components/LifeWheel";
import type { LifeAreaId } from "@/lib/constants";
import styles from "./page.module.css";

function CompassMark() {
    return (
        <svg
            className={styles.heroIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="9" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" stroke="none" />
        </svg>
    );
}

function EmptyHero() {
    return (
        <div className={styles.emptyHero}>
            <CompassMark />
            <h1 className={styles.emptyTitle}>Your wheel is unbuilt.</h1>
            <p className={styles.emptyText}>
                Add goals to <Link href="/list100" className={styles.link}>/list100</Link> to see how your aspirations
                distribute across 8 life areas — Travel, Career, Health, Learning, Finance, Social, Creative, Personal.
            </p>
            <Link href="/list100" className={styles.cta}>
                Define your first goal →
            </Link>
        </div>
    );
}

export default function LifeWheelPage() {
    // Component is loaded via `next/dynamic({ ssr: false })` so localStorage
    // is available immediately on first render — no isMounted guard needed.
    const { goals } = useGoals();
    const summary = useLifeWheelSummary(goals);
    const [focusedArea, setFocusedArea] = useState<LifeAreaId | null>(null);

    // Cold start: zero goals → onboarding hero only.
    if (goals.length === 0) {
        return (
            <main className={styles.main}>
                <div className={styles.container}>
                    <EmptyHero />
                </div>
            </main>
        );
    }

    const showRadar = summary.activeAreas >= 3;

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                {/* SECTION 1 · Hero */}
                <section className={styles.hero}>
                    <div className={styles.heroLeft}>
                        <h1 className={styles.heroTitle}>
                            <CompassMark />
                            Life Wheel
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Design what to grow next — eight areas, one glance.
                        </p>
                    </div>
                    <div className={styles.heroRight}>
                        <div className={styles.balanceBlock}>
                            <span className={styles.balanceLabel}>Balance</span>
                            <span className={styles.balanceNumber}>{summary.balance}<span className={styles.balanceUnit}>%</span></span>
                        </div>
                        <div className={styles.heroChips}>
                            <span className={styles.chip}>{summary.activeAreas}/8 areas</span>
                            <span className={`${styles.chip} ${summary.thrivingCount > 0 ? styles.chipSuccess : ""}`}>
                                {summary.thrivingCount} thriving
                            </span>
                            <span className={`${styles.chip} ${summary.dormantCount > 0 ? styles.chipWarn : ""}`}>
                                {summary.dormantCount} need care
                            </span>
                        </div>
                    </div>
                </section>

                {/* SECTION 2 · Radar */}
                {showRadar ? (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Distribution</h2>
                        <RadarChart
                            byArea={summary.byArea}
                            onAreaClick={(id) =>
                                setFocusedArea(focusedArea === id ? null : id)
                            }
                        />
                    </section>
                ) : (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Distribution</h2>
                        <p className={styles.softNote}>
                            Add goals across more life areas to see the radar (need at least 3 active areas —
                            you have {summary.activeAreas}).
                        </p>
                    </section>
                )}

                {/* SECTION 3 · AreaGrid */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>By area</h2>
                        {focusedArea && (
                            <span className={styles.focusChip}>
                                Focused: {focusedArea} · click again to clear
                            </span>
                        )}
                    </div>
                    <AreaGrid
                        byArea={summary.byArea}
                        onAreaClick={(id) =>
                            setFocusedArea(focusedArea === id ? null : id)
                        }
                    />
                </section>

                {/* SECTION 4 · Insights */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Rollups</h2>
                    <InsightPanel
                        milestones={summary.milestones}
                        habits={summary.habits}
                        pinned={summary.pinned}
                    />
                </section>

                {/* SECTION 5 · Tag Frequency */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Tag frequencies</h2>
                    <TagFrequency
                        tagCounts={summary.tagCounts}
                        untaggedCount={summary.untagged.length}
                    />
                </section>

                {/* SECTION 6 · Placeholder for history trend (future) */}
                <section className={`${styles.section} ${styles.placeholder}`}>
                    <div className={styles.placeholderInner}>
                        <span className={styles.placeholderBadge}>Coming soon</span>
                        <h3 className={styles.placeholderTitle}>Year-over-year</h3>
                        <p className={styles.placeholderText}>
                            Snapshot recording is planned for a future release. Once enabled, this panel
                            will show how your balance has shifted across quarters.
                        </p>
                    </div>
                </section>

                <footer className={styles.footer}>
                    <p>Life Wheel · 8 areas · {goals.length} goal{goals.length === 1 ? "" : "s"} mapped</p>
                </footer>
            </div>
        </main>
    );
}
```

- [ ] **Step 4.2: Create `src/app/life-wheel/page.tsx`**

```tsx
"use client";

import dynamic from "next/dynamic";

// Skip SSR so localStorage is available on first render — matches the
// pattern used by /list100, /world, /china, /os, and the collection pages.
const LifeWheelPage = dynamic(() => import("./_LifeWheelPage"), {
    ssr: false,
    loading: () => (
        <main
            style={{
                minHeight: "100vh",
                background: "var(--color-bg)",
            }}
        />
    ),
});

export default LifeWheelPage;
```

- [ ] **Step 4.3: Create `src/app/life-wheel/page.module.css`**

```css
.main {
    min-height: 100vh;
    background: var(--color-bg);
    padding: 32px 24px 80px;
    color: var(--color-text-primary);
}

.container {
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 32px;
}

/* ==================== Hero ==================== */

.hero {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--color-border);
}

@media (max-width: 768px) {
    .hero {
        flex-direction: column;
        align-items: flex-start;
    }
}

.heroLeft {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.heroTitle {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: var(--font-family);
    font-size: 32px;
    font-weight: 600;
    color: var(--color-text-headline);
    letter-spacing: -0.02em;
    margin: 0;
}

@media (max-width: 560px) {
    .heroTitle {
        font-size: 24px;
    }
}

.heroIcon {
    width: 28px;
    height: 28px;
    color: var(--color-accent);
}

.heroSubtitle {
    font-family: var(--font-family-mono);
    font-size: 13px;
    color: var(--color-text-muted);
    margin: 0;
    letter-spacing: 0.02em;
}

.heroRight {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
}

@media (max-width: 768px) {
    .heroRight {
        align-items: flex-start;
    }
}

.balanceBlock {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

@media (max-width: 768px) {
    .balanceBlock {
        align-items: flex-start;
    }
}

.balanceLabel {
    font-family: var(--font-family-mono);
    font-size: 11px;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.balanceNumber {
    font-family: var(--font-family);
    font-size: 56px;
    font-weight: 600;
    color: var(--color-accent);
    line-height: 1;
    font-variant-numeric: tabular-nums;
}

.balanceUnit {
    font-size: 22px;
    color: var(--color-text-secondary);
    margin-left: 4px;
}

.heroChips {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.chip {
    font-family: var(--font-family-mono);
    font-size: 11px;
    color: var(--color-text-secondary);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 999px;
    padding: 4px 10px;
    letter-spacing: 0.04em;
}

.chipSuccess {
    color: var(--color-success);
    border-color: rgba(16, 185, 129, 0.3);
}

.chipWarn {
    color: var(--color-warning);
    border-color: rgba(245, 158, 11, 0.3);
}

/* ==================== Sections ==================== */

.section {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.sectionHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
}

.sectionTitle {
    font-family: var(--font-family-mono);
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0;
}

.focusChip {
    font-family: var(--font-family-mono);
    font-size: 11px;
    color: var(--color-accent);
    border: 1px dashed var(--color-accent);
    padding: 4px 10px;
    border-radius: 999px;
}

.softNote {
    font-family: var(--font-family-mono);
    font-size: 12px;
    color: var(--color-text-muted);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-lg, 12px);
    padding: 16px 18px;
    margin: 0;
}

/* ==================== Empty hero ==================== */

.emptyHero {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
    padding: 80px 24px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-xl, 16px);
}

.emptyTitle {
    font-family: var(--font-family);
    font-size: 28px;
    font-weight: 600;
    color: var(--color-text-headline);
    margin: 0;
}

.emptyText {
    font-family: var(--font-family-mono);
    font-size: 13px;
    color: var(--color-text-secondary);
    max-width: 520px;
    line-height: 1.7;
    margin: 0;
}

.link {
    color: var(--color-accent);
    text-decoration: none;
    border-bottom: 1px dashed currentColor;
}

.cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 12px 24px;
    margin-top: 8px;
    background: var(--color-accent);
    color: var(--color-text-on-primary, #fff);
    border-radius: 999px;
    text-decoration: none;
    font-weight: 500;
    min-height: 44px;
    transition: background 0.15s ease-out, transform 0.15s ease-out;
}

.cta:hover {
    background: var(--color-accent-hover);
}

.cta:active {
    transform: scale(0.97);
}

/* ==================== Placeholder ==================== */

.placeholder {
    background: repeating-linear-gradient(
        135deg,
        var(--color-surface),
        var(--color-surface) 12px,
        var(--color-surface-deep, rgba(0, 0, 0, 0.2)) 12px,
        var(--color-surface-deep, rgba(0, 0, 0, 0.2)) 24px
    );
    border: 1px dashed var(--color-border-hover);
    border-radius: var(--border-radius-lg, 12px);
    padding: 28px 24px;
}

.placeholderInner {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-width: 520px;
}

.placeholderBadge {
    display: inline-block;
    width: fit-content;
    font-family: var(--font-family-mono);
    font-size: 10px;
    color: var(--color-text-muted);
    background: var(--color-bg);
    border: 1px solid var(--color-border-hover);
    padding: 2px 8px;
    border-radius: 999px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.placeholderTitle {
    font-family: var(--font-family);
    font-size: 18px;
    font-weight: 500;
    color: var(--color-text-secondary);
    margin: 0;
}

.placeholderText {
    font-family: var(--font-family-mono);
    font-size: 12px;
    color: var(--color-text-muted);
    margin: 0;
    line-height: 1.6;
}

/* ==================== Footer ==================== */

.footer {
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid var(--color-border);
    font-family: var(--font-family-mono);
    font-size: 11px;
    color: var(--color-text-muted);
    text-align: center;
}
```

- [ ] **Step 4.4: Modify `src/components/Navbar.tsx` — add Wheel navItem**

In `src/components/Navbar.tsx`, locate the `navItems` array around line 8:

```ts
const navItems = [
    { href: "/list100", label: "List100" },
];
```

Replace with:

```ts
const navItems = [
    { href: "/list100", label: "List100" },
    { href: "/life-wheel", label: "Wheel" },
];
```

Then locate the mobile menu `<Link>` block near line 155 (after the `{/* Mobile Menu */}` comment). Add a single new `<Link>` inside the `<div id="mobile-menu">`:

After the existing line:
```tsx
<Link href="/list100" className={styles.mobileNavLink}>List100</Link>
```

Add immediately below it:

```tsx
<Link href="/life-wheel" className={styles.mobileNavLink}>Life Wheel</Link>
```

- [ ] **Step 4.5: Run typecheck — must pass with zero errors**

Run: `npx tsc --noEmit`
Expected: command exits with code 0.

- [ ] **Step 4.6: Run full build — must succeed**

Run: `npm run build`
Expected: build succeeds. Output should show a new route appearing in the route list — look for a line ending in `/life-wheel`.

If the route is missing from the build output, double-check that `src/app/life-wheel/page.tsx` exists and exports `default`.

- [ ] **Step 4.7: Manual browser verification — three scenarios**

Start the dev server: `npm run dev`

**Scenario A — Cold start (no goals)**

1. Open DevTools → Application → Local Storage → clear all keys for `localhost`.
2. Navigate to `http://localhost:3000/life-wheel`.
3. Verify: shows the empty hero with "Your wheel is unbuilt." CTA.
4. Verify: clicking CTA navigates to `/list100`.

**Scenario B — Some goals, mostly untagged**

1. In `/list100`, add 5 goals with no tags.
2. Navigate to `/life-wheel`.
3. Verify: shows hero with Balance `0%` (since no tags map to areas).
4. Verify: "By area" grid shows all 8 cards as `—` and "+ Add goal" link.
5. Verify: "Tag frequencies" section shows the empty-cloud message and the "5 goal(s) not yet mapped" warning.

**Scenario C — Goals with bilingual tags**

1. In `/list100`, add 4 goals with tags `["事业"]`, `["事业", "学习"]`, `["健康", "运动"]`, `["旅行"]`. Mark one `事业` goal as completed.
2. Navigate to `/life-wheel`.
3. Verify: hero Balance is roughly `((100 + 50 + 50 + 50 + 50 + 50 + 50 + 50) / 8) ≈ 56%` (Career 100, others 50, empties 0). Adjust based on actual distribution.
4. Verify: radar chart shows the data polygon, with Career pushed furthest out.
5. Verify: Career card shows `100%`, `1/1 done`.
6. Verify: tag cloud shows `事业×2 · 学习×1 · 健康×1 · 运动×1 · 旅行×1`.
7. Verify: nav bar shows "Wheel" link active on `/life-wheel`.
8. Verify: keyboard tab through the 8 area cards — focus ring is visible.

For all scenarios, check console for hydration warnings or runtime errors. None should appear.

- [ ] **Step 4.8: Commit**

```bash
git add src/app/life-wheel/ src/components/Navbar.tsx
git commit -m "feat(life-wheel): add /life-wheel route, page composition, nav entry"
```

---

## Done

After all tasks complete:
- `/life-wheel` is reachable from the navbar as "Wheel".
- Radar shows 8 life areas with bilingual keyword support.
- Per-area grid, milestones/habits/pinned rollups, and tag cloud all populated.
- Mobile breakpoints down to 1 column.
- All commits land on `main` with conventional-commit messages.

Next follow-ups (not in scope): capture snapshots for year-over-year comparison.
