"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

const navigationItems = [
  { href: "/", label: "ホーム" },
  { href: "/dojo", label: "おこっちゃうんです道場" },
  { href: "/request", label: "エピソード募集・ご意見" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoContent}>
            <Image 
              src="/images/あんぷうどり_1号.png" 
              alt="あんぷうどり" 
              width={40} 
              height={40}
              className={styles.logoImage}
            />
            <span className={styles.logoText}>あんぷうどり</span>
          </div>
        </Link>
        <nav className={styles.nav} role="navigation" aria-label="メインナビゲーション">
          <ul className={styles.navList}>
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.navLink}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}