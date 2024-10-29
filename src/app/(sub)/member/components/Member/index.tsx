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
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useCounter } from "usehooks-ts";
import styles from "./style.module.css";

const racingSansOne = RacingSansOne({ subsets: ["latin"], weight: "400" });
const mPlus1 = MPLUS1({ subsets: ["latin"], weight: "800" });

type MemberListResponse = MicroCMSGetListResponse<
  MicroCMS.Endpoints,
  {
    endpoint: "member";
  }
>;

export type MemberProps = {
  memberListResponse: Omit<MemberListResponse, "contents"> & {
    contents: Pick<
      MemberListResponse["contents"][number],
      "color" | "graduation" | "group" | "id" | "images" | "name"
    >[];
  };
};

export default function Member({
  memberListResponse: { contents: memberListContents },
}: MemberProps): JSX.Element {
  const { count: loadedCount, increment: loadedIncrement } = useCounter(0);
  const loaded = useMemo(
    () => loadedCount >= memberListContents.length,
    [loadedCount, memberListContents.length],
  );
  const groups = useMemo(
    () =>
      Array.from(
        new Set(memberListContents.map(({ group: [group] }) => group)),
      ).reverse(),
    [memberListContents],
  );
  const searchParams = useSearchParams();
  const currentGroup = useMemo(
    () => searchParams.get("group") ?? "ALL",
    [searchParams],
  );
  const filterdMemberListContents = useMemo(
    () =>
      memberListContents.filter(
        ({ group: [group] }) =>
          currentGroup === "ALL" || group === currentGroup,
      ),
    [currentGroup, memberListContents],
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
        <div className={styles.container}>
          <motion.div
            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
            initial={{ opacity: 0, y: 48 }}
            transition={{
              delay: 0.6,
              duration: 0.5,
              ease: backOut,
            }}
          >
            <ul className={styles.linkList}>
              <li>
                <Link
                  className={`${styles.link2} ${currentGroup === "ALL" ? styles.active : ""}`}
                  href="/member?group=ALL"
                >
                  ALL
                </Link>
              </li>
              {groups.map((group) => (
                <li key={group}>
                  <Link
                    className={`${styles.link2} ${currentGroup === group ? styles.active : ""}`}
                    href={`/member?group=${group}`}
                  >
                    {group}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
            initial={{ opacity: 0, y: 48 }}
            key={currentGroup}
            transition={{
              delay: 0.6,
              duration: 0.5,
              ease: backOut,
            }}
          >
            <ul className={styles.list}>
              {filterdMemberListContents
                .map(
                  (
                    { color, graduation, id, images: [{ url }], name },
                    index,
                  ) => (
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
                                0.6 +
                                (filterdMemberListContents.length - index) *
                                  0.1,
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
