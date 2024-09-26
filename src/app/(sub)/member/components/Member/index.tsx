"use client";
import { backOut } from "eases";
import { motion } from "framer-motion";
import { MicroCMSGetListResponse } from "microcms-ts-sdk";
import { Goldman, M_PLUS_1 as MPLUS1 } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";

const goldman = Goldman({ subsets: ["latin"], weight: ["400", "700"] });
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
        <h1 className={`${goldman.className} ${styles.h1}`}>MEMBER</h1>
      </div>
      <div className={styles.container}>
        <ul className={styles.list}>
          {memberListContents
            .map(({ color, id, images: [{ url }], name }, index) => (
              <li className={styles.item} key={id}>
                <Link className={styles.link} href={`/member/${id}`}>
                  <div
                    className={styles.background}
                    style={{ background: color }}
                  />
                  <div className={styles.imageContainer}>
                    <motion.div
                      animate={{ opacity: 1, scale: 1 }}
                      className={styles.imageWrapper}
                      initial={{ opacity: 0, scale: 0.75 }}
                      transition={{
                        delay: 0.5 + (memberListContents.length - index) * 0.1,
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
                      textShadow: `0px 1px ${color}, 1px 0px ${color}, 0px -1px ${color}, -1px 0px ${color}, 3px 3px ${color}`,
                    }}
                  >
                    {name}
                  </div>
                </Link>
              </li>
            ))
            .reverse()}
        </ul>
      </div>
    </motion.div>
  );
}
