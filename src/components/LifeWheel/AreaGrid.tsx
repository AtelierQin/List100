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
