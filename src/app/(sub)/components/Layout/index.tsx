"use client";
import Hamburger from "hamburger-react";
import { Dela_Gothic_One as DelaGothicOne } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { SocialIcon } from "react-social-icons";
import Spacer from "react-spacer";
import validUrl from "valid-url";
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
    useShallow((state) => ({ toggle: state.toggle, toggled: state.toggled })),
  );

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.inner}>
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
          <nav>
            <ul className={styles.list}>
              {menuList.map(({ href, text }) => (
                <li key={href}>
                  <Link
                    className={`${delaGothicOne.className} ${styles.link}`}
                    href={href}
                    target={validUrl.isWebUri(href) ? "_blank" : "_self"}
                  >
                    <span>{text}</span>
                    {validUrl.isWebUri(href) ? (
                      <FaExternalLinkAlt size={18} />
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className={styles.iconList}>
            <li>
              <SocialIcon
                bgColor="#f89eac"
                className={styles.socialIcon}
                fgColor="#fff"
                target="_blank"
                url="https://www.youtube.com/@lovvebox"
              />
            </li>
            <li>
              <SocialIcon
                bgColor="#f89eac"
                className={styles.socialIcon}
                fgColor="#fff"
                target="_blank"
                url="https://x.com/lovvebox"
              />
            </li>
          </ul>
          <div className={styles.hamburger}>
            <Hamburger toggle={toggle} toggled={toggled} />
          </div>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
