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