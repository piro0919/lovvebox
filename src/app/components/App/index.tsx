"use client";
import Hamburger from "hamburger-react";
import { MicroCMSDate, MicroCMSGetListResponse } from "microcms-ts-sdk";
import dynamic from "next/dynamic";
import {
  Dela_Gothic_One as DelaGothicOne,
  Goldman,
  M_PLUS_1 as MPLUS1,
} from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { SocialIcon } from "react-social-icons";
import Spacer from "react-spacer";
import useMeasure from "react-use-measure";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useShallow } from "zustand/shallow";
import styles from "./style.module.css";
import useDrawerStore from "@/stores/useDrawerStore";

const goldman = Goldman({ subsets: ["latin"], weight: ["400", "700"] });
const delaGothicOne = DelaGothicOne({ subsets: ["latin"], weight: "400" });
const mPlus1 = MPLUS1({ subsets: ["latin"], weight: "800" });
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export type AppProps = {
  documentObjectResponse: MicroCMS.Document &
    MicroCMSDate & {
      [key: string]: unknown;
    };
  memberListResponse: MicroCMSGetListResponse<
    MicroCMS.Endpoints,
    {
      endpoint: "member";
    }
  >;
};

export default function App({
  documentObjectResponse: { movie },
  memberListResponse: { contents: memberListContents },
}: AppProps): JSX.Element {
  const [ref, { height, width }] = useMeasure();
  const { toggle, toggled } = useDrawerStore(
    useShallow((state) => ({ toggle: state.toggle, toggled: state.toggled }))
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.corner}>
        <div className={styles.iconWrapper}>
          <SocialIcon
            bgColor="transparent"
            className={styles.socialIcon}
            target="_blank"
            url="https://www.youtube.com/@lovvebox"
          />
        </div>
      </div>
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
            url={movie.split(/\n/).filter((v) => v)}
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
                href="/faq"
              >
                FAQ
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
          <div className={styles.hamburger}>
            <Hamburger toggle={toggle} toggled={toggled} />
          </div>
        </nav>
      </aside>
      <main>
        <article className={styles.article} data-article="about">
          <div className={styles.h2Wrapper}>
            <h2 className={`${goldman.className} ${styles.h2}`}>ABOUT</h2>
          </div>
          <div className={styles.container}>
            <p className={styles.description}>
              『ラブボックス』は、リアルかわいいを追求した女性アイドルVTuberグループ及びそれを運営するプロダクションです。
              <br />
              ラブボックスという名前は、アイドルたちが同じ箱の元で愛を持って接し、支え合いながら夢を追いかけてほしいという想いに由来しています。
              <br />
              アイドルたちは、それぞれが理想のアイドル像をもっています。当プロダクションでは、理想のアイドルになるまでの物語を、ファンの皆様とともに見守り、支えていきたいと考えています。
            </p>
            <div className={styles.imageWrapper}>
              <Image alt="about" fill={true} src="/about.jpg" />
            </div>
          </div>
        </article>
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
              575: {
                slidesPerView: 2.75,
              },
              775: {
                slidesPerView: 3.75,
                spaceBetween: 36,
              },
              975: {
                slidesPerView: 4.75,
              },
            }}
            className={styles.swiper}
            modules={[Navigation]}
            navigation={true}
            slidesPerView={1.75}
            spaceBetween={36}
          >
            {memberListContents
              .map(({ color, id, images: [{ url }], name }, index) => (
                <SwiperSlide
                  className={styles.swiperSlide}
                  key={id}
                  style={{ zIndex: index }}
                >
                  <Link className={styles.link} href={`/member/${id}`}>
                    <div
                      className={styles.background}
                      style={{ background: color }}
                    />
                    <div className={styles.imageWrapper}>
                      <Image
                        alt={name}
                        className={styles.image}
                        fill={true}
                        quality={100}
                        src={`${url}?fit=clamp&w=1000`}
                      />
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
                </SwiperSlide>
              ))
              .reverse()}
          </Swiper>
        </article>
      </main>
    </div>
  );
}
