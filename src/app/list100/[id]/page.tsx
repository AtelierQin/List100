"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useGoals, useIsMounted, type Goal } from "@/lib/data";
import styles from "./page.module.css";

export default function GoalDetailPage() {
    const isMounted = useIsMounted();
    const params = useParams();
    const router = useRouter();
    const { goals, setGoals } = useGoals();
    const goalId = params.id as string;

    const [activeTab, setActiveTab] = useState<"overview" | "plan" | "journal">("overview");
    const [msInput, setMsInput] = useState("");
    const [msDate, setMsDate] = useState("");
    const [habitInput, setHabitInput] = useState("");

    const goal = goals.find((g) => g.id === goalId);

    if (!isMounted) return <main className={styles.main} style={{ minHeight: '100vh', background: 'var(--color-bg)' }} />;

    if (!goal) {
        return (
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.notFound}>
                        <h1>Goal Not Found</h1>
                        <p>This goal doesn&apos;t exist or has been deleted.</p>
                        <Link href="/list100" className={styles.backLink}>← Back to List</Link>
                    </div>
                </div>
            </main>
        );
    }

    const updateGoal = (updates: Partial<Goal>) => {
        setGoals((prev) =>
            prev.map((g) =>
                g.id === goalId ? { ...g, ...updates, updatedAt: new Date().toISOString() } : g
            )
        );
    };

    const addMilestone = () => {
        if (!msInput.trim()) return;
        const newMs = { id: Date.now().toString(), text: msInput, dueDate: msDate, completed: false };
        updateGoal({ milestones: [...(goal.milestones || []), newMs] });
        setMsInput("");
        setMsDate("");
    };

    const toggleMilestone = (id: string) => {
        const ms = (goal.milestones || []).map(m => m.id === id ? { ...m, completed: !m.completed } : m);
        updateGoal({ milestones: ms });
    };

    const addHabit = () => {
        if (!habitInput.trim()) return;
        const newHabit = { id: Date.now().toString(), title: habitInput, frequency: "daily" as const, completedDates: [] };
        updateGoal({ habits: [...(goal.habits || []), newHabit] });
        setHabitInput("");
    };

    const toggleHabitDate = (habitId: string) => {
        const today = new Date().toISOString().split("T")[0];
        const habits = (goal.habits || []).map(h => {
            if (h.id === habitId) {
                const dates = h.completedDates || [];
                const newDates = dates.includes(today) ? dates.filter(d => d !== today) : [...dates, today];
                return { ...h, completedDates: newDates };
            }
            return h;
        });
        updateGoal({ habits });
    };

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <Link href="/list100" className={styles.backLink}>
                    ← Back to List
                </Link>

                <div className={styles.goalCard}>
                    <div className={styles.goalHeader}>
                        <div
                            className={`${styles.statusDot} ${goal.completed ? styles.completed : ""}`}
                            onClick={() => updateGoal({ completed: !goal.completed, completedAt: !goal.completed ? new Date().toISOString() : undefined })}
                        />
                        <input
                            type="text"
                            className={styles.goalTitle}
                            value={goal.text}
                            placeholder="What do you want to achieve?"
                            onChange={(e) => updateGoal({ text: e.target.value })}
                        />
                    </div>

                    <div className={styles.tabs}>
                        <button className={`${styles.tabBtn} ${activeTab === "overview" ? styles.active : ""}`} onClick={() => setActiveTab("overview")}>Overview</button>
                        <button className={`${styles.tabBtn} ${activeTab === "plan" ? styles.active : ""}`} onClick={() => setActiveTab("plan")}>Plan</button>
                        <button className={`${styles.tabBtn} ${activeTab === "journal" ? styles.active : ""}`} onClick={() => setActiveTab("journal")}>Journal</button>
                    </div>

                    {activeTab === "overview" && (
                        <div className={styles.tabContent}>
                            <h3 className={styles.sectionTitle}>Description</h3>
                            <textarea
                                className={styles.goalDescription}
                                value={goal.description || ""}
                                placeholder="Describe this goal in detail..."
                                rows={4}
                                onChange={(e) => updateGoal({ description: e.target.value })}
                            />

                            <div className={styles.metaSection}>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Created</span>
                                    <span className={styles.metaValue}>{new Date(goal.createdAt).toLocaleDateString()}</span>
                                </div>
                                {goal.completedAt && (
                                    <div className={styles.metaItem}>
                                        <span className={styles.metaLabel}>Completed</span>
                                        <span className={styles.metaValue}>{new Date(goal.completedAt).toLocaleDateString()}</span>
                                    </div>
                                )}
                                {goal.tags && goal.tags.length > 0 && (
                                    <div className={styles.metaItem}>
                                        <span className={styles.metaLabel}>Tags</span>
                                        <span className={styles.metaValue}>{goal.tags.join(", ")}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "plan" && (
                        <div className={styles.tabContent}>
                            <h3 className={styles.sectionTitle}>Milestones</h3>
                            <div className={styles.list}>
                                {(goal.milestones || []).map((ms) => (
                                    <div key={ms.id} className={styles.listItem}>
                                        <div className={`${styles.itemCheckbox} ${ms.completed ? styles.completed : ""}`} onClick={() => toggleMilestone(ms.id)} />
                                        <span className={`${styles.itemText} ${ms.completed ? styles.completed : ""}`}>{ms.text}</span>
                                        {ms.dueDate && <span className={styles.itemMeta}>{ms.dueDate}</span>}
                                    </div>
                                ))}
                                <div className={styles.addInputGroup}>
                                    <input type="text" className={styles.inputField} placeholder="Add a milestone..." value={msInput} onChange={(e) => setMsInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addMilestone()} />
                                    <input type="date" className={styles.inputField} style={{ flex: '0 0 130px' }} value={msDate} onChange={(e) => setMsDate(e.target.value)} />
                                    <button className={styles.addBtn} onClick={addMilestone}>Add</button>
                                </div>
                            </div>

                            <h3 className={styles.sectionTitle} style={{ marginTop: '32px' }}>Habits & Routines</h3>
                            <div className={styles.list}>
                                {(goal.habits || []).map((h) => {
                                    const today = new Date().toISOString().split("T")[0];
                                    const isDoneToday = (h.completedDates || []).includes(today);
                                    return (
                                        <div key={h.id} className={styles.listItem}>
                                            <div className={`${styles.itemCheckbox} ${isDoneToday ? styles.completed : ""}`} onClick={() => toggleHabitDate(h.id)} />
                                            <span className={`${styles.itemText} ${isDoneToday ? styles.completed : ""}`}>{h.title}</span>
                                            <span className={styles.itemMeta}>Streak: {h.completedDates?.length || 0}</span>
                                        </div>
                                    );
                                })}
                                <div className={styles.addInputGroup}>
                                    <input type="text" className={styles.inputField} placeholder="Add a daily habit..." value={habitInput} onChange={(e) => setHabitInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addHabit()} />
                                    <button className={styles.addBtn} onClick={addHabit}>Add Habit</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "journal" && (
                        <div className={styles.tabContent}>
                            <h3 className={styles.sectionTitle}>Notes & Progress</h3>
                            <textarea
                                className={styles.goalNotes}
                                value={goal.notes || ""}
                                placeholder="Add notes, progress updates, or reflections..."
                                rows={8}
                                onChange={(e) => updateGoal({ notes: e.target.value })}
                            />
                        </div>
                    )}

                    <div className={styles.actions} style={{ marginTop: '24px' }}>
                        <button
                            className={styles.deleteBtn}
                            onClick={() => {
                                if (confirm("Are you sure you want to delete this goal?")) {
                                    setGoals((prev) => prev.filter((g) => g.id !== goalId));
                                    router.push("/list100");
                                }
                            }}
                        >
                            Delete Goal
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
