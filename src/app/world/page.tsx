"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { useVisitedWorld, useIsMounted } from "@/lib/data";
import type { MapMarker } from "@/components/MapView";
import countries from "@/data/countries.json";
import styles from "@/components/map.module.css";

const MapView = dynamic(() => import("@/components/MapView").then((m) => m.MapView), {
    ssr: false,
    loading: () => <div style={{ width: '100%', height: '100%', background: '#1a1a1a' }} />,
});

type Filter = "all" | "visited" | "unvisited";

export default function WorldPage() {
    const { visited, toggle, visitedList, setVisited, updateRecord, getRecord } = useVisitedWorld();
    const [filter, setFilter] = useState<Filter>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeId, setActiveId] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapRef = useRef<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const filtered = useMemo(() => {
        return countries.filter((c) => {
            const isV = visited.has(c.id);
            if (filter === "visited" && !isV) return false;
            if (filter === "unvisited" && isV) return false;

            if (searchQuery) {
                const term = searchQuery.toLowerCase();
                return (
                    c.name.toLowerCase().includes(term) ||
                    c.region.toLowerCase().includes(term)
                );
            }
            return true;
        });
    }, [countries, visited, filter, searchQuery]);

    const markers: MapMarker[] = useMemo(() => {
        return filtered
            .filter((c) => c.lat && c.lng)
            .map((c) => ({
                id: c.id,
                lat: c.lat,
                lng: c.lng,
                visited: visited.has(c.id),
            }));
    }, [filtered, visited]);

    const activeCountry = useMemo(() => {
        return activeId !== null
            ? countries.find((c) => c.id === activeId) || null
            : null;
    }, [activeId]);

    const handleItemClick = useCallback(
        (id: number) => {
            const country = countries.find((c) => c.id === id);
            if (country && mapRef.current) {
                mapRef.current.flyTo([country.lat, country.lng], 5);
            }
            setActiveId(id);
        },
        []
    );

    const handleMarkerClick = useCallback((id: number) => {
        setActiveId(id);
    }, []);

    const exportData = useCallback(() => {
        const data = { visited: visitedList, timestamp: new Date().toISOString() };
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `world-visited-${new Date().toISOString().split("T")[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }, [visitedList]);

    const importData = useCallback(
        (file: File) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target?.result as string);
                    if (Array.isArray(data.visited)) {
                        setVisited((prev) => {
                            const merged = new Set([...prev, ...data.visited]);
                            return Array.from(merged);
                        });
                    }
                } catch {
                    // ignore
                }
            };
            reader.readAsText(file);
        },
        [setVisited]
    );

    const isMounted = useIsMounted();
    const visitedCount = visited.size;
    const total = countries.length;
    const percent = total > 0 ? Math.round((visitedCount / total) * 100) : 0;

    if (!isMounted) return <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }} />;

    return (
        <div className={styles.pageGrid}>
            {/* Header */}
            <header className={styles.header}>
                <h1 className={styles.brand}>
                    WORLD
                    <span className={styles.brandSub}>EXPLORATION</span>
                </h1>
                <div className={styles.statsContainer}>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>EXPLORED</span>
                        <span className={`${styles.statValue} ${styles.statValueEmerald}`}>
                            {String(visitedCount).padStart(2, "0")}
                        </span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>TOTAL</span>
                        <span className={`${styles.statValue} ${styles.statValueMuted}`}>
                            {total}
                        </span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>PROGRESS</span>
                        <span className={`${styles.statValue} ${styles.statValueBlue}`}>
                            {percent}%
                        </span>
                    </div>
                </div>
            </header>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2 className={styles.sidebarTitle}>COUNTRIES</h2>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="SEARCH COUNTRY / REGION"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className={styles.filterControls}>
                        {(["all", "visited", "unvisited"] as const).map((f) => (
                            <button
                                key={f}
                                className={`${styles.filterBtn} ${filter === f ? styles.filterBtnActive : ""}`}
                                onClick={() => setFilter(f)}
                            >
                                {f === "all" ? "ALL" : f === "visited" ? "VISITED" : "PLAN"}
                            </button>
                        ))}
                    </div>
                    <div className={styles.dataControls}>
                        <button className={styles.actionBtnSmall} onClick={exportData}>
                            EXPORT DATA
                        </button>
                        <button
                            className={styles.actionBtnSmall}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            IMPORT DATA
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".json"
                            style={{ display: "none" }}
                            onChange={(e) =>
                                e.target.files?.[0] && importData(e.target.files[0])
                            }
                        />
                    </div>
                </div>
                <div className={styles.list}>
                    {filtered.length === 0 ? (
                        <div className={styles.emptyList}>NO RESULTS FOUND</div>
                    ) : (
                        filtered.map((country) => (
                            <div
                                key={country.id}
                                className={`${styles.listItem} ${visited.has(country.id) ? styles.listItemVisited : ""}`}
                                onClick={() => handleItemClick(country.id)}
                            >
                                <div className={styles.itemInfo}>
                                    <span className={styles.itemName}>
                                        <span className={styles.itemNumber}>
                                            {String(country.id).padStart(2, "0")}
                                        </span>
                                        {country.name}
                                    </span>
                                    <span className={styles.itemLocation}>{country.region}</span>
                                </div>
                                <div className={styles.itemStatus} />
                            </div>
                        ))
                    )}
                </div>
            </aside>

            {/* Map */}
            <main className={styles.mapContainer}>
                <MapView
                    center={[35, 10]}
                    zoom={3}
                    markers={markers}
                    onMarkerClick={handleMarkerClick}
                    mapRef={mapRef}
                />
            </main>

            {/* Detail Modal */}
            {activeCountry && (
                <div className={styles.modal} onClick={() => setActiveId(null)}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.closeBtn} onClick={() => setActiveId(null)}>
                            ✕
                        </button>
                        <div className={styles.modalInfo} style={{ gridColumn: "1 / -1" }}>
                            <div>
                                <span className={styles.modalId}>{String(activeCountry.id).padStart(2, "0")}</span>
                                <h2 className={styles.modalTitle}>{activeCountry.name}</h2>
                                <span className={styles.modalLocation}>REGION: {activeCountry.region}</span>
                            </div>

                            {visited.has(activeCountry.id) && (
                                <div className={styles.modalRecord}>
                                    <div className={styles.inputGroup}>
                                        <label>Visited Date</label>
                                        <input
                                            type="month"
                                            value={getRecord(activeCountry.id)?.date || ""}
                                            onChange={(e) => updateRecord(activeCountry.id, { date: e.target.value })}
                                            className={styles.inputField}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Notes</label>
                                        <textarea
                                            value={getRecord(activeCountry.id)?.notes || ""}
                                            onChange={(e) => updateRecord(activeCountry.id, { notes: e.target.value })}
                                            placeholder="Add memories or reflections..."
                                            rows={2}
                                            className={styles.textareaField}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className={styles.modalActions}>
                                <button
                                    className={`${styles.markBtn} ${visited.has(activeCountry.id) ? styles.markBtnVisited : ""}`}
                                    onClick={() => toggle(activeCountry.id)}
                                >
                                    {visited.has(activeCountry.id)
                                        ? "VISITED ✓"
                                        : "MARK AS VISITED"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
