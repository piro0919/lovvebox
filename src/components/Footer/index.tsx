"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <Link href="/">
        <div className={styles.logo}>
          <Image
            alt="ラブボックス"
            fill={true}
            quality={100}
            src="/logo02.png"
          />
        </div>
      </Link>
      <div className={styles.copyright}>&copy; 2021 Blackbox</div>
    </footer>
  );
}
