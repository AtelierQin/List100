/**
 * 8 life areas — fixed taxonomy used by the /life-wheel page.
 * Order is also the visual order on the radar chart (clockwise from top).
 * Colors resolve to globals.css design tokens or fixed Tailwind-era hex.
 */
export const LIFE_AREAS = [
    { id: "Travel",   label: "Travel",   color: "var(--color-info)"     },
    { id: "Career",   label: "Career",   color: "var(--color-warning)"  },
    { id: "Health",   label: "Health",   color: "var(--color-success)"  },
    { id: "Learning", label: "Learning", color: "var(--color-purple)"   },
    { id: "Finance",  label: "Finance",  color: "var(--color-danger)"   },
    { id: "Social",   label: "Social",   color: "var(--color-accent)"   },
    { id: "Creative", label: "Creative", color: "#fb923c" /* orange-400 */ },
    { id: "Personal", label: "Personal", color: "#818cf8" /* indigo-400 */ },
] as const;

export type LifeAreaId = (typeof LIFE_AREAS)[number]["id"];

export const LIFE_AREA_IDS: ReadonlyArray<LifeAreaId> = LIFE_AREAS.map((a) => a.id);