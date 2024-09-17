"use client";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
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
      <ul className={styles.list}>
        <li>
          <Link
            className={styles.link}
            href="https://blackbox-inc.com/"
            target="_blank"
          >
            <span>会社概要</span>
            <FaExternalLinkSquareAlt size={18} />
          </Link>
        </li>
        <li>
          <Link className={styles.link} href="/guidelines">
            ガイドライン
          </Link>
        </li>
        <li>
          <Link className={styles.link} href="/privacy-policy">
            プライバシーポリシー
          </Link>
        </li>
      </ul>
      <div className={styles.copyright}>&copy; 2021 Blackbox</div>
    </footer>
  );
}
