"use client";
import dayjs from "dayjs";
import { quintOut } from "eases";
import { motion } from "framer-motion";
import { MicroCMSGetListResponse } from "microcms-ts-sdk";
import { Zen_Maru_Gothic as ZenMaruGothic } from "next/font/google";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";
import styles from "./style.module.css";

const zenMaruGothic = ZenMaruGothic({ subsets: ["latin"], weight: "500" });

export type MemberDetailProps = {
  memberListResponse: MicroCMSGetListResponse<
    MicroCMS.Endpoints,
    {
      endpoint: "member";
    }
  >;
};

export default function MemberDetail({
  memberListResponse: {
    contents: [
      {
        birthday,
        debut,
        furigana,
        graduation,
        height,
        images: [{ height: imageHeight, url, width }],
        instagramId,
        name,
        profile,
        tiktokId,
        twitterId,
        youtubeId,
      },
    ],
  },
}: MemberDetailProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className={styles.imageContainer}
          initial={{ opacity: 0, scale: 0.75 }}
          transition={{
            delay: 0.5,
            duration: 0.75,
            ease: quintOut,
          }}
        >
          <div
            className={styles.imageWrapper}
            style={{ aspectRatio: `${width}/${imageHeight}` }}
          >
            <Image
              alt={name}
              className={styles.image}
              fill={true}
              quality={100}
              src={`${url}?fit=clamp&w=600`}
            />
          </div>
        </motion.div>
        <div className={styles.detail}>
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
        </div>
      </div>
    </div>
  );
}
