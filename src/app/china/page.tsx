"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { useVisitedChina, useIsMounted } from "@/lib/data";
import type { MapMarker } from "@/components/MapView";
import provincesData from "@/data/china-provinces.json";
import styles from "@/components/map.module.css";
import { ChinaSidebar } from "@/components/ChinaSidebar";
import { ChinaCityModal } from "@/components/ChinaCityModal";

const MapView = dynamic(
    () => import("@/components/MapView").then((m) => m.MapView),
    {
        ssr: false,
        loading: () => (
            <div style={{ width: "100%", height: "100%", background: "#1a1a1a" }} />
        ),
    }
);

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

const provinces: Province[] = provincesData as Province[];

// Flatten all cities with their province info
const allCities = provinces.flatMap((p) =>
    p.cities.map((c) => ({ ...c, province: p.name, provinceId: p.id, provinceType: p.type }))
);

// Pre-build O(1) lookup map for cities to provinces
const cityToProvinceMap = new Map(allCities.map(c => [c.id, c.provinceId]));

type Filter = "all" | "visited" | "unvisited";
type ViewMode = "city" | "province";

const TYPE_LABELS: Record<string, string> = {
    municipality: "直辖市",
    province: "省",
    autonomous: "自治区",
    sar: "特别行政区",
};

// Simple string hash to number (for marker IDs)
function hashStr(s: string): number {
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
        const char = s.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return Math.abs(hash);
}

export default function ChinaPage() {
    const isMounted = useIsMounted();
    const { 
        visited: visitedSet,
        toggleCity,
        updateCityRecord,
        getCityRecord,
        setVisitedCities,
        rawVisitedCities
    } = useVisitedChina();

    const [filter, setFilter] = useState<Filter>("all");
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState<ViewMode>("province");
    const [expandedProvinces, setExpandedProvinces] = useState<Set<string>>(new Set());
    const [activeCity, setActiveCity] = useState<(City & { province: string; provinceId: string; provinceType: string }) | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapRef = useRef<any>(null);

    const toggleProvince = useCallback(
        (provinceId: string) => {
            setExpandedProvinces((prev) => {
                const next = new Set(prev);
                if (next.has(provinceId)) next.delete(provinceId);
                else next.add(provinceId);
                return next;
            });
        },
        []
    );

    // Filter logic
    const filteredProvinces = useMemo(() => {
        return provinces
            .map((p) => {
                const cities = p.cities.filter((c) => {
                    const isV = visitedSet.has(c.id);
                    if (filter === "visited" && !isV) return false;
                    if (filter === "unvisited" && isV) return false;
                    if (search) {
                        const term = search.toLowerCase();
                        return (
                            c.name.toLowerCase().includes(term) ||
                            p.name.toLowerCase().includes(term) ||
                            p.nameEn.toLowerCase().includes(term)
                        );
                    }
                    return true;
                });
                return { ...p, cities };
            })
            .filter((p) => p.cities.length > 0);
    }, [filter, search, visitedSet]);

    const filteredCities = useMemo(() => {
        return allCities.filter((c) => {
            const isV = visitedSet.has(c.id);
            if (filter === "visited" && !isV) return false;
            if (filter === "unvisited" && isV) return false;
            if (search) {
                const term = search.toLowerCase();
                return (
                    c.name.toLowerCase().includes(term) ||
                    c.province.toLowerCase().includes(term)
                );
            }
            return true;
        });
    }, [filter, search, visitedSet]);

    // Map markers — show filtered cities
    const markers: MapMarker[] = useMemo(() => {
        const cities = viewMode === "province"
            ? filteredProvinces.flatMap((p) => p.cities.map((c) => ({ ...c, provinceId: p.id })))
            : filteredCities;
        return cities
            .filter((c) => c.lat && c.lng)
            .map((c) => ({
                id: hashStr(c.id),
                lat: c.lat,
                lng: c.lng,
                visited: visitedSet.has(c.id),
            }));
    }, [viewMode, filteredProvinces, filteredCities, visitedSet]);

    const handleCityClick = useCallback(
        (city: City & { province: string; provinceId: string; provinceType: string }) => {
            if (mapRef.current) {
                mapRef.current.flyTo([city.lat, city.lng], 8);
            }
            setActiveCity(city);
        },
        []
    );

    const handleMarkerClick = useCallback(
        (numId: number) => {
            // Find the city by hash
            const city = allCities.find((c) => hashStr(c.id) === numId);
            if (city) setActiveCity(city);
        },
        []
    );

    // Export/Import
    const exportData = useCallback(() => {
        const data = { visitedCities: rawVisitedCities, timestamp: new Date().toISOString() };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `china-cities-${new Date().toISOString().split("T")[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }, [rawVisitedCities]);

    const importData = useCallback(
        (file: File) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target?.result as string);
                    if (Array.isArray(data.visitedCities)) {
                        setVisitedCities((prev) => {
                            // Deduplicate by ID
                            const map = new Map();
                            
                            // Process existing
                            prev.forEach(item => {
                                const id = typeof item === 'object' && item !== null ? (item as Record<string, unknown>).id : item;
                                map.set(id, item);
                            });
                            
                            // Process incoming (will override duplicates)
                            data.visitedCities.forEach((item: Record<string, unknown>) => {
                                const id = typeof item === 'object' && item !== null ? item.id : item;
                                map.set(id, item);
                            });
                            
                            return Array.from(map.values());
                        });
                    }
                } catch { /* ignore */ }
            };
            reader.readAsText(file);
        },
        [setVisitedCities]
    );

    // Stats
    const totalCities = allCities.length;
    const visitedCount = visitedSet.size;

    const visitedProvinceCount = useMemo(() => {
        const provSet = new Set<string>();
        visitedSet.forEach((cid) => {
            const provId = cityToProvinceMap.get(cid);
            if (provId) provSet.add(provId);
        });
        return provSet.size;
    }, [visitedSet]);
    const percent = totalCities > 0 ? Math.round((visitedCount / totalCities) * 100) : 0;

    if (!isMounted) return <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }} />;

    return (
        <div className={styles.pageGrid}>
            {/* Header */}
            <header className={styles.header}>
                <h1 className={styles.brand}>
                    CHINA
                    <span className={styles.brandSub}>EXPLORATION</span>
                </h1>
                <div className={styles.statsContainer}>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>PROVINCES</span>
                        <span className={`${styles.statValue} ${styles.statValueEmerald}`}>
                            {String(visitedProvinceCount).padStart(2, "0")}
                            <span className={styles.statValueMuted}> / {provinces.length}</span>
                        </span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>CITIES</span>
                        <span className={`${styles.statValue} ${styles.statValueEmerald}`}>
                            {String(visitedCount).padStart(2, "0")}
                            <span className={styles.statValueMuted}> / {totalCities}</span>
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

            {/* Sidebar Component */}
            <ChinaSidebar
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                viewMode={viewMode}
                setViewMode={setViewMode}
                exportData={exportData}
                importData={importData}
                filteredProvinces={filteredProvinces}
                filteredCities={filteredCities}
                visitedSet={visitedSet}
                expandedProvinces={expandedProvinces}
                toggleProvince={toggleProvince}
                handleCityClick={handleCityClick}
                mapRef={mapRef}
                TYPE_LABELS={TYPE_LABELS}
            />

            {/* Map */}
            <main className={styles.mapContainer}>
                <MapView
                    center={[35.86, 104.2]}
                    zoom={5}
                    markers={markers}
                    onMarkerClick={handleMarkerClick}
                    mapRef={mapRef}
                />
            </main>

            {/* City Detail Modal Component */}
            {activeCity && (
                <ChinaCityModal
                    activeCity={activeCity}
                    setActiveCity={setActiveCity}
                    visitedSet={visitedSet}
                    getCityRecord={getCityRecord}
                    updateCityRecord={updateCityRecord}
                    toggleCity={toggleCity}
                    TYPE_LABELS={TYPE_LABELS}
                />
            )}
        </div>
    );
}
