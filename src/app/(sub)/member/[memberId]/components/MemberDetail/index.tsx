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
        furigana,
        images: [{ height, url, width }],
        name,
        profile,
      },
    ],
  },
}: MemberDetailProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div
          className={styles.imageWrapper}
          style={{ aspectRatio: `${width}/${height}` }}
        >
          <Image
            alt={name}
            className={styles.image}
            fill={true}
            quality={100}
            src={`${url}?fit=clamp&w=600`}
          />
        </div>
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
              <dd className={styles.dd}>12月8日</dd>
            </div>
            <div className={styles.di}>
              <dt className={styles.dt}>初配信日</dt>
              <dd className={styles.dd}>2018年10月27日</dd>
            </div>
            <div className={styles.di}>
              <dt className={styles.dt}>身長</dt>
              <dd className={styles.dd}>160㎝</dd>
            </div>
          </dl>
          <div className={styles.socialIconsWrapper}>
            <SocialIcon
              className={styles.socialIcon}
              target="__blankblank"
              url="https://www.youtube.com/@ribbon_lvv"
            />
            <SocialIcon
              className={styles.socialIcon}
              target="__blankblank"
              url="https://x.com/ribbon_lvv"
            />
            {/* <SocialIcon
              className={styles.socialIcon}
              target="__blankblank"
              url="https://www.instagram.com/ribbon_lvv/"
            />
            <SocialIcon
              className={styles.socialIcon}
              target="__blankblank"
              url="https://www.tiktok.com/@ribbon_lvv"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
