"use client";
import dayjs from "dayjs";
import { backOut } from "eases";
import { motion } from "framer-motion";
import { MicroCMSGetListResponse } from "microcms-ts-sdk";
import { Goldman, Racing_Sans_One as RacingSansOne } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";

const goldman = Goldman({ subsets: ["latin"], weight: ["700"] });
const racingSansOne = RacingSansOne({ subsets: ["latin"], weight: "400" });

type NewsListResponse = MicroCMSGetListResponse<
  MicroCMS.Endpoints,
  {
    endpoint: "news";
  }
>;

export type NewsProps = {
  newsListResponse: Omit<NewsListResponse, "contents"> & {
    contents: Pick<
      NewsListResponse["contents"][number],
      | "createdAt"
      | "id"
      | "pastPublishedAt"
      | "publishedAt"
      | "thumbnail"
      | "title"
    >[];
  };
};

export default function News({
  newsListResponse: { contents: newsListContents },
}: NewsProps): JSX.Element {
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
        <h1 className={`${racingSansOne.className} ${styles.h1}`}>NEWS</h1>
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
        <ul className={styles.list}>
          {newsListContents.map(
            ({
              createdAt,
              id,
              pastPublishedAt,
              publishedAt,
              thumbnail,
              title,
            }) => (
              <li className={styles.item} key={title}>
                <Link className={styles.link} href={`/news/${id}`}>
                  <div className={styles.thumbnail}>
                    <Image
                      alt={title}
                      fill={true}
                      quality={100}
                      src={thumbnail ? thumbnail.url : "/background.png"}
                    />
                  </div>
                  <div className={`${goldman.className} ${styles.date}`}>
                    {dayjs(pastPublishedAt ?? publishedAt ?? createdAt).format(
                      "YYYY.MM.DD",
                    )}
                  </div>
                  <div className={styles.title}>{title}</div>
                </Link>
              </li>
            ),
          )}
        </ul>
      </motion.div>
    </div>
  );
}
