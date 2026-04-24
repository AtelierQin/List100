"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";

const navItems = [
    { href: "/list100", label: "List100" },
];

const tourItems = [
    { href: "/world", label: "World" },
    { href: "/china", label: "China" },
];

const collectionItems = [
    { href: "/collections/imdb", label: "IMDb Top 250" },
    { href: "/collections/dg120", label: "DG 120" },
    { href: "/collections/books", label: "THU Book List" },
];

export function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    // Close mobile menu on route change
    const [prevPathname, setPrevPathname] = useState(pathname);
    if (prevPathname !== pathname) {
        setPrevPathname(pathname);
        setMobileOpen(false);
        setOpenDropdown(null);
    }

    const isActive = (href: string) => pathname === href;
    const isGroupActive = (items: { href: string }[]) =>
        items.some((item) => pathname === item.href);

    return (
        <nav className={styles.nav}>
            <div className={styles.navContainer} ref={dropdownRef}>
                <Link href="/" className={styles.logo}>
                    FutureCast
                </Link>

                <div className={styles.navLinks}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navLink} ${isActive(item.href) ? styles.active : ""}`}
                        >
                            {item.label}
                        </Link>
                    ))}

                    {/* Tours Dropdown */}
                    <div className={`${styles.dropdown} ${openDropdown === "tours" ? styles.dropdownActive : ""}`}>
                        <button
                            className={`${styles.dropdownToggle} ${isGroupActive(tourItems) ? styles.active : ""}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenDropdown(openDropdown === "tours" ? null : "tours");
                            }}
                        >
                            Tours
                        </button>
                        <div className={styles.dropdownMenu}>
                            {tourItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`${styles.dropdownItem} ${isActive(item.href) ? styles.active : ""}`}
                                    onClick={() => setOpenDropdown(null)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Collections Dropdown */}
                    <div className={`${styles.dropdown} ${openDropdown === "collections" ? styles.dropdownActive : ""}`}>
                        <button
                            className={`${styles.dropdownToggle} ${isGroupActive(collectionItems) ? styles.active : ""}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenDropdown(openDropdown === "collections" ? null : "collections");
                            }}
                        >
                            Collections
                        </button>
                        <div className={styles.dropdownMenu}>
                            {collectionItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`${styles.dropdownItem} ${isActive(item.href) ? styles.active : ""}`}
                                    onClick={() => setOpenDropdown(null)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link
                        href="/os"
                        className={`${styles.navLink} ${isActive("/os") ? styles.active : ""}`}
                    >
                        OS
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`${styles.mobileMenuBtn} ${mobileOpen ? styles.open : ""}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuActive : ""}`}>
                <Link href="/list100" className={styles.mobileNavLink}>List100</Link>
                <Link href="/world" className={styles.mobileNavLink}>World Map</Link>
                <Link href="/china" className={styles.mobileNavLink}>China Map</Link>
                <Link href="/os" className={styles.mobileNavLink}>OS</Link>
                <Link href="/collections/imdb" className={styles.mobileNavLink}>IMDb Top 250</Link>
                <Link href="/collections/dg120" className={styles.mobileNavLink}>DG 120</Link>
                <Link href="/collections/books" className={styles.mobileNavLink}>THU Book List</Link>
            </div>
        </nav>
    );
}
