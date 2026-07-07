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

    const hasData = dataPoints.some((p) => p.score > 0);

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
                aria-label={`Life Wheel radar chart of ${LIFE_AREAS.length} life areas`}
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
                {hasData && (
                    <polygon points={polygonPoints} className={styles.dataPolygon} />
                )}

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
                            {/* Invisible hit area for accessible click target (≥ 44px) */}
                            <rect
                                x={axis.labelX - 30}
                                y={axis.labelY - 16}
                                width={60}
                                height={32}
                                fill="transparent"
                                pointerEvents="all"
                            />
                            <text
                                x={axis.labelX}
                                y={axis.labelY}
                                className={styles.labelText}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                pointerEvents="none"
                            >
                                {axis.label}
                            </text>
                            <text
                                x={axis.labelX}
                                y={axis.labelY + 14}
                                className={styles.scoreText}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                pointerEvents="none"
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