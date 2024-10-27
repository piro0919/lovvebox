"use client";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import i18next from "i18next";
import { usePathname } from "next/navigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ReactNode, useEffect } from "react";
import useShowWindowSize from "use-show-window-size";
import { useBoolean } from "usehooks-ts";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/ja/zod.json";
import { useShallow } from "zustand/shallow";
import Drawer from "../Drawer";
import Footer from "../Footer";
import styles from "./style.module.css";
import useDrawerStore from "@/stores/useDrawerStore";

void i18next.init({
  lng: "ja",
  resources: {
    ja: { zod: translation },
  },
});

z.setErrorMap(zodI18nMap);

type PageBorderProps = {
  children: ReactNode;
};

function PageBorder({ children }: PageBorderProps): JSX.Element {
  return (
    <div className={styles.borderWrapper}>
      <div className={styles.borderInner}>{children}</div>
      <div className={`${styles.corner} ${styles.cornerTopLeft}`} />
      <div className={`${styles.corner} ${styles.cornerTopRight}`} />
      <div className={`${styles.corner} ${styles.cornerBottomRight}`} />
      <div className={`${styles.corner} ${styles.cornerBottomLeft}`} />
    </div>
  );
}

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  const { setIsOpen } = useDrawerStore(
    useShallow((state) => ({
      setIsOpen: state.setIsOpen,
    })),
  );
  const pathname = usePathname();
  const { setTrue: onInit, value: init } = useBoolean(false);

  useShowWindowSize({
    disable: process.env.NODE_ENV === "production",
  });

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  useEffect(() => {
    const callback = async (): Promise<void> => {
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });

      onInit();
    };

    void callback();
  }, [onInit]);

  return (
    <>
      <Drawer />
      <PageBorder>
        {init ? (
          <Particles
            options={{
              background: {
                color: {
                  value: "transparent",
                },
              },
              fullScreen: {
                enable: true,
                zIndex: -1,
              },
              interactivity: {
                events: {
                  onClick: {
                    enable: false,
                  },
                  onHover: {
                    enable: false,
                  },
                },
              },
              particles: {
                color: {
                  value: "#fff",
                },
                move: {
                  direction: "top",
                  enable: true,
                  speed: 2,
                },
                number: {
                  density: {
                    enable: true,
                  },
                  value: 100,
                },
                opacity: {
                  value: { max: 0.75, min: 0 },
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { max: 25, min: 0 },
                },
                wobble: {
                  distance: 5,
                  enable: true,
                  speed: {
                    angle: 10,
                    move: 10,
                  },
                },
              },
            }}
          />
        ) : null}
        <div>{children}</div>
        <Footer />
      </PageBorder>
      <ProgressBar color="#fff" height="3px" />
    </>
  );
}
