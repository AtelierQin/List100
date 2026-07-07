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
