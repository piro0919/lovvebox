"use client";
import { backOut } from "eases";
import { motion } from "framer-motion";
import { Goldman } from "next/font/google";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import styles from "./style.module.css";
import useContactStore from "@/stores/useContactStore";

const goldman = Goldman({ subsets: ["latin"], weight: ["700"] });

export default function ThankYou(): JSX.Element {
  const { clearValues } = useContactStore(
    useShallow((state) => ({
      clearValues: state.clearValues,
    }))
  );

  useEffect(() => {
    clearValues();
  }, [clearValues]);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={styles.wrapper}
      initial={{ opacity: 0, y: 48 }}
      transition={{
        delay: 0.5,
        duration: 0.5,
        ease: backOut,
      }}
    >
      <div className={styles.h1Wrapper}>
        <h1 className={`${goldman.className} ${styles.h1}`}>THANK YOU</h1>
      </div>
      <div className={styles.container}>
        <p className={styles.description}>
          お問い合わせありがとうございます。
          <br />
          お問い合わせを受け付けました。
        </p>
      </div>
    </motion.div>
  );
}
