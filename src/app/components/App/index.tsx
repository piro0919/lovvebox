"use client";
import { useLockBodyScroll } from "@custom-react-hooks/use-lock-body-scroll";
import dayjs from "dayjs";
import { backOut } from "eases";
import { motion, useInView } from "framer-motion";
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
import { ReactNode, useRef } from "react";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import { Hearts } from "react-loader-spinner";
import { SocialIcon } from "react-social-icons";
import Spacer from "react-spacer";
import useMeasure from "react-use-measure";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { useBoolean } from "usehooks-ts";
import { useShallow } from "zustand/shallow";
import styles from "./style.module.css";
import useDrawerStore from "@/stores/useDrawerStore";

const goldman = Goldman({ subsets: ["latin"], weight: ["400", "700"] });
const delaGothicOne = DelaGothicOne({ subsets: ["latin"], weight: "400" });
const mPlus1 = MPLUS1({ subsets: ["latin"], weight: "800" });
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

function Article({
  article,
  children,
  ready,
}: {
  article: string;
  children: ReactNode;
  ready: boolean;
}): JSX.Element {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.article
      animate={isInView && ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      className={styles.article}
      data-article={article}
      initial={{ opacity: 0, y: 48 }}
      ref={ref}
      transition={{
        delay: 0.5,
        duration: 0.5,
        ease: backOut,
      }}
    >
      {children}
    </motion.article>
  );
}

function SwiperButtonPrev(): JSX.Element {
  const swiper = useSwiper();

  return (
    <button
      className={styles.swiperButtonPrev}
      onClick={() => swiper.slidePrev()}
    >
      <IoMdArrowDropleftCircle size={36} />
    </button>
  );
}

function SwiperButtonNext(): JSX.Element {
  const swiper = useSwiper();

  return (
    <button
      className={styles.swiperButtonNext}
      onClick={() => swiper.slideNext()}
    >
      <IoMdArrowDroprightCircle size={36} />
    </button>
  );
}

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
  newsListResponse: MicroCMSGetListResponse<
    MicroCMS.Endpoints,
    {
      endpoint: "news";
    }
  >;
};

export default function App({
  documentObjectResponse: { movie },
  memberListResponse: { contents: memberListContents },
  newsListResponse: { contents: newsListContents },
}: AppProps): JSX.Element {
  const [measureRef, { height, width }] = useMeasure();
  const { toggle, toggled } = useDrawerStore(
    useShallow((state) => ({ toggle: state.toggle, toggled: state.toggled }))
  );
  const { setTrue: onReady, value: ready } = useBoolean(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useLockBodyScroll(!ready);

  return (
    <>
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
        <div className={styles.top} ref={measureRef}>
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
              onReady={() => onReady()}
              playing={ready}
              url={movie.split(/\n/).filter((v) => v)}
              width="100%"
            />
          </div>
          <div className={`${styles.pattern} pattern-cross-dots-md `}>
            <motion.div
              animate={
                ready
                  ? {
                      opacity: 0,
                    }
                  : {
                      opacity: 1,
                    }
              }
              className={styles.logo}
              transition={{ delay: 3.5 }}
            >
              <Image
                alt="ラブボックス"
                fill={true}
                quality={100}
                src="/logo02.png"
              />
            </motion.div>
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
          <Article article="about" ready={ready}>
            <div className={styles.h2Wrapper}>
              <h2 className={`${goldman.className} ${styles.h2}`}>ABOUT</h2>
              <div className={styles.diamond} />
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
          </Article>
          <Article article="news" ready={ready}>
            <div className={styles.h2Wrapper}>
              <h2 className={`${goldman.className} ${styles.h2}`}>NEWS</h2>
              <div className={styles.diamond} />
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
                {newsListContents.map(
                  ({ createdAt, id, publishedAt, title }) => (
                    <li key={title}>
                      <Link className={styles.link} href={`/news/${id}`}>
                        <div className={`${goldman.className} ${styles.date}`}>
                          {dayjs(publishedAt ?? createdAt).format("YYYY.MM.DD")}
                        </div>
                        <div className={styles.title}>{title}</div>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </Article>
          <Article article="member" ready={ready}>
            <div className={styles.h2Wrapper}>
              <h2 className={`${goldman.className} ${styles.h2}`}>MEMBER</h2>
              <div className={styles.diamond} />
              <Link
                className={`${goldman.className} ${styles.more}`}
                href="/member"
              >
                more
                <IoMdArrowDroprightCircle size={24} />
              </Link>
            </div>
            <div className={styles.swiperWrapper} ref={ref}>
              <Swiper
                breakpoints={{
                  575: {
                    slidesPerView: 2.75,
                    spaceBetween: 24,
                  },
                  775: {
                    slidesPerView: 3.75,
                    spaceBetween: 36,
                  },
                  975: {
                    slidesPerView: 4.75,
                    spaceBetween: 36,
                  },
                }}
                className={styles.swiper}
                modules={[Navigation]}
                navigation={{
                  nextEl: styles.swiperButtonNext,
                  prevEl: styles.swiperButtonPrev,
                }}
                slidesPerView={1.75}
                spaceBetween={12}
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
                        <motion.div
                          animate={
                            isInView && ready
                              ? { opacity: 1, scale: 1 }
                              : { opacity: 0, scale: 0.75 }
                          }
                          className={styles.imageWrapper}
                          initial={{ opacity: 0, scale: 0.75 }}
                          transition={{
                            delay:
                              0.5 + (memberListContents.length - index) * 0.1,
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
                <SwiperButtonPrev />
                <SwiperButtonNext />
              </Swiper>
            </div>
          </Article>
        </main>
      </div>
      <motion.div
        animate={
          ready
            ? {
                opacity: 0,
                transitionEnd: {
                  display: "none",
                },
              }
            : {
                opacity: 1,
              }
        }
        className={styles.loadingWrapper}
        transition={{ delay: 0.5 }}
      >
        <Hearts color="#fff" height="90" visible={true} width="90" />
      </motion.div>
    </>
  );
}
