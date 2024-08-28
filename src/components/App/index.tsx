"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import useMeasure from "react-use-measure";
import styles from "./style.module.css";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function App(): JSX.Element {
  const [ref, { height, width }] = useMeasure();

  return (
    <div className={styles.wrapper}>
      <div className={styles.top} ref={ref}>
        <div
          className={styles.reactPlayer}
          style={
            height / 9 > width / 16
              ? { width: (height / 9) * 16 }
              : { height: (width / 16) * 9 }
          }
        >
          <ReactPlayer
            height="100%"
            loop={true}
            muted={true}
            playing={true}
            url={[
              "https://www.youtube.com/watch?v=U0MtK4R-asc",
              "https://www.youtube.com/watch?v=ViIM8MuIJO8",
            ]}
            width="100%"
          />
        </div>
        <div className={`${styles.pattern} pattern-cross-dots-md `}>
          <div className={styles.logo}>
            <Image
              alt="ラブボックス"
              fill={true}
              quality={100}
              src="/logo.png"
            />
          </div>
          <h1 className={styles.h1}>ラブボックス公式サイト</h1>
        </div>
      </div>
      <aside className={styles.aside}>
        <nav>
          <ul className={styles.list}>
            <li>
              <Link href="/">トップ</Link>
            </li>
            <li>
              <Link href="/news">ニュース</Link>
            </li>
            <li>
              <Link href="/member">メンバー</Link>
            </li>
            <li>
              <Link href="/about">ラブボックスとは？</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main>
        <article className={styles.article}>
          <h2 className={styles.h2}>ニュース</h2>
          <div className={styles.container}>aaa</div>
        </article>
        <article className={styles.article}>
          <h2 className={styles.h2}>メンバー</h2>
          <div className={styles.container}>bbb</div>
        </article>
      </main>
    </div>
  );
}
