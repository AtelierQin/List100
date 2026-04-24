"use client";

import { useState, useEffect, useCallback, useSyncExternalStore, useMemo } from "react";

// ==================== localStorage Hook ====================

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window !== "undefined") {
            try {
                const item = window.localStorage.getItem(key);
                if (item) {
                    return JSON.parse(item);
                }
            } catch (error) {
                console.warn(`Error reading localStorage key "${key}":`, error);
            }
        }
        return initialValue;
    });

    const setValue = useCallback(
        (value: T | ((prev: T) => T)) => {
            setStoredValue((prev) => {
                const newValue = value instanceof Function ? value(prev) : value;
                if (typeof window !== "undefined") {
                    window.localStorage.setItem(key, JSON.stringify(newValue));
                }
                return newValue;
            });
        },
        [key]
    );

    // Listen for changes from other tabs
    useEffect(() => {
        function handleStorage(e: StorageEvent) {
            if (e.key === key && e.newValue !== null) {
                try {
                    setStoredValue(JSON.parse(e.newValue));
                } catch {
                    // ignore parse errors
                }
            }
        }
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, [key]);

    return [storedValue, setValue];
}

// ==================== Utilities ====================

const emptySubscribe = () => () => {};

export function useIsMounted() {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );
}

// ==================== Data Types ====================

export interface Milestone {
    id: string;
    text: string;
    completed: boolean;
    dueDate?: string;
}

export interface Habit {
    id: string;
    title: string;
    frequency: "daily" | "weekly";
    completedDates: string[];
}

export interface Goal {
    id: string;
    text: string;
    description?: string;
    tags: string[];
    completed: boolean;
    pinned?: boolean;
    customOrder?: number;
    createdAt: string;
    updatedAt?: string;
    completedAt?: string;
    notes?: string;
    milestones?: Milestone[];
    habits?: Habit[];
}

export interface DashboardStats {
    goals: {
        total: number;
        active: number;
        completed: number;
        percentage: number;
    };
    travel: {
        countries: number;
        cities: number;
    };
}

// ==================== Storage Keys ====================

export const STORAGE_KEYS = {
    GOALS: "list100-items",
    WORLD: "visited_world", // Unified
    CHINA: "china-visited-cities-v2", // Unified
    SETTINGS: "app-settings",
} as const;

// ==================== Data Hooks ====================

export function useGoals() {
    const [goals, setGoals] = useLocalStorage<Goal[]>(STORAGE_KEYS.GOALS, []);
    return { goals, setGoals };
}

export interface VisitRecord {
    id: number;
    date?: string;
    notes?: string;
}

// Convert legacy number[] or mixed arrays to VisitRecord[]
function migrateVisitData(data: unknown[]): VisitRecord[] {
    if (!Array.isArray(data)) return [];
    return data.map(item => {
        if (typeof item === 'number') return { id: item };
        return item as VisitRecord;
    });
}

export function useVisited5A() {
    const [rawVisited, setVisited] = useLocalStorage<unknown[]>("visited_5a", []);

    const visitedList = useMemo(() => migrateVisitData(rawVisited), [rawVisited]);
    const visitedSet = useMemo(() => new Set(visitedList.map(v => v.id)), [visitedList]);

    const toggle = useCallback(
        (id: number) => {
            setVisited((prev) => {
                const list = migrateVisitData(prev);
                const exists = list.some(v => v.id === id);
                if (exists) return list.filter(v => v.id !== id);
                return [...list, { id }];
            });
        },
        [setVisited]
    );

    const updateRecord = useCallback(
        (id: number, updates: Partial<VisitRecord>) => {
            setVisited((prev) => {
                const list = migrateVisitData(prev);
                return list.map(v => v.id === id ? { ...v, ...updates } : v);
            });
        },
        [setVisited]
    );

    const isVisited = useCallback((id: number) => visitedSet.has(id), [visitedSet]);
    const getRecord = useCallback((id: number) => visitedList.find(v => v.id === id), [visitedList]);

    return { visited: visitedSet, visitedList, toggle, updateRecord, isVisited, getRecord, setVisited };
}

export function useVisitedWorld() {
    const [rawVisited, setVisited] = useLocalStorage<unknown[]>(STORAGE_KEYS.WORLD, []);

    const visitedList = useMemo(() => migrateVisitData(rawVisited), [rawVisited]);
    const visitedSet = useMemo(() => new Set(visitedList.map(v => v.id)), [visitedList]);

    const toggle = useCallback(
        (id: number) => {
            setVisited((prev) => {
                const list = migrateVisitData(prev);
                const exists = list.some(v => v.id === id);
                if (exists) return list.filter(v => v.id !== id);
                return [...list, { id }];
            });
        },
        [setVisited]
    );

    const updateRecord = useCallback(
        (id: number, updates: Partial<VisitRecord>) => {
            setVisited((prev) => {
                const list = migrateVisitData(prev);
                return list.map(v => v.id === id ? { ...v, ...updates } : v);
            });
        },
        [setVisited]
    );

    const isVisited = useCallback((id: number) => visitedSet.has(id), [visitedSet]);
    const getRecord = useCallback((id: number) => visitedList.find(v => v.id === id), [visitedList]);

    return { visited: visitedSet, visitedList, toggle, updateRecord, isVisited, getRecord, setVisited };
}

export interface ChinaVisitRecord {
    id: string;
    date?: string;
    notes?: string;
}

export function useVisitedChina() {
    const [rawVisitedCities, setVisitedCities] = useLocalStorage<unknown[]>(STORAGE_KEYS.CHINA, []);

    const visitedRecords: ChinaVisitRecord[] = useMemo(() => {
        return (rawVisitedCities as unknown[]).map(item => {
            if (typeof item === 'string' || typeof item === 'number') return { id: String(item) };
            if (item && typeof item === 'object' && 'id' in item) return item as ChinaVisitRecord;
            return { id: "" };
        }).filter(r => r.id);
    }, [rawVisitedCities]);

    const visitedSet = useMemo(() => {
        return new Set(visitedRecords.map(r => String(r.id)));
    }, [visitedRecords]);

    const toggleCity = useCallback(
        (cityId: string) => {
            setVisitedCities((prev) => {
                const isVisited = prev.some(item => {
                    const id = item && typeof item === 'object' && 'id' in item ? (item as {id: unknown}).id : item;
                    return String(id) === cityId;
                });
                if (isVisited) {
                    return prev.filter(item => {
                        const id = item && typeof item === 'object' && 'id' in item ? (item as {id: unknown}).id : item;
                        return String(id) !== cityId;
                    });
                } else {
                    return [...prev, { id: cityId }];
                }
            });
        },
        [setVisitedCities]
    );

    const updateCityRecord = useCallback((cityId: string, updates: Partial<ChinaVisitRecord>) => {
        setVisitedCities((prev) => {
            return prev.map(item => {
                const id = item && typeof item === 'object' && 'id' in item ? (item as {id: unknown}).id : item;
                if (String(id) === cityId) {
                    const record = item && typeof item === 'object' ? item : { id: item };
                    return { ...record, ...updates };
                }
                return item;
            });
        });
    }, [setVisitedCities]);

    const getCityRecord = useCallback((cityId: string) => {
        return visitedRecords.find(r => String(r.id) === cityId);
    }, [visitedRecords]);

    return { 
        visited: visitedSet, 
        visitedRecords, 
        toggleCity, 
        updateCityRecord, 
        getCityRecord, 
        setVisitedCities,
        rawVisitedCities 
    };
}

export function useDashboardStats(): DashboardStats {
    const { goals } = useGoals();
    const { visitedList: worldVisited } = useVisitedWorld();
    const { visitedRecords: chinaVisited } = useVisitedChina();

    const completed = goals.filter((g) => g.completed).length;
    const total = goals.length;

    return {
        goals: {
            total,
            active: total - completed,
            completed,
            percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
        },
        travel: {
            countries: worldVisited.length,
            cities: chinaVisited.length,
        },
    };
}

// ==================== Collection Store ====================

export interface CollectionItem {
    [key: string]: unknown;
}

export function useCollectionStore(namespace: string, itemKey: string = "items") {
    const storageKey = `list100_${namespace}_${itemKey}`;
    const [items, setItems] = useLocalStorage<CollectionItem[]>(storageKey, []);

    const isMarked = useCallback(
        (identifier: string | number, identifierKey: string = "id") => {
            return items.some((item) => item[identifierKey] === identifier);
        },
        [items]
    );

    const markItem = useCallback(
        (item: CollectionItem, identifierKey: string = "id") => {
            setItems((prev) => {
                const idx = prev.findIndex((i) => i[identifierKey] === item[identifierKey]);
                if (idx >= 0) {
                    const updated = [...prev];
                    updated[idx] = { ...updated[idx], ...item };
                    return updated;
                }
                return [...prev, item];
            });
        },
        [setItems]
    );

    const unmarkItem = useCallback(
        (identifier: string | number, identifierKey: string = "id") => {
            setItems((prev) => prev.filter((i) => i[identifierKey] !== identifier));
        },
        [setItems]
    );

    const getStats = useCallback(
        (totalItems: number) => {
            const marked = items.length;
            return {
                marked,
                total: totalItems,
                percentage: totalItems > 0 ? Math.round((marked / totalItems) * 100) : 0,
            };
        },
        [items]
    );

    return { items, setItems, isMarked, markItem, unmarkItem, getStats };
}
