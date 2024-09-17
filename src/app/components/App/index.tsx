"use client";
import { MicroCMSGetListResponse } from "microcms-ts-sdk";
import dynamic from "next/dynamic";
import {
  Dela_Gothic_One as DelaGothicOne,
  Goldman,
  Zen_Maru_Gothic as ZenMaruGothic,
} from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import Spacer from "react-spacer";
import useMeasure from "react-use-measure";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./style.module.css";

const goldman = Goldman({ subsets: ["latin"], weight: ["400", "700"] });
const delaGothicOne = DelaGothicOne({ subsets: ["latin"], weight: "400" });
const zenMaruGothic = ZenMaruGothic({ subsets: ["latin"], weight: "500" });
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export type AppProps = {
  memberListResponse: MicroCMSGetListResponse<
    MicroCMS.Endpoints,
    {
      endpoint: "member";
    }
  >;
};

export default function App({
  memberListResponse: { contents: memberListContents },
}: AppProps): JSX.Element {
  const reversedMemberListContents = useMemo(
    () => memberListContents.reverse(),
    [memberListContents]
  );
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
              src="/logo02.png"
            />
          </div>
          <h1 className={styles.h1}>ラブボックス公式サイト</h1>
        </div>
      </div>
      <aside className={styles.aside}>
        <nav className={styles.nav}>
          <Link href="/">
            <Image
              alt="ラブボックス"
              height={250 / 6}
              quality={100}
              src="/logo01.png"
              width={1000 / 6}
            />
          </Link>
          <Spacer grow={1} />
          <ul className={styles.list}>
            <li>
              <Link
                className={`${delaGothicOne.className} ${styles.link}`}
                href="/news"
              >
                NEWS
              </Link>
            </li>
            <li>
              <Link
                className={`${delaGothicOne.className} ${styles.link}`}
                href="/member"
              >
                MEMBER
              </Link>
            </li>
            <li>
              <Link
                className={`${delaGothicOne.className} ${styles.link}`}
                href="https://lovvebox.booth.pm/"
                target="_blank"
              >
                <span>STORE</span>
                <FaExternalLinkSquareAlt size={18} />
              </Link>
            </li>
            <li>
              <Link
                className={`${delaGothicOne.className} ${styles.link}`}
                href="/contact"
              >
                CONTACT
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main>
        <article className={styles.article} data-article="news">
          <div className={styles.h2Wrapper}>
            <h2 className={`${goldman.className} ${styles.h2}`}>NEWS</h2>
            <Spacer grow={1} />
            <Link
              className={`${goldman.className} ${styles.more}`}
              href="/news"
            >
              more
              <IoMdArrowDroprightCircle size={24} />
            </Link>
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
                  title:
                    "「ラブボックス2ndライブ」グッズ事後販売開始のお知らせ",
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
        </article>
        <article className={styles.article} data-article="member">
          <div className={styles.h2Wrapper}>
            <h2 className={`${goldman.className} ${styles.h2}`}>MEMBER</h2>
            <Spacer grow={1} />
            <Link
              className={`${goldman.className} ${styles.more}`}
              href="/member"
            >
              more
              <IoMdArrowDroprightCircle size={24} />
            </Link>
          </div>
          <Swiper
            breakpoints={{
              1300: {
                slidesPerView: 4.5,
              },
              640: {
                slidesPerView: 2.5,
              },
              980: {
                slidesPerView: 3.5,
                spaceBetween: 36,
              },
            }}
            className={styles.swiper}
            slidesPerView={1.5}
            spaceBetween={24}
          >
            {reversedMemberListContents.map(
              ({ color, id, images: [{ url }], name, path }) => (
                <SwiperSlide className={styles.swiperSlide} key={id}>
                  <Link href={`/member/${path}`}>
                    <div className={styles.imageWrapper}>
                      <div
                        className={`${styles.background} pattern-diagonal-stripes-md`}
                        style={{ borderColor: color, color }}
                      />
                      <Image
                        alt={name}
                        className={styles.image}
                        fill={true}
                        quality={100}
                        src={`${url}?fit=clamp&w=600`}
                      />
                      <div
                        className={`${zenMaruGothic.className} ${styles.name}`}
                        style={{
                          textShadow: `0px 1px ${color}, 1px 0px ${color}, 0px -1px ${color}, -1px 0px ${color}, 3px 3px ${color}`,
                        }}
                      >
                        {name}
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              )
            )}
            <SwiperSlide />
          </Swiper>
        </article>
      </main>
    </div>
  );
}
