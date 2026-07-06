"use client";

import dynamic from "next/dynamic";

// Data-driven page: skip SSR so localStorage is available on first render.
const List100Page = dynamic(() => import("./_List100Page"), {
    ssr: false,
    loading: () => <div style={{ minHeight: "100vh", background: "var(--color-bg)" }} />,
});

export default List100Page;