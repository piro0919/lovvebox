"use client";
import Color from "color";
import dayjs from "dayjs";
import { backOut } from "eases";
import { motion } from "framer-motion";
import { MicroCMSContentId, MicroCMSDate } from "microcms-ts-sdk";
import { Zen_Maru_Gothic as ZenMaruGothic } from "next/font/google";
import Image from "next/image";
import { useMemo } from "react";
import { IoMdRefreshCircle } from "react-icons/io";
import { SocialIcon } from "react-social-icons";
import { useCounter } from "usehooks-ts";
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
    color,
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
  const { count, increment } = useCounter(0);
  const {
    height: imageHeight,
    url,
    width,
  } = useMemo(() => images[count % images.length], [count, images]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <motion.button
          animate={{ rotate: count * 360 }}
          className={styles.refreshButton}
          onClick={() => increment()}
          transition={{
            duration: 1,
            ease: backOut,
          }}
        >
          <IoMdRefreshCircle color={color} size={48} />
        </motion.button>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className={styles.imageContainer}
          initial={{ opacity: 0, y: 48 }}
          key={count}
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
          style={{
            borderColor: Color(color).lighten(0.125).toString(),
            color,
          }}
          transition={{
            delay: 0.6,
            duration: 0.5,
            ease: backOut,
          }}
        >
          <div className={styles.nameWrapper}>
            <h1
              className={`${zenMaruGothic.className} ${styles.name}`}
              style={{
                textShadow: `2px 0 ${color},
                  -2px 0 ${color},
                  0 -2px ${color},
                  0 2px ${color},
                  2px 2px ${color},
                  -2px 2px ${color},
                  2px -2px ${color},
                  -2px -2px ${color},
                  1px 2px ${color},
                  -1px 2px ${color},
                  1px -2px ${color},
                  -1px -2px ${color},
                  2px 1px ${color},
                  -2px 1px ${color},
                  2px -1px ${color},
                  -2px -1px ${color},
                  6px 6px 0 ${Color(color).alpha(0.5).toString()}`,
              }}
            >
              {name}
            </h1>
            <div className={styles.furigana}>{furigana}</div>
          </div>
          <p className={styles.profile}>{profile}</p>
          <dl className={styles.dl}>
            <div className={styles.di} style={{ borderColor: color }}>
              <dt className={styles.dt} style={{ borderColor: color }}>
                誕生日
              </dt>
              <dd className={styles.dd}>{dayjs(birthday).format("M月D日")}</dd>
            </div>
            <div className={styles.di} style={{ borderColor: color }}>
              <dt className={styles.dt} style={{ borderColor: color }}>
                初配信日
              </dt>
              <dd className={styles.dd}>
                {dayjs(debut).format("YYYY年M月D日")}
              </dd>
            </div>
            <div className={styles.di} style={{ borderColor: color }}>
              <dt className={styles.dt} style={{ borderColor: color }}>
                身長
              </dt>
              <dd className={styles.dd}>{`${height}㎝`}</dd>
            </div>
            {graduation ? (
              <div className={styles.di} style={{ borderColor: color }}>
                <dt className={styles.dt} style={{ borderColor: color }}>
                  卒業日
                </dt>
                <dd className={styles.dd}>
                  {dayjs(graduation).format("YYYY年M月D日")}
                </dd>
              </div>
            ) : null}
          </dl>
          <div className={styles.socialIconsWrapper}>
            <SocialIcon
              bgColor={color}
              className={styles.socialIcon}
              fgColor="#fff"
              target="_blank"
              url={`https://www.youtube.com/${youtubeId}`}
            />
            <SocialIcon
              bgColor={color}
              className={styles.socialIcon}
              fgColor="#fff"
              target="_blank"
              url={`https://x.com/${twitterId}`}
            />
            <SocialIcon
              bgColor={color}
              className={styles.socialIcon}
              fgColor="#fff"
              target="_blank"
              url={`https://www.instagram.com/${instagramId}`}
            />
            <SocialIcon
              bgColor={color}
              className={styles.socialIcon}
              fgColor="#fff"
              target="_blank"
              url={`https://www.tiktok.com/${tiktokId}`}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
