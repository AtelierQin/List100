import React, { useRef } from "react";
import styles from "./map.module.css";

interface City {
    id: string;
    name: string;
    lat: number;
    lng: number;
}

interface Province {
    id: string;
    name: string;
    nameEn: string;
    type: string;
    lat: number;
    lng: number;
    cities: City[];
}

type Filter = "all" | "visited" | "unvisited";
type ViewMode = "city" | "province";

interface ChinaSidebarProps {
    search: string;
    setSearch: (s: string) => void;
    filter: Filter;
    setFilter: (f: Filter) => void;
    viewMode: ViewMode;
    setViewMode: (v: ViewMode) => void;
    exportData: () => void;
    importData: (file: File) => void;
    filteredProvinces: Province[];
    filteredCities: (City & { province: string; provinceId: string; provinceType: string })[];
    visitedSet: Set<string>;
    expandedProvinces: Set<string>;
    toggleProvince: (id: string) => void;
    handleCityClick: (city: City & { province: string; provinceId: string; provinceType: string }) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapRef: React.MutableRefObject<any>;
    TYPE_LABELS: Record<string, string>;
}

export function ChinaSidebar({
    search,
    setSearch,
    filter,
    setFilter,
    viewMode,
    setViewMode,
    exportData,
    importData,
    filteredProvinces,
    filteredCities,
    visitedSet,
    expandedProvinces,
    toggleProvince,
    handleCityClick,
    mapRef,
    TYPE_LABELS
}: ChinaSidebarProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <h2 className={styles.sidebarTitle}>DESTINATIONS</h2>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="SEARCH PROVINCE / CITY"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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
                    <button
                        className={`${styles.filterBtn} ${viewMode === "province" ? styles.filterBtnActive : ""}`}
                        onClick={() => setViewMode(viewMode === "province" ? "city" : "province")}
                        style={{ marginLeft: "auto" }}
                    >
                        {viewMode === "province" ? "BY PROVINCE" : "ALL CITIES"}
                    </button>
                </div>
                <div className={styles.dataControls}>
                    <button className={styles.actionBtnSmall} onClick={exportData}>
                        EXPORT
                    </button>
                    <button
                        className={styles.actionBtnSmall}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        IMPORT
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        style={{ display: "none" }}
                        onChange={(e) => e.target.files?.[0] && importData(e.target.files[0])}
                    />
                </div>
            </div>
            <div className={styles.list}>
                {viewMode === "province" ? (
                    filteredProvinces.length === 0 ? (
                        <div className={styles.emptyList}>NO RESULTS / 未找到结果</div>
                    ) : (
                        filteredProvinces.map((p) => {
                            const pVisited = p.cities.filter((c) => visitedSet.has(c.id)).length;
                            const isExpanded = expandedProvinces.has(p.id) || !!search;
                            return (
                                <div key={p.id}>
                                    <div
                                        className={`${styles.listItem} ${pVisited === p.cities.length && pVisited > 0 ? styles.listItemVisited : ""}`}
                                        onClick={() => {
                                            toggleProvince(p.id);
                                            if (mapRef.current) {
                                                mapRef.current.flyTo([p.lat, p.lng], 7);
                                            }
                                        }}
                                        style={{
                                            background: isExpanded ? "var(--color-surface-deep)" : undefined,
                                            borderLeft: isExpanded ? "2px solid var(--color-accent)" : undefined
                                        }}
                                    >
                                        <div className={styles.itemInfo}>
                                            <span className={styles.itemName}>
                                                {p.name}
                                                <span style={{ opacity: 0.4, marginLeft: 8, fontSize: 11 }}>
                                                    {p.nameEn}
                                                </span>
                                            </span>
                                            <span className={styles.itemLocation}>
                                                {TYPE_LABELS[p.type] || p.type} · {pVisited}/{p.cities.length} cities
                                            </span>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}>
                                            <div className={styles.itemStatus} />
                                            <span style={{
                                                fontSize: '10px',
                                                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.2s ease-out'
                                            }}>›</span>
                                        </div>
                                    </div>
                                    {isExpanded &&
                                        p.cities.map((c) => (
                                            <div
                                                key={c.id}
                                                className={`${styles.listItem} ${visitedSet.has(c.id) ? styles.listItemVisited : ""}`}
                                                style={{ paddingLeft: 32, borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                                                onClick={() =>
                                                    handleCityClick({ ...c, province: p.name, provinceId: p.id, provinceType: p.type })
                                                }
                                            >
                                                <div className={styles.itemInfo}>
                                                    <span className={styles.itemName}>{c.name}</span>
                                                </div>
                                                <div className={styles.itemStatus} />
                                            </div>
                                        ))}
                                </div>
                            );
                        })
                    )
                ) : filteredCities.length === 0 ? (
                    <div className={styles.emptyList}>NO RESULTS / 未找到结果</div>
                ) : (
                    filteredCities.map((c) => (
                        <div
                            key={c.id}
                            className={`${styles.listItem} ${visitedSet.has(c.id) ? styles.listItemVisited : ""}`}
                            onClick={() => handleCityClick(c)}
                        >
                            <div className={styles.itemInfo}>
                                <span className={styles.itemName}>{c.name}</span>
                                <span className={styles.itemLocation}>{c.province}</span>
                            </div>
                            <div className={styles.itemStatus} />
                        </div>
                    ))
                )}
            </div>
        </aside>
    );
}
