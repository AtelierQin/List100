"use client";

import { useCollectionStore } from "@/lib/data";
import dg120Data from "@/data/dg120.json";
import styles from "../page.module.css";
import localStyles from "./dg120.module.css";
import React, { useMemo, useState } from "react";

export default function DG120Page() {
    const { isMarked, markItem, unmarkItem, getStats } = useCollectionStore("dg120");
    const [filterCategory, setFilterCategory] = useState<string>("");
    const [filterStatus, setFilterStatus] = useState<string>("");

    // Get unique categories for the filter
    const categories = useMemo(() => {
        const catSet = new Set<string>();
        dg120Data.forEach(album => {
            if (Array.isArray(album.category)) {
                album.category.forEach(c => catSet.add(c));
            } else if (typeof album.category === "string") {
                catSet.add(album.category);
            }
        });
        return Array.from(catSet).sort();
    }, []);

    const filteredAlbums = useMemo(() => {
        return dg120Data.filter(album => {
            const matchesCat = !filterCategory ||
                (Array.isArray(album.category) ? album.category.includes(filterCategory) : album.category === filterCategory);

            const marked = isMarked(album.disc, "disc");
            const matchesStatus = !filterStatus || (filterStatus === "listened" ? marked : !marked);

            return matchesCat && matchesStatus;
        });
    }, [filterCategory, filterStatus, isMarked]); // depend on items to re-render when marked status changes

    const stats = getStats(dg120Data.length);

    const handleToggleMark = (album: typeof dg120Data[0]) => {
        if (isMarked(album.disc, "disc")) {
            unmarkItem(album.disc, "disc");
        } else {
            markItem({
                disc: album.disc,
                title: album.title,
                artists: album.artists,
                date: new Date().toISOString()
            }, "disc");
        }
    };

    return (
        <main className={styles.main}>
            <div className={localStyles.pageContainer}>
                <header className={localStyles.header}>
                    <h1 className={localStyles.title}>DG 120</h1>
                    <p className={localStyles.subtitle}>
                        Deutsche Grammophon&apos;s 120 essential classical recordings.
                    </p>

                    <div className={localStyles.stats}>
                        <span>Progress: {stats.percentage}%</span>
                        <span>({stats.marked} / {stats.total} Listened)</span>
                    </div>

                    <div className={localStyles.filters}>
                        <select
                            value={filterCategory}
                            onChange={e => setFilterCategory(e.target.value)}
                            className={localStyles.select}
                        >
                            <option value="">All Categories</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>

                        <select
                            value={filterStatus}
                            onChange={e => setFilterStatus(e.target.value)}
                            className={localStyles.select}
                        >
                            <option value="">All Statuses</option>
                            <option value="listened">Listened</option>
                            <option value="unlistened">Unlistened</option>
                        </select>
                    </div>
                </header>

                <div className={localStyles.grid}>
                    {filteredAlbums.map(album => {
                        const marked = isMarked(album.disc, "disc");
                        return (
                            <div
                                key={album.disc}
                                className={`${localStyles.card} ${marked ? localStyles.marked : ""}`}
                                onClick={() => handleToggleMark(album)}
                            >
                                <div className={localStyles.discNum}>CD {album.disc}</div>
                                <div className={localStyles.cardContent}>
                                    <h3 className={localStyles.albumTitle}>{album.title}</h3>
                                    <p className={localStyles.artists}>{album.artists}</p>
                                    <div className={localStyles.tags}>
                                        <span className={localStyles.tag}>{album.period}</span>
                                        <span className={localStyles.tag}>{album.format}</span>
                                    </div>
                                    <button
                                        className={localStyles.actionBtn}
                                        onClick={(e) => { e.stopPropagation(); handleToggleMark(album); }}
                                    >
                                        {marked ? "Listened" : "Mark Listened"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredAlbums.length === 0 && (
                    <div className={localStyles.empty}>
                        No albums match your filters.
                    </div>
                )}
            </div>
        </main>
    );
}
