"use client";
import { backOut } from "eases";
import { motion } from "framer-motion";
import { Racing_Sans_One as RacingSansOne } from "next/font/google";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import styles from "./style.module.css";
import useContactStore from "@/stores/useContactStore";

const racingSansOne = RacingSansOne({ subsets: ["latin"], weight: "400" });

export default function ThankYou(): JSX.Element {
  const { clearValues } = useContactStore(
    useShallow((state) => ({
      clearValues: state.clearValues,
    })),
  );

  useEffect(() => {
    clearValues();
  }, [clearValues]);

  return (
    <div className={styles.wrapper}>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className={styles.h1Wrapper}
        initial={{ opacity: 0, y: 48 }}
        transition={{
          delay: 0.5,
          duration: 0.5,
          ease: backOut,
        }}
      >
        <h1 className={`${racingSansOne.className} ${styles.h1}`}>THANK YOU</h1>
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className={styles.container}
        initial={{ opacity: 0, y: 48 }}
        transition={{
          delay: 0.6,
          duration: 0.5,
          ease: backOut,
        }}
      >
        <p className={styles.description}>
          ありがとうございます。
          <br />
          お問い合わせを受け付けました。
        </p>
      </motion.div>
    </div>
  );
}
