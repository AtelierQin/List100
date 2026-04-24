"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface MapMarker {
    id: number;
    lat: number;
    lng: number;
    visited: boolean;
}

interface MapViewProps {
    center: [number, number];
    zoom: number;
    markers: MapMarker[];
    onMarkerClick: (id: number) => void;
    mapRef?: React.MutableRefObject<L.Map | null>;
}

function createMarkerIcon(isVisited: boolean) {
    const el = document.createElement("div");
    el.className = `marker-pin ${isVisited ? "" : "unvisited"}`;
    return L.divIcon({
        className: "custom-marker",
        html: el,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
    });
}

export function MapView({ center, zoom, markers, onMarkerClick, mapRef }: MapViewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const internalMapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<Record<number, L.Marker>>({});

    // Initialize map
    useEffect(() => {
        if (!containerRef.current || internalMapRef.current) return;

        const map = L.map(containerRef.current, {
            zoomControl: false,
            attributionControl: false,
            zoomSnap: 0.25,
            wheelPxPerZoomLevel: 120, // Optional: smoother zooming
        }).setView(center, zoom);

        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
            subdomains: "abcd",
            maxZoom: 20,
        }).addTo(map);

        L.control.zoom({ position: "bottomright" }).addTo(map);

        internalMapRef.current = map;
        if (mapRef) mapRef.current = map;

        return () => {
            map.remove();
            internalMapRef.current = null;
            if (mapRef) mapRef.current = null;
            markersRef.current = {};
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Update markers
    useEffect(() => {
        const map = internalMapRef.current;
        if (!map) return;

        const currentMarkers = markersRef.current;
        const newIds = new Set(markers.map((m) => m.id));

        // Remove old markers
        for (const id of Object.keys(currentMarkers)) {
            const numId = Number(id);
            if (!newIds.has(numId)) {
                map.removeLayer(currentMarkers[numId]);
                delete currentMarkers[numId];
            }
        }

        // Add or update markers
        markers.forEach((m) => {
            if (!m.lat || !m.lng) return;

            if (currentMarkers[m.id]) {
                currentMarkers[m.id].setIcon(createMarkerIcon(m.visited));
            } else {
                const marker = L.marker([m.lat, m.lng], {
                    icon: createMarkerIcon(m.visited),
                }).addTo(map);
                marker.on("click", () => onMarkerClick(m.id));
                currentMarkers[m.id] = marker;
            }
        });
    }, [markers, onMarkerClick]);

    return (
        <div
            ref={containerRef}
            style={{ width: "100%", height: "100%", background: "#1a1a1a" }}
        />
    );
}
