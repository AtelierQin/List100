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
