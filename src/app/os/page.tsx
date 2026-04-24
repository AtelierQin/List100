"use client";

import styles from "./page.module.css";
import React, { useState } from "react";
import { useGoals, useDashboardStats } from "@/lib/data";
import Link from "next/link";

export default function OSPage() {
    const [importStatus, setImportStatus] = useState<string>("");
    const { goals } = useGoals();
    const stats = useDashboardStats();

    // Export all localStorage data
    const handleExportData = () => {
        try {
            const data: Record<string, string> = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key) {
                    data[key] = localStorage.getItem(key) || "";
                }
            }

            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
            const downloadAnchorNode = document.createElement("a");
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", `list100_backup_${new Date().toISOString().split("T")[0]}.json`);
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        } catch (error) {
            console.error("Failed to export data", error);
        }
    };

    // Import localStorage data
    const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                const data = JSON.parse(content);
                const toImport: Record<string, string> = {};

                const migrateGoals = (items: unknown[]) => {
                    return items.map(item => {
                        const obj = item as Record<string, unknown>;
                        return {
                            ...obj,
                            id: String(obj.id),
                            milestones: obj.milestones || [],
                            habits: obj.habits || []
                        };
                    });
                };

                const mapLegacyKey = (key: string) => {
                    if (key === "list100-items") return "list100-items";
                    if (key === "travel-visited-countries") return "visited_world";
                    if (key === "china-visited-cities") return "china-visited-cities-v2";
                    return key;
                };

                // Case 1: Legacy format with top-level "items" array (List100 backup)
                if (data.items && Array.isArray(data.items)) {
                    toImport["list100-items"] = JSON.stringify(migrateGoals(data.items));
                    // Also merge other keys if present
                    Object.keys(data).forEach(key => {
                        if (key !== "items") {
                            const newKey = mapLegacyKey(key);
                            toImport[newKey] = typeof data[key] === "string" ? data[key] : JSON.stringify(data[key]);
                        }
                    });
                }
                // Case 2: Legacy DataStore format (namespace/data wrapper)
                else if (data.data && typeof data.data === "object" && data.namespace) {
                    const prefix = `list100_${data.namespace}_`;
                    Object.entries(data.data).forEach(([key, value]) => {
                        const finalKey = mapLegacyKey(prefix + key);
                        toImport[finalKey] = typeof value === "string" ? value : JSON.stringify(value);
                    });
                }
                // Case 3: Pure array (legacy list100-items direct export)
                else if (Array.isArray(data)) {
                    toImport["list100-items"] = JSON.stringify(migrateGoals(data));
                }
                // Case 4: Standard flat object or new backup format
                else if (typeof data === "object" && data !== null) {
                    Object.keys(data).forEach(key => {
                        const newKey = mapLegacyKey(key);
                        let val = data[key];
                        if (newKey === "list100-items" && Array.isArray(val)) {
                            val = migrateGoals(val);
                        }
                        toImport[newKey] = typeof val === "string" ? val : JSON.stringify(val);
                    });
                } else {
                    throw new Error("Invalid backup format");
                }

                // Perform the actual import
                Object.entries(toImport).forEach(([key, value]) => {
                    localStorage.setItem(key, value);
                });

                setImportStatus("Data imported successfully! Refreshing...");
                setTimeout(() => window.location.reload(), 1500);
            } catch (error) {
                console.error("Failed to parse or import data", error);
                setImportStatus("Failed to import data. Invalid format.");
            }
            event.target.value = "";
        };
        reader.readAsText(file);
    };

    const handleClearData = () => {
        if (window.confirm("Are you sure you want to clear ALL your progress? This cannot be undone unless you have a backup.")) {
            localStorage.clear();
            setImportStatus("All data cleared! Refreshing...");
            setTimeout(() => window.location.reload(), 1500);
        }
    };

    // Prepare timeline data
    const allMilestones = goals.flatMap(g =>
        (g.milestones || [])
            .filter(m => m.dueDate)
            .map(m => ({ ...m, goalText: g.text, goalId: g.id }))
    );

    const groupedByYear = allMilestones.reduce((acc, m) => {
        const year = new Date(m.dueDate!).getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(m);
        return acc;
    }, {} as Record<number, typeof allMilestones>);

    const sortedYears = Object.keys(groupedByYear).map(Number).sort((a, b) => b - a);

    Object.values(groupedByYear).forEach(list =>
        list.sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    );

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>OS Dashboard</h1>
                    <p className={styles.subtitle}>System overview, goals tracking, and data management.</p>
                </header>

                <section className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{stats.goals.total}</div>
                        <div className={styles.statLabel}>Total Goals</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{stats.goals.active}</div>
                        <div className={styles.statLabel}>Active</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{stats.goals.completed}</div>
                        <div className={styles.statLabel}>Completed</div>
                    </div>
                    <div className={`${styles.statCard} ${styles.highlightCard}`}>
                        <div className={styles.statValue}>{stats.goals.percentage}%</div>
                        <div className={styles.statLabel}>Completion Rate</div>
                    </div>
                </section>

                <section className={styles.timelineSection}>
                    <h2 className={styles.sectionTitle}>Yearly Roadmap</h2>
                    {sortedYears.length > 0 ? (
                        <div className={styles.timelineYears}>
                            {sortedYears.map(year => (
                                <div key={year} className={styles.yearGroup}>
                                    <h3 className={styles.yearLabel}>{year}</h3>
                                    <div className={styles.yearMilestones}>
                                        {groupedByYear[year].map(ms => (
                                            <div key={`${ms.goalId}-${ms.id}`} className={styles.timelineItem}>
                                                <div className={`${styles.timelineDot} ${ms.completed ? styles.completedGroup : ""}`} />
                                                <div className={styles.timelineDate}>
                                                    {new Date(ms.dueDate!).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                </div>
                                                <div className={`${styles.timelineText} ${ms.completed ? styles.completedGroup : ""}`}>
                                                    <Link href={`/list100/${ms.goalId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                        <strong>{ms.goalText}</strong>: {ms.text}
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyTimeline}>No tracking data available yet. Add milestones with due dates to your goals!</div>
                    )}
                </section>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Data Management</h2>
                    <p className={styles.sectionDesc}>
                        Your progress in List100 is saved entirely in your browser&apos;s local storage.
                        It is recommended to periodically back up your data.
                    </p>

                    <div className={styles.actions}>
                        <div className={styles.actionGroup}>
                            <div className={styles.actionInfo}>
                                <h3>Export Backup</h3>
                                <p>Save a JSON file containing all your marked progress across all collections.</p>
                            </div>
                            <button className={styles.btn} onClick={handleExportData}>Download Backup</button>
                        </div>

                        <div className={styles.actionGroup}>
                            <div className={styles.actionInfo}>
                                <h3>Import Backup</h3>
                                <p>Restore your progress from a previously saved JSON backup file.</p>
                            </div>
                            <div>
                                <input
                                    type="file"
                                    id="import-file"
                                    accept=".json"
                                    style={{ display: "none" }}
                                    onChange={handleImportData}
                                />
                                <label htmlFor="import-file" className={styles.btn}>Select Backup File</label>
                            </div>
                        </div>

                        <div className={styles.actionGroup}>
                            <div className={styles.actionInfo}>
                                <h3 className={styles.dangerText}>Danger Zone</h3>
                                <p>Permanently delete all local progress data.</p>
                            </div>
                            <button className={`${styles.btn} ${styles.btnDanger}`} onClick={handleClearData}>Clear All Data</button>
                        </div>
                    </div>

                    {importStatus && (
                        <div className={`${styles.statusMsg} ${importStatus.includes("Failed") ? styles.errorMsg : styles.successMsg}`}>
                            {importStatus}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
