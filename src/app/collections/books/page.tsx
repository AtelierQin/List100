"use client";

import dynamic from "next/dynamic";

// Data-driven page: skip SSR so localStorage is available on first render.
const BooksPage = dynamic(() => import("./_BooksPage"), {
    ssr: false,
    loading: () => <main style={{ minHeight: "100vh", background: "var(--color-bg)" }} />,
});

export default BooksPage;