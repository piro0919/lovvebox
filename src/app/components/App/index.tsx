"use client";
import { useLockBodyScroll } from "@custom-react-hooks/use-lock-body-scroll";
import Color from "color";
import dayjs from "dayjs";
import { backOut } from "eases";
import { shuffle } from "fast-shuffle";
import { motion, useInView } from "framer-motion";
import Hamburger from "hamburger-react";
import { MicroCMSDate, MicroCMSGetListResponse } from "microcms-ts-sdk";
import dynamic from "next/dynamic";
import {
  Dela_Gothic_One as DelaGothicOne,
  Goldman,
  M_PLUS_1 as MPLUS1,
  Racing_Sans_One as RacingSansOne,
} from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useRef } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
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
import validUrl from "valid-url";
import { useShallow } from "zustand/shallow";
import styles from "./style.module.css";
import useDrawerStore from "@/stores/useDrawerStore";
import menuList from "@/utils/menuList";

const delaGothicOne = DelaGothicOne({ subsets: ["latin"], weight: "400" });
const goldman = Goldman({ subsets: ["latin"], weight: ["400", "700"] });
const mPlus1 = MPLUS1({ subsets: ["latin"], weight: "800" });
const racingSansOne = RacingSansOne({ subsets: ["latin"], weight: "400" });
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
  documentObjectResponse: { about, movie },
  memberListResponse: { contents: memberListContents },
  newsListResponse: { contents: newsListContents },
}: AppProps): JSX.Element {
  const [measureRef, { height, width }] = useMeasure();
  const { toggle, toggled } = useDrawerStore(
    useShallow((state) => ({ toggle: state.toggle, toggled: state.toggled })),
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
              url={shuffle(movie.split(/\n/).filter((v) => v))}
              width="100%"
            />
          </div>
          <div className={`${styles.pattern} pattern-cross-dots-md `}>
            <motion.div
              animate={{
                opacity: ready ? 0 : 1,
              }}
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
          <div className={styles.inner}>
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
            <nav>
              <ul className={styles.list}>
                {menuList.map(({ href, text }) => (
                  <li key={href}>
                    <Link
                      className={`${delaGothicOne.className} ${styles.link}`}
                      href={href}
                      target={validUrl.isWebUri(href) ? "_blank" : "_self"}
                    >
                      <span>{text}</span>
                      {validUrl.isWebUri(href) ? (
                        <FaExternalLinkAlt size={18} />
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <ul className={styles.iconList}>
              <li>
                <SocialIcon
                  bgColor="#f89eac"
                  className={styles.socialIcon}
                  fgColor="#fff"
                  target="_blank"
                  url="https://www.youtube.com/@lovvebox"
                />
              </li>
              <li>
                <SocialIcon
                  bgColor="#f89eac"
                  className={styles.socialIcon}
                  fgColor="#fff"
                  target="_blank"
                  url="https://x.com/lovvebox"
                />
              </li>
            </ul>
            <div className={styles.hamburger}>
              <Hamburger toggle={toggle} toggled={toggled} />
            </div>
          </div>
        </aside>
        <main>
          <Article article="about" ready={ready}>
            <div className={styles.h2Wrapper}>
              <h2 className={`${racingSansOne.className} ${styles.h2}`}>
                ABOUT
              </h2>
              <div className={styles.diamond} />
            </div>
            <div className={styles.container}>
              <p className={styles.description}>{about}</p>
            </div>
          </Article>
          <Article article="news" ready={ready}>
            <div className={styles.h2Wrapper}>
              <h2 className={`${racingSansOne.className} ${styles.h2}`}>
                NEWS
              </h2>
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
                  ({ createdAt, id, pastPublishedAt, publishedAt, title }) => (
                    <li key={title}>
                      <Link className={styles.link} href={`/news/${id}`}>
                        <div className={`${goldman.className} ${styles.date}`}>
                          {dayjs(
                            pastPublishedAt ?? publishedAt ?? createdAt,
                          ).format("YYYY.MM.DD")}
                        </div>
                        <div className={styles.title}>{title}</div>
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </Article>
          <Article article="member" ready={ready}>
            <div className={styles.h2Wrapper}>
              <h2 className={`${racingSansOne.className} ${styles.h2}`}>
                MEMBER
              </h2>
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
                  .map(
                    (
                      { color, graduation, id, images: [{ url }], name },
                      index,
                    ) => (
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
                          {graduation ? (
                            <Image
                              alt=""
                              className={styles.sakura}
                              height={72}
                              src="/sakura.png"
                              width={72}
                            />
                          ) : null}
                          <motion.div
                            animate={
                              isInView && ready
                                ? { opacity: graduation ? 0.5 : 1, scale: 1 }
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
                              src={`${url}?fit=clamp&w=600`}
                            />
                          </motion.div>
                          <div
                            className={`${mPlus1.className} ${styles.name}`}
                            style={{
                              textShadow: `0px 1px ${color}, 1px 0px ${color}, 0px -1px ${color}, -1px 0px ${color}, 3px 3px ${Color(color).alpha(0.5).toString()}`,
                            }}
                          >
                            {name}
                          </div>
                        </Link>
                      </SwiperSlide>
                    ),
                  )
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
