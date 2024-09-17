import { Goldman } from "next/font/google";
import Link from "next/link";
import styles from "./style.module.css";

const goldman = Goldman({ subsets: ["latin"], weight: ["400", "700"] });

export default function News(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.h1Wrapper}>
        <h1 className={`${goldman.className} ${styles.h1}`}>NEWS</h1>
      </div>
      <div className={styles.container}>
        <ul className={styles.list}>
          {[
            {
              date: "2024.08.29",
              title: "ラブボックス9月期の活動について",
            },
            {
              date: "2024.08.13",
              title: "「夜燈ちゆ」卒業に関するお知らせ",
            },
            {
              date: "2024.08.13",
              title: "「ラブボックス2ndライブ」グッズ事後販売開始のお知らせ",
            },
          ].map(({ date, title }) => (
            <li key={title}>
              <Link className={styles.link} href="/news">
                <div className={`${goldman.className} ${styles.date}`}>
                  {date}
                </div>
                <div className={styles.title}>{title}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
