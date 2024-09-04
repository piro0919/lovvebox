import { Goldman } from "next/font/google";
import Image from "next/image";
import styles from "./style.module.css";

const goldman = Goldman({ subsets: ["latin"], weight: ["400", "700"] });

export default function Member(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.h1Wrapper}>
        <h1 className={`${goldman.className} ${styles.h1}`}>MEMBER</h1>
      </div>
      <div className={styles.container}>
        <ul className={styles.list}>
          {[
            {
              color: "#e98791",
              image: "/sakura-ribbon01.png",
              name: "咲愛りぼん",
            },
            {
              color: "#8393d2",
              image: "/aozora-kanon01.png",
              name: "葵空かのん",
            },
            {
              color: "#90af83",
              image: "/inumori-yomogi01.png",
              name: "狗森よもぎ",
            },
            {
              color: "#7dd6e6",
              image: "/amane-nyashiro01.png",
              name: "天猫にゃしろ",
            },
            {
              color: "#f1bf72",
              image: "/yato-chiyu01.png",
              name: "夜燈ちゆ",
            },
          ].map(({ color, image, name }) => (
            <li className={styles.item} key={image}>
              <div
                className={`${styles.background} pattern-diagonal-stripes-md`}
                style={{ borderColor: color, color }}
              />
              <div className={styles.imageWrapper}>
                <Image
                  alt={name}
                  className={styles.image}
                  fill={true}
                  quality={100}
                  src={image}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
