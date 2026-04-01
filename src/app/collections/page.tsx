import Link from "next/link";
import styles from "./page.module.css";

const collections = [
    {
        href: "/collections/imdb",
        title: "IMDB TOP 250",
        icon: "🎬",
        description: "Track the greatest films of all time.",
        signal: "purple",
    },
    {
        href: "/collections/dg120",
        title: "DG 120",
        icon: "🎵",
        description: "Deutsche Grammophon's 120 essential classical recordings.",
        signal: "amber",
    },
    {
        href: "/collections/books",
        title: "THU BOOK LIST",
        icon: "📚",
        description: "Tsinghua University recommended reading list.",
        signal: "blue",
    },
];

export default function CollectionsPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h3 className={styles.sectionLabel}>Collections</h3>
                <p className={styles.subtitle}>
                    Curate your cultural footprint.
                </p>

                <div className={styles.grid}>
                    {collections.map((c) => (
                        <Link
                            key={c.href}
                            href={c.href}
                            className={`${styles.card} ${styles[c.signal] || ""}`}
                        >
                            <div className={styles.cardAccent} />
                            <div className={styles.cardContent}>
                                <span className={styles.cardIcon}>{c.icon}</span>
                                <div>
                                    <div className={styles.cardTitle}>{c.title}</div>
                                    <div className={styles.cardDesc}>{c.description}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
