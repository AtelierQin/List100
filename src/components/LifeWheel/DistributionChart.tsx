"use client";

import { LIFE_AREAS, type LifeAreaId } from "@/lib/constants";
import { tierForScore, type LifeAreaScore } from "@/lib/lifeWheel";
import styles from "./DistributionChart.module.css";

interface Props {
    byArea: Record<LifeAreaId, LifeAreaScore>;
    /** Optional overall balance to render as a reference line. */
    balance?: number;
}

const TIER_COLOR: Record<string, string> = {
    success: "var(--color-success)",
    info:    "var(--color-info)",
    warning: "var(--color-warning)",
    danger:  "var(--color-danger)",
    empty:   "var(--color-text-muted)",
};

// SVG dimensions
const WIDTH = 800;
const HEIGHT = 360;
const PAD = { top: 36, right: 60, bottom: 60, left: 28 };
const CHART_W = WIDTH - PAD.left - PAD.right;
const CHART_H = HEIGHT - PAD.top - PAD.bottom;
const N = LIFE_AREAS.length;
const BAR_W = 56;
const GAP = (CHART_W - BAR_W * N) / (N - 1);

/**
 * 8-bar column chart of life-area goal completion.
 * Each column's height = % complete. Color = tier (health), not area.
 * A subtle dashed "GOAL" line at 100% gives a target reference.
 */
export function DistributionChart({ byArea, balance }: Props) {
    // Screen-reader summary.
    const ranked = LIFE_AREAS
        .map((a) => ({
            id: a.id,
            label: a.label,
            score: byArea[a.id].score,
            total: byArea[a.id].total,
        }))
        .filter((a) => a.total > 0)
        .sort((a, b) => b.score - a.score);
    const strongest = ranked[0];
    const weakest = ranked[ranked.length - 1];
    const summaryText = strongest
        ? `Distribution: strongest ${strongest.label} at ${strongest.score}%${
              weakest && weakest.id !== strongest.id
                  ? `, weakest ${weakest.label} at ${weakest.score}%`
                  : ""
          }.`
        : "Distribution: no data yet.";

    const showBalanceLine =
        typeof balance === "number" && balance > 0 && balance < 100;

    return (
        <div className={styles.wrap}>
            <svg
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                className={styles.svg}
                role="img"
                aria-label={`Column chart of 8 life areas by completion. ${summaryText}`}
            >
                {/* Subtle gridlines at 25/50/75% */}
                {[25, 50, 75].map((pct) => {
                    const y = PAD.top + CHART_H * (1 - pct / 100);
                    return (
                        <g key={`grid-${pct}`}>
                            <line
                                x1={PAD.left}
                                y1={y}
                                x2={WIDTH - PAD.right}
                                y2={y}
                                className={styles.gridline}
                            />
                            <text
                                x={WIDTH - PAD.right + 6}
                                y={y + 3}
                                className={styles.gridlineLabel}
                            >
                                {pct}%
                            </text>
                        </g>
                    );
                })}

                {/* GOAL line at 100% */}
                <line
                    x1={PAD.left}
                    y1={PAD.top}
                    x2={WIDTH - PAD.right}
                    y2={PAD.top}
                    className={styles.goalLine}
                />
                <text
                    x={WIDTH - PAD.right + 6}
                    y={PAD.top + 3}
                    className={styles.goalLabel}
                >
                    GOAL
                </text>

                {/* Optional balance reference line */}
                {showBalanceLine && (
                    <>
                        <line
                            x1={PAD.left}
                            y1={PAD.top + CHART_H * (1 - (balance as number) / 100)}
                            x2={WIDTH - PAD.right}
                            y2={PAD.top + CHART_H * (1 - (balance as number) / 100)}
                            className={styles.balanceLine}
                        />
                        <text
                            x={PAD.left - 4}
                            y={PAD.top + CHART_H * (1 - (balance as number) / 100) - 5}
                            className={styles.balanceLabel}
                            textAnchor="start"
                        >
                            AVG {balance}%
                        </text>
                    </>
                )}

                {/* Bars */}
                {LIFE_AREAS.map((area, i) => {
                    const score = byArea[area.id];
                    const isEmpty = score.total === 0;
                    const tier = tierForScore(score.score, score.total);
                    const tierColor = TIER_COLOR[tier];
                    const x = PAD.left + i * (BAR_W + GAP);
                    const barHeight = isEmpty ? 0 : (score.score / 100) * CHART_H;
                    const barY = PAD.top + CHART_H - barHeight;
                    const tooltip = isEmpty
                        ? `${area.label}: no goals yet`
                        : `${area.label}: ${score.score}% complete, ${score.completed} of ${score.total} done`;

                    return (
                        <g
                            key={area.id}
                            className={styles.barGroup}
                            style={{ "--bar-i": i } as React.CSSProperties}
                        >
                            <title>{tooltip}</title>
                            {/* Bar track (always shown — gives empty areas a footprint) */}
                            <rect
                                x={x}
                                y={PAD.top}
                                width={BAR_W}
                                height={CHART_H}
                                className={styles.barTrack}
                                rx="3"
                            />
                            {/* Bar fill (only if not empty) */}
                            {!isEmpty && (
                                <rect
                                    x={x}
                                    y={barY}
                                    width={BAR_W}
                                    height={barHeight}
                                    className={styles.barFill}
                                    style={{ fill: tierColor }}
                                    rx="3"
                                />
                            )}
                            {/* Value above bar */}
                            <text
                                x={x + BAR_W / 2}
                                y={isEmpty ? PAD.top + CHART_H - 8 : barY - 8}
                                className={styles.value}
                                textAnchor="middle"
                            >
                                {isEmpty ? "—" : `${score.score}%`}
                            </text>
                            {/* Area name below */}
                            <text
                                x={x + BAR_W / 2}
                                y={HEIGHT - PAD.bottom + 22}
                                className={styles.areaName}
                                textAnchor="middle"
                            >
                                {area.label}
                            </text>
                            {/* Area color dot below name */}
                            <circle
                                cx={x + BAR_W / 2}
                                cy={HEIGHT - PAD.bottom + 38}
                                r="3"
                                className={styles.areaDot}
                                style={{ fill: area.color }}
                            />
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
