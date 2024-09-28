"use client";
import { backOut } from "eases";
import { motion } from "framer-motion";
import { MicroCMSContentId, MicroCMSDate } from "microcms-ts-sdk";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import styles from "./style.module.css";

export type NewsDetailProps = {
  newsListDetailResponse: MicroCMS.News &
    MicroCMSContentId &
    MicroCMSDate & {
      [key: string]: unknown;
    };
};

export default function NewsDetail({
  newsListDetailResponse: { content, title },
}: NewsDetailProps): JSX.Element {
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
        <h1 className={styles.h1}>{title}</h1>
      </div>
      <div className={styles.container}>
        <ReactMarkdown
          className={styles.reactMarkdown}
          components={{
            ol: ({ children }) => <ol className={styles.ol}>{children}</ol>,
            ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
          }}
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkBreaks, remarkGfm]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </motion.div>
  );
}
