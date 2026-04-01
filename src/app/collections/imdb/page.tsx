"use client";

import { useCollectionStore } from "@/lib/data";
import imdbData from "@/data/imdb.json";
import styles from "../page.module.css";
import localStyles from "./imdb.module.css";
import React, { useMemo, useState } from "react";

export default function IMDbPage() {
    const { items, isMarked, markItem, unmarkItem, getStats } = useCollectionStore("imdb");
    const [filterGenre, setFilterGenre] = useState<string>("");
    const [filterStatus, setFilterStatus] = useState<string>("");

    // Get unique genres for the filter
    const genres = useMemo(() => {
        const genSet = new Set<string>();
        imdbData.forEach(movie => {
            if (Array.isArray(movie.genres)) {
                movie.genres.forEach(g => genSet.add(g));
            }
        });
        return Array.from(genSet).sort();
    }, []);

    const filteredMovies = useMemo(() => {
        return imdbData.filter(movie => {
            const matchesGenre = !filterGenre ||
                (Array.isArray(movie.genres) ? movie.genres.includes(filterGenre) : false);

            const marked = isMarked(movie.rank, "rank");
            const matchesStatus = !filterStatus || (filterStatus === "watched" ? marked : !marked);

            return matchesGenre && matchesStatus;
        });
    }, [filterGenre, filterStatus, items, isMarked]);

    const stats = getStats(imdbData.length);

    // Calculate Average Rating for marked movies
    const avgRating = useMemo(() => {
        if (items.length === 0) return "0.0";
        const totalRating = items.reduce((sum, item) => {
            const movie = imdbData.find(m => m.rank === item.rank);
            return sum + (movie ? movie.rating : 0);
        }, 0);
        return (totalRating / items.length).toFixed(1);
    }, [items]);

    const handleToggleMark = (movie: typeof imdbData[0]) => {
        if (isMarked(movie.rank, "rank")) {
            unmarkItem(movie.rank, "rank");
        } else {
            markItem({
                rank: movie.rank,
                title: movie.titleEn,
                director: movie.director,
                date: new Date().toISOString()
            }, "rank");
        }
    };

    return (
        <main className={styles.main}>
            <div className={localStyles.pageContainer}>
                <header className={localStyles.header}>
                    <h1 className={localStyles.title}>IMDb Top 250</h1>
                    <p className={localStyles.subtitle}>
                        Top Rated Movies as Voted by IMDb Users.
                    </p>

                    <div className={localStyles.stats}>
                        <span>Progress: {stats.percentage}%</span>
                        <span>({stats.marked} / {stats.total} Watched)</span>
                        <span className={localStyles.divider}>|</span>
                        <span>Avg Rating: ★ {avgRating}</span>
                    </div>

                    <div className={localStyles.filters}>
                        <select
                            value={filterGenre}
                            onChange={e => setFilterGenre(e.target.value)}
                            className={localStyles.select}
                        >
                            <option value="">All Genres</option>
                            {genres.map(g => <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>)}
                        </select>

                        <select
                            value={filterStatus}
                            onChange={e => setFilterStatus(e.target.value)}
                            className={localStyles.select}
                        >
                            <option value="">All Statuses</option>
                            <option value="watched">Watched</option>
                            <option value="unwatched">Not Watched</option>
                        </select>
                    </div>
                </header>

                <div className={localStyles.grid}>
                    {filteredMovies.map(movie => {
                        const marked = isMarked(movie.rank, "rank");
                        return (
                            <div
                                key={movie.rank}
                                className={`${localStyles.card} ${marked ? localStyles.marked : ""}`}
                                onClick={() => handleToggleMark(movie)}
                            >
                                <div className={localStyles.rankNum}>#{movie.rank}</div>
                                <div className={localStyles.cardContent}>
                                    <h3 className={localStyles.movieTitle}>
                                        {movie.titleEn}
                                        <span className={localStyles.titleCn}>{movie.titleCn}</span>
                                    </h3>
                                    <div className={localStyles.meta}>
                                        <span>{movie.year}</span>
                                        <span>★ {movie.rating}</span>
                                        <span>{movie.director}</span>
                                    </div>
                                    <div className={localStyles.tags}>
                                        {movie.genres.map(g => (
                                            <span key={g} className={localStyles.tag}>{g}</span>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    className={localStyles.actionBtn}
                                    onClick={(e) => { e.stopPropagation(); handleToggleMark(movie); }}
                                >
                                    {marked ? "Watched" : "Mark Watched"}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {filteredMovies.length === 0 && (
                    <div className={localStyles.empty}>
                        No movies match your filters.
                    </div>
                )}
            </div>
        </main>
    );
}
