import Link from "next/link";
import styles from "./page.module.css";

const IconFilm = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M7 3v18" />
        <path d="M3 7.5h4" />
        <path d="M3 12h18" />
        <path d="M3 16.5h4" />
        <path d="M17 3v18" />
        <path d="M17 7.5h4" />
        <path d="M17 16.5h4" />
    </svg>
);

const IconDisc = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const IconBook = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
);

const collections = [
    {
        href: "/collections/imdb",
        title: "IMDB TOP 250",
        Icon: IconFilm,
        description: "Track the greatest films of all time.",
        signal: "purple",
    },
    {
        href: "/collections/dg120",
        title: "DG 120",
        Icon: IconDisc,
        description: "Deutsche Grammophon's 120 essential classical recordings.",
        signal: "amber",
    },
    {
        href: "/collections/books",
        title: "THU BOOK LIST",
        Icon: IconBook,
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
                    {collections.map(({ href, title, description, signal, Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`${styles.card} ${styles[signal] || ""}`}
                        >
                            <div className={styles.cardAccent} />
                            <div className={styles.cardContent}>
                                <span className={styles.cardIcon}><Icon /></span>
                                <div>
                                    <div className={styles.cardTitle}>{title}</div>
                                    <div className={styles.cardDesc}>{description}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}