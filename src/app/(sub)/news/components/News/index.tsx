"use client";
import dayjs from "dayjs";
import { backOut } from "eases";
import { motion } from "framer-motion";
import { MicroCMSGetListResponse } from "microcms-ts-sdk";
import { Goldman } from "next/font/google";
import Link from "next/link";
import styles from "./style.module.css";

const goldman = Goldman({ subsets: ["latin"], weight: ["400", "700"] });

export type NewsProps = {
  newsListResponse: MicroCMSGetListResponse<
    MicroCMS.Endpoints,
    {
      endpoint: "news";
    }
  >;
};

export default function News({
  newsListResponse: { contents: newsListContents },
}: NewsProps): JSX.Element {
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
        <h1 className={`${goldman.className} ${styles.h1}`}>NEWS</h1>
      </div>
      <div className={styles.container}>
        <ul className={styles.list}>
          {newsListContents.map(({ createdAt, id, publishedAt, title }) => (
            <li key={title}>
              <Link className={styles.link} href={`/news/${id}`}>
                <div className={`${goldman.className} ${styles.date}`}>
                  {dayjs(publishedAt ?? createdAt).format("YYYY.MM.DD")}
                </div>
                <div className={styles.title}>{title}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
