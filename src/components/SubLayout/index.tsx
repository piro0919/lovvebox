import { Dela_Gothic_One as DelaGothicOne } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Spacer from "react-spacer";
import styles from "./style.module.css";

const delaGothicOne = DelaGothicOne({ subsets: ["latin"], weight: "400" });

export type SubLayoutProps = {
  children: ReactNode;
};

export default function SubLayout({ children }: SubLayoutProps): JSX.Element {
  return (
    <div>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/">
            <Image
              alt="ラブボックス"
              height={250 / 6}
              quality={100}
              src="/logo01.png"
              width={1000 / 6}
            />
          </Link>
          <Spacer grow={1} />
          <ul className={styles.list}>
            <li>
              <Link
                className={`${delaGothicOne.className} ${styles.link}`}
                href="/news"
              >
                NEWS
              </Link>
            </li>
            <li>
              <Link
                className={`${delaGothicOne.className} ${styles.link}`}
                href="/member"
              >
                MEMBER
              </Link>
            </li>
            <li>
              <Link
                className={`${delaGothicOne.className} ${styles.link}`}
                href="/guidelines"
              >
                GUIDELINES
              </Link>
            </li>
            <li>
              <a
                className={`${delaGothicOne.className} ${styles.link}`}
                href="https://lovvebox.booth.pm/"
                target="_blank"
              >
                STORE
              </a>
            </li>
            <li>
              <Link
                className={`${delaGothicOne.className} ${styles.link}`}
                href="/contact"
              >
                CONTACT
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
