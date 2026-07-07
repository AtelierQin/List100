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
