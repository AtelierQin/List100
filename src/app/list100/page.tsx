"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import { useGoals, useIsMounted, type Goal } from "@/lib/data";
import styles from "./page.module.css";

const TAG_COLORS: Record<string, { bg: string; color: string; border: string }> = {
    Travel: { bg: "rgba(59, 130, 246, 0.1)", color: "#60a5fa", border: "rgba(59, 130, 246, 0.3)" },
    Career: { bg: "rgba(245, 158, 11, 0.1)", color: "#fbbf24", border: "rgba(245, 158, 11, 0.3)" },
    Health: { bg: "rgba(16, 185, 129, 0.1)", color: "#34d399", border: "rgba(16, 185, 129, 0.3)" },
    Learning: { bg: "rgba(168, 85, 247, 0.1)", color: "#c084fc", border: "rgba(168, 85, 247, 0.3)" },
    Finance: { bg: "rgba(239, 68, 68, 0.1)", color: "#f87171", border: "rgba(239, 68, 68, 0.3)" },
    Social: { bg: "rgba(236, 72, 153, 0.1)", color: "#f472b6", border: "rgba(236, 72, 153, 0.3)" },
    Creative: { bg: "rgba(251, 146, 60, 0.1)", color: "#fb923c", border: "rgba(251, 146, 60, 0.3)" },
    Personal: { bg: "rgba(99, 102, 241, 0.1)", color: "#818cf8", border: "rgba(99, 102, 241, 0.3)" },
};

function getTagColor(tag: string) {
    return TAG_COLORS[tag] || { bg: "rgba(255, 255, 255, 0.05)", color: "#a1a1aa", border: "rgba(255, 255, 255, 0.1)" };
}

function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export default function List100Page() {
    const isMounted = useIsMounted();
    const { goals, setGoals } = useGoals();
    const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
    const [tagFilter, setTagFilter] = useState("");
    const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // All unique tags
    const allTags = useMemo(() => {
        const tagMap = new Map<string, number>();
        goals.forEach((g) => g.tags?.forEach((t) => tagMap.set(t, (tagMap.get(t) || 0) + 1)));
        return Array.from(tagMap.entries()).sort((a, b) => b[1] - a[1]);
    }, [goals]);

    // Filtered items
    const filteredGoals = useMemo(() => {
        let items = [...goals];

        // Status filter
        if (filter === "pending") items = items.filter((g) => !g.completed);
        else if (filter === "completed") items = items.filter((g) => g.completed);

        // Tag filter
        if (tagFilter) items = items.filter((g) => g.tags?.includes(tagFilter));

        // Sort: pinned first, then customOrder, then createdAt
        items.sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            const orderA = a.customOrder || 0;
            const orderB = b.customOrder || 0;
            if (orderA !== orderB) return orderA - orderB;
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });

        return items;
    }, [goals, filter, tagFilter]);

    const completedCount = goals.filter((g) => g.completed).length;

    const showToast = useCallback((message: string, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }, []);

    const addItem = useCallback(() => {
        const newGoal: Goal = {
            id: generateId(),
            text: "",
            description: "",
            tags: [],
            completed: false,
            createdAt: new Date().toISOString(),
        };
        setGoals((prev) => [...prev, newGoal]);
        showToast("New goal added");
    }, [setGoals, showToast]);

    const deleteItem = useCallback(
        (id: string) => {
            setGoals((prev) => prev.filter((g) => g.id !== id));
            showToast("Goal deleted", "info");
        },
        [setGoals, showToast]
    );

    const toggleComplete = useCallback(
        (id: string) => {
            setGoals((prev) =>
                prev.map((g) =>
                    g.id === id
                        ? {
                            ...g,
                            completed: !g.completed,
                            completedAt: !g.completed ? new Date().toISOString() : undefined,
                        }
                        : g
                )
            );
        },
        [setGoals]
    );

    const updateText = useCallback(
        (id: string, text: string) => {
            setGoals((prev) =>
                prev.map((g) => (g.id === id ? { ...g, text, updatedAt: new Date().toISOString() } : g))
            );
        },
        [setGoals]
    );

    const updateDescription = useCallback(
        (id: string, description: string) => {
            setGoals((prev) =>
                prev.map((g) => (g.id === id ? { ...g, description, updatedAt: new Date().toISOString() } : g))
            );
        },
        [setGoals]
    );

    const updateTags = useCallback(
        (id: string, tagsString: string) => {
            const tags = tagsString
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean);
            setGoals((prev) =>
                prev.map((g) => (g.id === id ? { ...g, tags, updatedAt: new Date().toISOString() } : g))
            );
        },
        [setGoals]
    );

    const togglePin = useCallback(
        (id: string) => {
            setGoals((prev) =>
                prev.map((g) => (g.id === id ? { ...g, pinned: !g.pinned } : g))
            );
        },
        [setGoals]
    );

    const exportData = useCallback(() => {
        const data = JSON.stringify(goals, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `list100-backup-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast("Data exported successfully");
    }, [goals, showToast]);

    const importData = useCallback(
        (file: File) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target?.result as string);
                    if (Array.isArray(data)) {
                        setGoals(data);
                        showToast(`Imported ${data.length} goals`);
                    } else {
                        showToast("Invalid data format", "error");
                    }
                } catch {
                    showToast("Failed to parse file", "error");
                }
            };
            reader.readAsText(file);
        },
        [setGoals, showToast]
    );

    if (!isMounted) return <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }} />;

    return (
        <>
            {/* Motto */}
            <section className={styles.mottoSection}>
                <div className={styles.container}>
                    <div className={styles.mottoContent}>
                        <p className={styles.mottoText}>
                            Life is like a box of chocolates, and I&apos;ve chosen 100 to taste.
                        </p>
                    </div>
                </div>
            </section>

            <main className={styles.mainContent}>
                <div className={styles.container}>
                    <div className={styles.layout}>
                        {/* Sidebar */}
                        <aside className={styles.sidebar}>
                            <section className={styles.hero}>
                                <h1>Life List</h1>
                                <p className={styles.heroSubtitle}>
                                    100 things I want to do before I die.<br />
                                    Track your life goals
                                </p>
                            </section>

                            <section className={styles.controlsSection}>
                                <button className={styles.btnPrimary} onClick={addItem}>
                                    <span className={styles.btnIcon}>+</span> Add Goal
                                </button>

                                {/* Status Filter */}
                                <div className={styles.filterSection}>
                                    <h3>Status</h3>
                                    <div className={styles.filterTabs}>
                                        {(["all", "pending", "completed"] as const).map((f) => (
                                            <button
                                                key={f}
                                                className={`${styles.filterTab} ${filter === f ? styles.filterTabActive : ""}`}
                                                onClick={() => setFilter(f)}
                                            >
                                                {f === "all" ? "All" : f === "pending" ? "Active" : "Done"}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Tag Filter */}
                                <div className={styles.tagFilterSection}>
                                    <h3>Tags</h3>
                                    <div className={styles.tagFilterList}>
                                        <button
                                            className={`${styles.tagFilterItem} ${tagFilter === "" ? styles.tagFilterItemActive : ""}`}
                                            onClick={() => setTagFilter("")}
                                        >
                                            <span className={styles.tagName}>All Tags</span>
                                        </button>
                                        {allTags.map(([tag, count]) => (
                                            <button
                                                key={tag}
                                                className={`${styles.tagFilterItem} ${tagFilter === tag ? styles.tagFilterItemActive : ""}`}
                                                onClick={() => setTagFilter(tag)}
                                            >
                                                <span className={styles.tagName}>{tag}</span>
                                                <span className={styles.tagCount}>{count}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Backup & Sync */}
                                <div className={styles.syncSection}>
                                    <h3>Backup & Sync</h3>
                                    <div className={styles.backupStatus}>
                                        <small>Goals: {goals.length} | Done: {completedCount}</small>
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".json"
                                        style={{ display: "none" }}
                                        onChange={(e) => e.target.files?.[0] && importData(e.target.files[0])}
                                    />
                                    <button className={styles.btnSecondary} onClick={() => fileInputRef.current?.click()}>
                                        Import Data
                                    </button>
                                    <button className={styles.btnSecondary} onClick={exportData}>
                                        Export Backup
                                    </button>
                                </div>
                            </section>
                        </aside>

                        {/* Content */}
                        <section className={styles.content}>
                            <div className={styles.listContainer}>
                                {/* Progress in navbar area */}
                                <div className={styles.navStats}>
                                    <span className={styles.progressCounter}>
                                        {completedCount} / {goals.length}
                                    </span>
                                    <div className={styles.progressBar}>
                                        <div
                                            className={styles.progressFill}
                                            style={{
                                                width: `${goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                <ul className={styles.todoList}>
                                    {filteredGoals.length === 0 ? (
                                        <li className={styles.emptyState}>
                                            <div className={styles.emptyStateIcon}>🎯</div>
                                            <h3>No goals yet</h3>
                                            <p>Start by adding your first life goal</p>
                                            <button className={styles.btnPrimary} onClick={addItem}>
                                                <span className={styles.btnIcon}>+</span> Add Goal
                                            </button>
                                        </li>
                                    ) : (
                                        filteredGoals.map((goal, index) => (
                                            <TodoItem
                                                key={goal.id}
                                                goal={goal}
                                                number={index + 1}
                                                onToggleComplete={toggleComplete}
                                                onUpdateText={updateText}
                                                onUpdateDescription={updateDescription}
                                                onUpdateTags={updateTags}
                                                onTogglePin={togglePin}
                                                onDelete={deleteItem}
                                            />
                                        ))
                                    )}
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* Toast */}
            {toast && (
                <div className={`${styles.toast} ${styles[`toast${toast.type.charAt(0).toUpperCase() + toast.type.slice(1)}`] || ""}`}>
                    {toast.message}
                </div>
            )}
        </>
    );
}

// ==================== Todo Item Component ====================

function TodoItem({
    goal,
    number,
    onToggleComplete,
    onUpdateText,
    onUpdateDescription,
    onUpdateTags,
    onTogglePin,
    onDelete,
}: {
    goal: Goal;
    number: number;
    onToggleComplete: (id: string) => void;
    onUpdateText: (id: string, text: string) => void;
    onUpdateDescription: (id: string, desc: string) => void;
    onUpdateTags: (id: string, tags: string) => void;
    onTogglePin: (id: string) => void;
    onDelete: (id: string) => void;
}) {
    const [showTagInput, setShowTagInput] = useState(false);

    return (
        <li className={`${styles.todoItem} ${goal.pinned ? styles.pinned : ""}`}>
            <span className={styles.dragHandle}>⋮⋮</span>
            <span className={styles.todoNumber}>{String(number).padStart(2, "0")}</span>
            <div
                className={`${styles.todoCheckbox} ${goal.completed ? styles.checked : ""}`}
                onClick={() => onToggleComplete(goal.id)}
            />
            <div className={styles.todoContent}>
                <input
                    className={styles.todoText}
                    type="text"
                    value={goal.text}
                    placeholder="What do you want to achieve?"
                    onChange={(e) => onUpdateText(goal.id, e.target.value)}
                />
                <input
                    className={styles.todoDescription}
                    type="text"
                    value={goal.description || ""}
                    placeholder="Add a description..."
                    onChange={(e) => onUpdateDescription(goal.id, e.target.value)}
                />
                <div className={styles.tagsSection}>
                    <div className={styles.tagsDisplay}>
                        {goal.tags?.map((tag) => {
                            const color = getTagColor(tag);
                            return (
                                <span
                                    key={tag}
                                    className={styles.tag}
                                    style={{ background: color.bg, color: color.color, borderColor: color.border }}
                                    onClick={() => setShowTagInput(true)}
                                >
                                    {tag}
                                </span>
                            );
                        })}
                        {!showTagInput && (
                            <button className={styles.addTagBtn} onClick={() => setShowTagInput(true)}>
                                + tag
                            </button>
                        )}
                    </div>
                    {showTagInput && (
                        <input
                            className={styles.todoTags}
                            type="text"
                            value={goal.tags?.join(", ") || ""}
                            placeholder="Add tags (comma separated)"
                            autoFocus
                            onChange={(e) => onUpdateTags(goal.id, e.target.value)}
                            onBlur={() => setShowTagInput(false)}
                            onKeyDown={(e) => e.key === "Enter" && setShowTagInput(false)}
                        />
                    )}
                </div>
            </div>
            <div className={styles.itemActions}>
                <Link href={`/list100/${goal.id}`} className={styles.goalLink} title="View details">
                    📋
                </Link>
                <button
                    className={`${styles.pinBtn} ${goal.pinned ? styles.pinBtnPinned : ""}`}
                    onClick={() => onTogglePin(goal.id)}
                    title={goal.pinned ? "Unpin" : "Pin"}
                >
                    📌
                </button>
                <button className={styles.deleteBtn} onClick={() => onDelete(goal.id)} title="Delete">
                    ×
                </button>
            </div>
        </li>
    );
}
