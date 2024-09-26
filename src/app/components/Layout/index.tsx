"use client";
import i18next from "i18next";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ReactNode } from "react";
import useShowWindowSize from "use-show-window-size";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/ja/zod.json";
import Drawer from "../Drawer";
import Footer from "../Footer";
import styles from "./style.module.css";

void i18next.init({
  lng: "ja",
  resources: {
    ja: { zod: translation },
  },
});

z.setErrorMap(zodI18nMap);

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  useShowWindowSize({
    disable: process.env.NODE_ENV === "production",
  });

  return (
    <>
      <Drawer />
      <div className={styles.wrapper}>
        <div>{children}</div>
        <Footer />
      </div>
      <ProgressBar color="#fff" height="1px" />
    </>
  );
}
