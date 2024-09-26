"use client";
import Hamburger from "hamburger-react";
import { Dela_Gothic_One as DelaGothicOne } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import Spacer from "react-spacer";
import { useShallow } from "zustand/shallow";
import styles from "./style.module.css";
import useDrawerStore from "@/stores/useDrawerStore";

const delaGothicOne = DelaGothicOne({ subsets: ["latin"], weight: "400" });

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  const { toggle, toggled } = useDrawerStore(
    useShallow((state) => ({ toggle: state.toggle, toggled: state.toggled }))
  );

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
                href="/faq"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                className={`${delaGothicOne.className} ${styles.link}`}
                href="https://lovvebox.booth.pm/"
                target="_blank"
              >
                <span>STORE</span>
                <FaExternalLinkSquareAlt size={18} />
              </Link>
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
          <div className={styles.hamburger}>
            <Hamburger toggle={toggle} toggled={toggled} />
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
