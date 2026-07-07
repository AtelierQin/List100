"use client";

import Link from "next/link";
import { LIFE_AREAS, type LifeAreaId } from "@/lib/constants";
import type { LifeAreaScore } from "@/lib/lifeWheel";
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
                const isComplete = score.total > 0 && score.score === 100;
                const cardStyle = { "--area-color": area.color } as React.CSSProperties;

                const body = (
                    <>
                        <span className={styles.accent} aria-hidden="true" />
                        <span className={styles.label}>
                            {area.label}
                            {isComplete && <span className={styles.spark} aria-label="completed">✦</span>}
                        </span>
                        <span className={styles.percentage}>
                            {score.total === 0 ? "—" : `${score.score}%`}
                        </span>
                        <div
                            className={styles.bar}
                            role="progressbar"
                            aria-valuenow={score.score}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={
                                score.total === 0
                                    ? `${area.label} completion: no goals yet`
                                    : `${area.label} completion: ${score.score}%`
                            }
                        >
                            <span
                                className={styles.barFill}
                                style={{ width: `${score.score}%` }}
                                aria-hidden="true"
                            />
                        </div>
                        <span className={styles.meta}>
                            {score.total === 0 ? (
                                <span className={styles.addLink}>+ Add goal</span>
                            ) : (
                                <>
                                    {score.completed}/{score.total} done
                                    {score.pending > 0 && (
                                        <span className={styles.pending}> · {score.pending} to go</span>
                                    )}
                                </>
                            )}
                        </span>
                    </>
                );

                if (score.total === 0) {
                    return (
                        <Link
                            key={area.id}
                            href="/list100"
                            className={styles.card}
                            style={cardStyle}
                        >
                            {body}
                        </Link>
                    );
                }

                return (
                    <button
                        key={area.id}
                        type="button"
                        className={styles.card}
                        onClick={() => onAreaClick?.(area.id)}
                        style={cardStyle}
                    >
                        {body}
                    </button>
                );
            })}
        </div>
    );
}
