"use client";
import { backOut } from "eases";
import { motion } from "framer-motion";
import { MicroCMSDate } from "microcms-ts-sdk";
import { Racing_Sans_One as RacingSansOne } from "next/font/google";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import styles from "./style.module.css";

const racingSansOne = RacingSansOne({ subsets: ["latin"], weight: "400" });

export type PrivacyPolicyProps = {
  documentObjectResponse: MicroCMS.Document &
    MicroCMSDate & {
      [key: string]: unknown;
    };
};

export default function PrivacyPolicy({
  documentObjectResponse: { privacypolicy },
}: PrivacyPolicyProps): JSX.Element {
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
        <h1 className={`${racingSansOne.className} ${styles.h1}`}>
          PRIVACY POLICY
        </h1>
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
        <ReactMarkdown
          className={styles.reactMarkdown}
          components={{
            ol: ({ children }) => <ol className={styles.ol}>{children}</ol>,
            ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
          }}
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkBreaks, remarkGfm]}
        >
          {privacypolicy}
        </ReactMarkdown>
      </motion.div>
    </div>
  );
}
