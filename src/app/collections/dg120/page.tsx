"use client";

import dynamic from "next/dynamic";

// Data-driven page: skip SSR so localStorage is available on first render.
const DG120Page = dynamic(() => import("./_DG120Page"), {
    ssr: false,
    loading: () => <main style={{ minHeight: "100vh", background: "var(--color-bg)" }} />,
});

export default DG120Page;