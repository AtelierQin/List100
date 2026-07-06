"use client";

import { useMemo } from "react";
import type { Goal } from "./data";

/**
 * 8 life areas — matches the existing tag taxonomy in list100/page.tsx.
 * Goals tagged with any of these ids contribute to that area's score.
 * Order here is also the visual order on the radar chart (clockwise from top).
 */
export const LIFE_AREAS = [
    { id: "Travel", label: "Travel", color: "var(--color-info)" },
    { id: "Career", label: "Career", color: "var(--color-warning)" },
    { id: "Health", label: "Health", color: "var(--color-success)" },
    { id: "Learning", label: "Learning", color: "var(--color-purple)" },
    { id: "Finance", label: "Finance", color: "var(--color-danger)" },
    { id: "Social", label: "Social", color: "var(--color-accent)" },
    { id: "Creative", label: "Creative", color: "#fb923c" /* orange-400 */ },
    { id: "Personal", label: "Personal", color: "#818cf8" /* indigo-400 */ },
] as const;

export type LifeAreaId = (typeof LIFE_AREAS)[number]["id"];

export interface LifeAreaScore {
    /** Percentage of completed goals in this area, 0-100. */
    score: number;
    /** Total goals tagged with this area. */
    total: number;
    /** Goals in this area marked completed. */
    completed: number;
    /** Goals in this area still pending. */
    pending: number;
    /** Color from LIFE_AREAS, used for axis highlight. */
    color: string;
    /** Display label. */
    label: string;
}

export interface LifeWheelSummary {
    /** Map of area id → score detail. */
    byArea: Record<LifeAreaId, LifeAreaScore>;
    /** Mean of all area scores, 0-100. Useful as a single "balance" number. */
    average: number;
    /** Count of areas with at least one goal. */
    activeAreas: number;
    /** Count of areas at >=75% completion (the "thriving" zones). */
    thrivingAreas: number;
}

export function useLifeWheel(goals: Goal[]): LifeWheelSummary {
    return useMemo(() => {
        const byArea = {} as Record<LifeAreaId, LifeAreaScore>;

        for (const area of LIFE_AREAS) {
            const areaGoals = goals.filter((g) => g.tags?.includes(area.id));
            const completed = areaGoals.filter((g) => g.completed).length;
            const total = areaGoals.length;
            const score = total > 0 ? Math.round((completed / total) * 100) : 0;

            byArea[area.id] = {
                score,
                total,
                completed,
                pending: total - completed,
                color: area.color,
                label: area.label,
            };
        }

        const totalScore = LIFE_AREAS.reduce((sum, a) => sum + byArea[a.id].score, 0);
        const average = Math.round(totalScore / LIFE_AREAS.length);
        const activeAreas = LIFE_AREAS.filter((a) => byArea[a.id].total > 0).length;
        const thrivingAreas = LIFE_AREAS.filter((a) => byArea[a.id].score >= 75).length;

        return { byArea, average, activeAreas, thrivingAreas };
    }, [goals]);
}

/**
 * Returns a semantic color tier for the per-area progress bar based on score.
 * - 0  → muted (no goals yet)
 * - <25 → danger (neglected)
 * - <50 → warning (in progress)
 * - <75 → info (on track)
 * - >=75 → success (thriving)
 */
export function tierForScore(score: number, total: number): "empty" | "danger" | "warning" | "info" | "success" {
    if (total === 0) return "empty";
    if (score >= 75) return "success";
    if (score >= 50) return "info";
    if (score >= 25) return "warning";
    return "danger";
}