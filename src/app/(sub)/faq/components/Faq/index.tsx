"use client";
import { backOut } from "eases";
import { motion } from "framer-motion";
import { MicroCMSDate } from "microcms-ts-sdk";
import { Goldman } from "next/font/google";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import styles from "./style.module.css";

const goldman = Goldman({ subsets: ["latin"], weight: ["400", "700"] });

export type FaqProps = {
  documentObjectResponse: MicroCMS.Document &
    MicroCMSDate & {
      [key: string]: unknown;
    };
};

export default function Faq({
  documentObjectResponse: { faq },
}: FaqProps): JSX.Element {
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
        <h1 className={`${goldman.className} ${styles.h1}`}>FAQ</h1>
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
          {faq}
        </ReactMarkdown>
      </motion.div>
    </div>
  );
}
