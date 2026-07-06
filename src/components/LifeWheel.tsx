"use client";

import { LIFE_AREAS, type LifeWheelSummary, tierForScore } from "@/lib/lifeWheel";
import styles from "./LifeWheel.module.css";

interface Props {
    summary: LifeWheelSummary;
}

const SIZE = 320;
const CENTER = SIZE / 2;
const MAX_RADIUS = SIZE / 2 - 38; // leaves room for labels

/**
 * 8-axis radar chart of life-area goal completion.
 * Reads from `summary.byArea[id].score` (0-100) and plots each as a polygon vertex.
 */
export function LifeWheel({ summary }: Props) {
    const N = LIFE_AREAS.length;

    // Compute axis geometry once (axes are evenly spaced, starting at top, going clockwise)
    const axes = LIFE_AREAS.map((area, i) => {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / N;
        return {
            id: area.id,
            label: area.label,
            color: area.color,
            angle,
            tipX: CENTER + MAX_RADIUS * Math.cos(angle),
            tipY: CENTER + MAX_RADIUS * Math.sin(angle),
            labelX: CENTER + (MAX_RADIUS + 22) * Math.cos(angle),
            labelY: CENTER + (MAX_RADIUS + 22) * Math.sin(angle),
        };
    });

    // Polygon points for the user's data
    const dataPoints = axes.map((axis) => {
        const r = (summary.byArea[axis.id].score / 100) * MAX_RADIUS;
        return {
            x: CENTER + r * Math.cos(axis.angle),
            y: CENTER + r * Math.sin(axis.angle),
            score: summary.byArea[axis.id].score,
        };
    });
    const polygon = dataPoints.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");

    // Concentric grid rings (25%, 50%, 75%, 100%)
    const rings = [25, 50, 75, 100].map((pct) => {
        const r = (pct / 100) * MAX_RADIUS;
        const pts = axes
            .map((axis) => `${(CENTER + r * Math.cos(axis.angle)).toFixed(2)},${(CENTER + r * Math.sin(axis.angle)).toFixed(2)}`)
            .join(" ");
        return { pct, pts };
    });

    const hasAnyData = summary.activeAreas > 0;

    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <div>
                    <h2 className={styles.title}>Life Wheel</h2>
                    <p className={styles.subtitle}>
                        {hasAnyData
                            ? `${summary.activeAreas}/8 areas active · ${summary.average}% average`
                            : "8 areas · tag goals to populate"}
                    </p>
                </div>
                {hasAnyData && (
                    <div className={styles.summaryStats}>
                        <div className={styles.summaryStat}>
                            <span className={styles.summaryValue}>{summary.average}%</span>
                            <span className={styles.summaryLabel}>Balance</span>
                        </div>
                        <div className={styles.summaryStat}>
                            <span className={styles.summaryValue}>{summary.thrivingAreas}</span>
                            <span className={styles.summaryLabel}>Thriving</span>
                        </div>
                    </div>
                )}
            </header>

            <div className={styles.body}>
                <div className={styles.wheelArea}>
                    <svg
                        viewBox={`0 0 ${SIZE} ${SIZE}`}
                        className={styles.wheel}
                        role="img"
                        aria-label="Life wheel radar chart showing goal completion across 8 life areas"
                    >
                        {/* Concentric grid rings */}
                        {rings.map((ring) => (
                            <polygon
                                key={ring.pct}
                                points={ring.pts}
                                fill="none"
                                stroke="var(--color-border)"
                                strokeWidth="1"
                                opacity={ring.pct === 100 ? 0.5 : 0.25}
                            />
                        ))}

                        {/* Axis lines */}
                        {axes.map((axis) => (
                            <line
                                key={axis.id}
                                x1={CENTER}
                                y1={CENTER}
                                x2={axis.tipX}
                                y2={axis.tipY}
                                stroke="var(--color-border)"
                                strokeWidth="1"
                                opacity="0.4"
                            />
                        ))}

                        {/* Data polygon (only if there's any data) */}
                        {hasAnyData && (
                            <polygon
                                points={polygon}
                                fill="var(--color-accent)"
                                fillOpacity="0.18"
                                stroke="var(--color-accent)"
                                strokeWidth="2"
                                strokeLinejoin="round"
                            />
                        )}

                        {/* Data points */}
                        {hasAnyData &&
                            dataPoints.map((p, i) => (
                                <circle
                                    key={axes[i].id}
                                    cx={p.x}
                                    cy={p.y}
                                    r="3.5"
                                    fill={axes[i].color}
                                    stroke="var(--color-bg)"
                                    strokeWidth="1.5"
                                />
                            ))}

                        {/* Axis labels */}
                        {axes.map((axis) => (
                            <text
                                key={axis.id}
                                x={axis.labelX}
                                y={axis.labelY}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className={styles.axisLabel}
                            >
                                {axis.label}
                            </text>
                        ))}

                        {/* Center dot */}
                        <circle cx={CENTER} cy={CENTER} r="2" fill="var(--color-border-hover)" />
                    </svg>
                </div>

                <ul className={styles.areaList}>
                    {axes.map((axis) => {
                        const area = summary.byArea[axis.id];
                        const tier = tierForScore(area.score, area.total);
                        const isEmpty = area.total === 0;
                        return (
                            <li key={axis.id} className={styles.areaRow}>
                                <span
                                    className={styles.areaName}
                                    style={{ color: isEmpty ? "var(--color-text-muted)" : axis.color }}
                                >
                                    <span
                                        className={styles.dot}
                                        style={{ background: isEmpty ? "var(--color-border)" : axis.color }}
                                    />
                                    {axis.label}
                                </span>
                                <div className={styles.areaBar} aria-hidden="true">
                                    <div
                                        className={`${styles.areaFill} ${styles[`tier_${tier}`]}`}
                                        style={{ width: `${area.score}%` }}
                                    />
                                </div>
                                <span className={styles.areaScore}>
                                    {isEmpty ? (
                                        <span className={styles.areaMuted}>—</span>
                                    ) : (
                                        <>
                                            <strong>{area.completed}</strong>
                                            <span className={styles.areaMuted}>/{area.total}</span>
                                        </>
                                    )}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}