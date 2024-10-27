"use client";
import Color from "color";
import { backOut } from "eases";
import { motion } from "framer-motion";
import { MicroCMSGetListResponse } from "microcms-ts-sdk";
import {
  M_PLUS_1 as MPLUS1,
  Racing_Sans_One as RacingSansOne,
} from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useCounter } from "usehooks-ts";
import styles from "./style.module.css";

const racingSansOne = RacingSansOne({ subsets: ["latin"], weight: "400" });
const mPlus1 = MPLUS1({ subsets: ["latin"], weight: "800" });

export type MemberProps = {
  memberListResponse: MicroCMSGetListResponse<
    MicroCMS.Endpoints,
    {
      endpoint: "member";
    }
  >;
};

export default function Member({
  memberListResponse: { contents: memberListContents },
}: MemberProps): JSX.Element {
  const { count: loadedCount, increment: loadedIncrement } = useCounter(0);
  const loaded = useMemo(
    () => loadedCount >= memberListContents.length,
    [loadedCount, memberListContents.length],
  );

  return (
    <>
      <div className={styles.wrapper}>
        <motion.div
          animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
          className={styles.h1Wrapper}
          initial={{ opacity: 0, y: 48 }}
          transition={{
            delay: 0.5,
            duration: 0.5,
            ease: backOut,
          }}
        >
          <h1 className={`${racingSansOne.className} ${styles.h1}`}>MEMBER</h1>
        </motion.div>
        <motion.div
          animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
          className={styles.container}
          initial={{ opacity: 0, y: 48 }}
          transition={{
            delay: 0.6,
            duration: 0.5,
            ease: backOut,
          }}
        >
          <ul className={styles.list}>
            {memberListContents
              .map(
                ({ color, graduation, id, images: [{ url }], name }, index) => (
                  <li className={styles.item} key={id}>
                    <Link className={styles.link} href={`/member/${id}`}>
                      <div
                        className={styles.background}
                        style={{ background: color }}
                      />
                      {graduation ? (
                        <Image
                          alt=""
                          className={styles.sakura}
                          height={72}
                          src="/sakura.png"
                          width={72}
                        />
                      ) : null}
                      <div className={styles.imageContainer}>
                        <motion.div
                          animate={
                            loaded
                              ? { opacity: graduation ? 0.5 : 1, scale: 1 }
                              : { opacity: 0, scale: 0.75 }
                          }
                          className={styles.imageWrapper}
                          initial={{ opacity: 0, scale: 0.75 }}
                          transition={{
                            delay:
                              0.6 + (memberListContents.length - index) * 0.1,
                            duration: 0.5,
                            ease: backOut,
                          }}
                        >
                          <Image
                            alt={name}
                            className={styles.image}
                            fill={true}
                            quality={100}
                            src={`${url}?fit=clamp&w=1000`}
                          />
                        </motion.div>
                      </div>
                      <div
                        className={`${mPlus1.className} ${styles.name}`}
                        style={{
                          textShadow: `0px 1px ${color}, 1px 0px ${color}, 0px -1px ${color}, -1px 0px ${color}, 3px 3px ${Color(color).alpha(0.5).toString()}`,
                        }}
                      >
                        {name}
                      </div>
                    </Link>
                  </li>
                ),
              )
              .reverse()}
          </ul>
        </motion.div>
      </div>
      {memberListContents.map(({ images: [{ url }], name }) => (
        <Image
          alt={name}
          fill={true}
          key={url}
          onLoad={() => loadedIncrement()}
          quality={100}
          src={`${url}?fit=clamp&w=1000`}
          style={{
            opacity: 0,
            overflow: "hidden",
          }}
        />
      ))}
    </>
  );
}
