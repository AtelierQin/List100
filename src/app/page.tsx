"use client";

import dynamic from "next/dynamic";

// Data-driven page: skip SSR so localStorage is available on first render
// and no hydration mismatch occurs. See src/lib/data.ts useLocalStorage lazy init.
const LandingPage = dynamic(() => import("./_LandingPage"), {
    ssr: false,
    loading: () => (
        <main style={{ minHeight: "100vh", background: "var(--color-bg)" }} />
    ),
});

export default LandingPage;