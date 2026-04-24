"use client";

import { useCollectionStore } from "@/lib/data";
import booksData from "@/data/books.json";
import styles from "../page.module.css";
import localStyles from "./books.module.css";
import React, { useMemo, useState } from "react";

export default function BooksPage() {
    const { isMarked, markItem, unmarkItem, getStats } = useCollectionStore("books");
    const [filterCategory, setFilterCategory] = useState<string>("");
    const [filterStatus, setFilterStatus] = useState<string>("");

    // Get unique categories for the filter
    const categories = useMemo(() => {
        const catSet = new Set<string>();
        booksData.forEach(book => {
            if (book.category) {
                catSet.add(book.category);
            }
        });
        return Array.from(catSet).sort();
    }, []);

    const filteredBooks = useMemo(() => {
        return booksData.filter(book => {
            const matchesCategory = !filterCategory || book.category === filterCategory;

            const marked = isMarked(book.number, "number");
            const matchesStatus = !filterStatus || (filterStatus === "read" ? marked : !marked);

            return matchesCategory && matchesStatus;
        });
    }, [filterCategory, filterStatus, isMarked]);

    const stats = getStats(booksData.length);

    const handleToggleMark = (book: typeof booksData[0]) => {
        if (isMarked(book.number, "number")) {
            unmarkItem(book.number, "number");
        } else {
            markItem({
                number: book.number,
                title: book.title,
                author: book.author,
                date: new Date().toISOString()
            }, "number");
        }
    };

    return (
        <main className={styles.main}>
            <div className={localStyles.pageContainer}>
                <header className={localStyles.header}>
                    <h1 className={localStyles.title}>THU Book List</h1>
                    <p className={localStyles.subtitle}>
                        Tsinghua University recommended reading list for students.
                    </p>

                    <div className={localStyles.stats}>
                        <span>Progress: {stats.percentage}%</span>
                        <span>({stats.marked} / {stats.total} Read)</span>
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
                            <option value="read">Read</option>
                            <option value="unread">Unread</option>
                        </select>
                    </div>
                </header>

                <div className={localStyles.grid}>
                    {filteredBooks.map(book => {
                        const marked = isMarked(book.number, "number");
                        return (
                            <div
                                key={book.number}
                                className={`${localStyles.card} ${marked ? localStyles.marked : ""}`}
                                onClick={() => handleToggleMark(book)}
                            >
                                <div className={localStyles.idNum}>#{book.number}</div>
                                <div className={localStyles.cardContent}>
                                    <h3 className={localStyles.bookTitle}>
                                        {book.title}
                                    </h3>
                                    <p className={localStyles.author}>{book.author}</p>
                                    <div className={localStyles.meta}>
                                        <span>Publisher: {book.publisher}</span>
                                        <span className={localStyles.tag}>{book.category}</span>
                                    </div>
                                </div>
                                <button
                                    className={localStyles.actionBtn}
                                    onClick={(e) => { e.stopPropagation(); handleToggleMark(book); }}
                                >
                                    {marked ? "Read" : "Mark Read"}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {filteredBooks.length === 0 && (
                    <div className={localStyles.empty}>
                        No books match your filters.
                    </div>
                )}
            </div>
        </main>
    );
}
