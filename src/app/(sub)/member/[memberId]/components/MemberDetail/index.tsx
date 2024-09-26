"use client";
import dayjs from "dayjs";
import { backOut } from "eases";
import { motion } from "framer-motion";
import { MicroCMSContentId, MicroCMSDate } from "microcms-ts-sdk";
import { Zen_Maru_Gothic as ZenMaruGothic } from "next/font/google";
import Image from "next/image";
import { useMemo, useState } from "react";
import { IoMdRefreshCircle } from "react-icons/io";
import { SocialIcon } from "react-social-icons";
import styles from "./style.module.css";

const zenMaruGothic = ZenMaruGothic({ subsets: ["latin"], weight: "500" });

export type MemberDetailProps = {
  memberListDetailResponse: MicroCMS.Member &
    MicroCMSContentId &
    MicroCMSDate & {
      [key: string]: unknown;
    };
};

export default function MemberDetail({
  memberListDetailResponse: {
    birthday,
    debut,
    furigana,
    graduation,
    height,
    images,
    instagramId,
    name,
    profile,
    tiktokId,
    twitterId,
    youtubeId,
  },
}: MemberDetailProps): JSX.Element {
  const [index, setIndex] = useState(0);
  const {
    height: imageHeight,
    url,
    width,
  } = useMemo(() => images[index], [images, index]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button
          className={styles.refreshButton}
          onClick={() =>
            setIndex((prevIndex) =>
              prevIndex + 1 === images.length ? 0 : prevIndex + 1
            )
          }
        >
          <IoMdRefreshCircle size={48} />
        </button>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className={styles.imageContainer}
          initial={{ opacity: 0, y: 48 }}
          key={index}
          transition={{
            delay: 0.5,
            duration: 0.5,
            ease: backOut,
          }}
        >
          <div
            className={styles.imageWrapper}
            style={{
              aspectRatio: `${width}/${imageHeight}`,
            }}
          >
            <Image
              alt={name}
              className={styles.image}
              fill={true}
              quality={100}
              src={`${url}?fit=clamp&w=1000`}
            />
          </div>
        </motion.div>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className={styles.detail}
          initial={{ opacity: 0, y: 48 }}
          transition={{
            delay: 0.6,
            duration: 0.5,
            ease: backOut,
          }}
        >
          <div className={styles.nameWrapper}>
            <h1 className={`${zenMaruGothic.className} ${styles.name}`}>
              {name}
            </h1>
            <div className={styles.furigana}>{furigana}</div>
          </div>
          <p className={styles.profile}>{profile}</p>
          <dl className={styles.dl}>
            <div className={styles.di}>
              <dt className={styles.dt}>誕生日</dt>
              <dd className={styles.dd}>{dayjs(birthday).format("M月D日")}</dd>
            </div>
            <div className={styles.di}>
              <dt className={styles.dt}>初配信日</dt>
              <dd className={styles.dd}>
                {dayjs(debut).format("YYYY年M月D日")}
              </dd>
            </div>
            <div className={styles.di}>
              <dt className={styles.dt}>身長</dt>
              <dd className={styles.dd}>{`${height}㎝`}</dd>
            </div>
            {graduation ? (
              <div className={styles.di}>
                <dt className={styles.dt}>卒業日</dt>
                <dd className={styles.dd}>
                  {dayjs(graduation).format("YYYY年M月D日")}
                </dd>
              </div>
            ) : null}
          </dl>
          <div className={styles.socialIconsWrapper}>
            <SocialIcon
              className={styles.socialIcon}
              target="_blank"
              url={`https://www.youtube.com/${youtubeId}`}
            />
            <SocialIcon
              className={styles.socialIcon}
              target="_blank"
              url={`https://x.com/${twitterId}`}
            />
            <SocialIcon
              className={styles.socialIcon}
              target="_blank"
              url={`https://www.instagram.com/${instagramId}`}
            />
            <SocialIcon
              className={styles.socialIcon}
              target="_blank"
              url={`https://www.tiktok.com/${tiktokId}`}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
