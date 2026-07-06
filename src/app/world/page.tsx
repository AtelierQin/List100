"use client";

import dynamic from "next/dynamic";

// Data-driven page: skip SSR so localStorage is available on first render.
const WorldPage = dynamic(() => import("./_WorldPage"), {
    ssr: false,
    loading: () => <div style={{ minHeight: "100vh", background: "var(--color-bg)" }} />,
});

export default WorldPage;