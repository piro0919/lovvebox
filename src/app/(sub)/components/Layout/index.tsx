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
import menuList from "@/utils/menuList";

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
            {menuList.map(({ href, text }) => (
              <li key={href}>
                <Link
                  className={`${delaGothicOne.className} ${styles.link}`}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : "_self"}
                >
                  <span>{text}</span>
                  {href.startsWith("http") ? (
                    <FaExternalLinkSquareAlt size={18} />
                  ) : null}
                </Link>
              </li>
            ))}
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
