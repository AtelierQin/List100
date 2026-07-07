"use client";

import dynamic from "next/dynamic";

// Skip SSR so localStorage is available on first render — matches the
// pattern used by /list100, /world, /china, /os, and the collection pages.
const LifeWheelPage = dynamic(() => import("./_LifeWheelPage"), {
    ssr: false,
    loading: () => (
        <main
            style={{
                minHeight: "100vh",
                background: "var(--color-bg)",
            }}
        />
    ),
});

export default LifeWheelPage;
