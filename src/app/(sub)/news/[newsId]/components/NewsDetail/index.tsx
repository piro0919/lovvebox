"use client";
import dayjs from "dayjs";
import { backOut } from "eases";
import { motion } from "framer-motion";
import { MicroCMSContentId, MicroCMSDate } from "microcms-ts-sdk";
import { Goldman } from "next/font/google";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import styles from "./style.module.css";

const goldman = Goldman({ subsets: ["latin"], weight: ["400", "700"] });

export type NewsDetailProps = {
  newsListDetailResponse: MicroCMS.News &
    MicroCMSContentId &
    MicroCMSDate & {
      [key: string]: unknown;
    };
};

export default function NewsDetail({
  newsListDetailResponse: {
    content,
    createdAt,
    pastPublishedAt,
    publishedAt,
    title,
  },
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
        <div>
          <div className={`${goldman.className} ${styles.date}`}>
            {dayjs(pastPublishedAt ?? publishedAt ?? createdAt).format(
              "YYYY.MM.DD"
            )}
          </div>
          <h1 className={styles.h1}>{title}</h1>
        </div>
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
