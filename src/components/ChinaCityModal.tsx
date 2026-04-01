import React from "react";
import styles from "./map.module.css";
import type { ChinaVisitRecord } from "@/lib/data";

interface City {
    id: string;
    name: string;
    lat: number;
    lng: number;
}

interface ChinaCityModalProps {
    activeCity: City & { province: string; provinceId: string; provinceType: string };
    setActiveCity: (city: null) => void;
    visitedSet: Set<string>;
    getCityRecord: (id: string) => ChinaVisitRecord | undefined;
    updateCityRecord: (id: string, updates: Partial<ChinaVisitRecord>) => void;
    toggleCity: (id: string) => void;
    TYPE_LABELS: Record<string, string>;
}

export function ChinaCityModal({
    activeCity,
    setActiveCity,
    visitedSet,
    getCityRecord,
    updateCityRecord,
    toggleCity,
    TYPE_LABELS
}: ChinaCityModalProps) {
    return (
        <div className={styles.modal} onClick={() => setActiveCity(null)}>
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
                style={{ gridTemplateColumns: "1fr" }}
            >
                <button className={styles.closeBtn} onClick={() => setActiveCity(null)}>
                    ✕
                </button>
                <div className={styles.modalInfo}>
                    <div>
                        <span className={styles.modalId}>{activeCity.name}</span>
                        <h2 className={styles.modalTitle}>{activeCity.name}</h2>
                        <span className={styles.modalLocation}>
                            <span className={styles.modalLocationLabel}>PROVINCE:</span>
                            {activeCity.province} · {TYPE_LABELS[activeCity.provinceType] || ""}
                        </span>
                        <p className={styles.modalDesc} style={{ fontFamily: "var(--font-family-mono)", fontSize: 12, color: "var(--color-text-muted)" }}>
                            LAT {activeCity.lat.toFixed(2)} · LNG {activeCity.lng.toFixed(2)}
                        </p>
                    </div>

                    {visitedSet.has(activeCity.id) && (
                        <div className={styles.modalRecord}>
                            <div className={styles.inputGroup}>
                                <label>Visited Date</label>
                                <input
                                    type="month"
                                    value={getCityRecord(activeCity.id)?.date || ""}
                                    onChange={(e) => updateCityRecord(activeCity.id, { date: e.target.value })}
                                    className={styles.inputField}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Notes</label>
                                <textarea
                                    value={getCityRecord(activeCity.id)?.notes || ""}
                                    onChange={(e) => updateCityRecord(activeCity.id, { notes: e.target.value })}
                                    placeholder="Add memories or reflections..."
                                    rows={2}
                                    className={styles.textareaField}
                                />
                            </div>
                        </div>
                    )}

                    <div className={styles.modalActions}>
                        <button
                            className={`${styles.markBtn} ${visitedSet.has(activeCity.id) ? styles.markBtnVisited : ""}`}
                            onClick={() => toggleCity(activeCity.id)}
                        >
                            {visitedSet.has(activeCity.id)
                                ? "VISITED / 已到达 ✓"
                                : "MARK AS VISITED / 标记已到达"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
