"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useDashboardStats, useGoals, useIsMounted, type Goal } from "@/lib/data";
import styles from "./page.module.css";

function AnimatedValue({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === 0) {
      setDisplay(0);
      return;
    }

    let startTime: number | null = null;
    const duration = 1500;

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.floor(value * ease));
      if (progress < 1) requestAnimationFrame(step);
      else setDisplay(value);
    }

    requestAnimationFrame(step);
  }, [value]);

  return <>{display}</>;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 5) return "Good night";
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function LandingPage() {
  const isMounted = useIsMounted();
  const stats = useDashboardStats();
  const { goals } = useGoals();
  const [greeting, setGreeting] = useState("Welcome");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  const activeGoals = useMemo(() => {
    return [...goals]
      .filter((g) => !g.completed)
      .sort((a, b) => {
        const aPinned = !!a.pinned;
        const bPinned = !!b.pinned;
        if (aPinned && !bPinned) return -1;
        if (!aPinned && bPinned) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      .slice(0, 3);
  }, [goals]);

  const sortedGoals = useMemo(() => {
    return [...goals].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      const orderA = a.customOrder || 0;
      const orderB = b.customOrder || 0;
      if (orderA !== orderB) return orderA - orderB;
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  }, [goals]);

  if (!isMounted) return <main className={styles.main} style={{ minHeight: '100vh', background: 'var(--color-bg)' }} />;

  return (
    <main className={styles.main}>
      <div className={styles.dashboardContainer}>
        {/* Hero */}
        <section className={styles.heroSection}>
          <h1 className={styles.heroTitle}>{greeting}</h1>
          <p className={styles.heroSubtitle}>
            Design a life of intention. One hundred aspirations, curated with purpose.
          </p>
        </section>

        {/* Stats */}
        <section className={styles.statsStrip}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Completion</span>
            <div className={styles.statValueGroup}>
              <span className={styles.statValue}>
                <AnimatedValue value={stats.goals.percentage} />
              </span>
              <span className={styles.statUnit}>%</span>
            </div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Realized</span>
            <div className={styles.statValueGroup}>
              <span className={styles.statValue}>
                <AnimatedValue value={stats.goals.completed} />
              </span>
              <span className={styles.statUnit}>/ 100</span>
            </div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Global</span>
            <div className={styles.statValueGroup}>
              <span className={styles.statValue}>
                <AnimatedValue value={stats.travel.countries} />
              </span>
              <span className={styles.statUnit}>Countries</span>
            </div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>China</span>
            <div className={styles.statValueGroup}>
              <span className={styles.statValue}>
                <AnimatedValue value={stats.travel.cities} />
              </span>
              <span className={styles.statUnit}>Cities</span>
            </div>
          </div>
        </section>

        {/* Current Focus */}
        <section className={styles.focusSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Current Focus</h2>
          </div>
          <div className={styles.focusList}>
            {activeGoals.length === 0 ? (
              <div className={`${styles.goalRow} ${styles.emptyState}`}>
                <span className={styles.goalContent} style={{ fontStyle: "italic", color: "var(--color-text-muted)", textAlign: "center" }}>
                  Your canvas is blank.{" "}
                  <Link href="/list100" style={{ color: "var(--color-accent)", borderBottom: "1px solid currentColor" }}>
                    Define your first aspiration →
                  </Link>
                </span>
              </div>
            ) : (
              activeGoals.map((goal, index) => (
                <div
                  key={goal.id}
                  className={styles.goalRow}
                  style={{ animation: `fadeInUp 0.5s ease-out forwards`, animationDelay: `${index * 0.1}s`, opacity: 0 }}
                >
                  <span className={styles.goalNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.goalContent}>
                    {goal.pinned && <span style={{ marginRight: 8, fontSize: 12 }}>📌</span>}
                    {goal.text}
                  </span>
                  <span className={styles.goalMeta}>{goal.tags?.[0] || "General"}</span>
                </div>
              ))
            )}
          </div>
        </section>

        {/* All Goals */}
        <section className={styles.allGoalsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>All Goals</h2>
            <Link href="/list100" className={styles.sectionLink}>
              View List <span className={styles.arrow}>→</span>
            </Link>
          </div>
          <div className={styles.allGoalsList}>
            {sortedGoals.length === 0 ? (
              <div className={`${styles.allGoalItem} ${styles.emptyState}`}>
                <span className={styles.allGoalText}>
                  No goals yet.{" "}
                  <Link href="/list100">Add your first aspiration →</Link>
                </span>
              </div>
            ) : (
              sortedGoals.map((goal, index) => (
                <div
                  key={goal.id}
                  className={`${styles.allGoalItem} ${goal.completed ? styles.completed : ""}`}
                  style={{ animation: `fadeInUp 0.4s ease-out forwards`, animationDelay: `${Math.min(index * 0.02, 0.5)}s`, opacity: 0 }}
                >
                  <span className={styles.allGoalNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.allGoalText}>
                    {goal.completed && <span className={styles.checkmark}>✓</span>}
                    {goal.text?.trim() ? goal.text : <span className={styles.emptyGoal}>Empty goal</span>}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} FutureCast. Life is a collection of moments.</p>
        </div>
      </footer>
    </main>
  );
}
