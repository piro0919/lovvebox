"use client";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { backOut } from "eases";
import { motion } from "framer-motion";
import { MicroCMSContentId, MicroCMSDate } from "microcms-ts-sdk";
import { Goldman } from "next/font/google";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { getNewsListDetail } from "./actions";
import styles from "./style.module.css";

const goldman = Goldman({ subsets: ["latin"], weight: ["400", "700"] });

export type NewsDetailProps = {
  newsId: string;
  newsListDetailResponse: Pick<
    MicroCMS.News &
      MicroCMSContentId &
      MicroCMSDate & {
        [key: string]: unknown;
      },
    "content" | "createdAt" | "publishedAt" | "title"
  >;
};

export default function NewsDetail({
  newsId,
  newsListDetailResponse: initialNewsListDetailResponse,
}: NewsDetailProps): JSX.Element {
  const {
    data: { content, createdAt, publishedAt, title },
  } = useQuery({
    initialData: initialNewsListDetailResponse,
    queryFn: ({ queryKey: [, newsId] }) => getNewsListDetail({ newsId }),
    queryKey: ["getNewsListDetail", newsId],
  });

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
        <div>
          <div className={`${goldman.className} ${styles.date}`}>
            {dayjs(publishedAt ?? createdAt).format("YYYY.MM.DD")}
          </div>
          <h1 className={styles.h1}>{title}</h1>
        </div>
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
          {content}
        </ReactMarkdown>
      </motion.div>
    </div>
  );
}
