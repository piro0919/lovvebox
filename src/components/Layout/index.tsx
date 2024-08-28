"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ReactNode } from "react";
import useShowWindowSize from "use-show-window-size";
import Footer from "../Footer";
import styles from "./style.module.css";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  useShowWindowSize({
    disable: process.env.NODE_ENV === "production",
  });

  return (
    <>
      <div className={styles.wrapper}>
        {children}
        <Footer />
      </div>
      <ProgressBar color="#fff" height="1px" />
    </>
  );
}
