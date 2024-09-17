import { MicroCMSGetListResponse } from "microcms-ts-sdk";
import { Goldman, Zen_Maru_Gothic as ZenMaruGothic } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";

const goldman = Goldman({ subsets: ["latin"], weight: ["400", "700"] });
const zenMaruGothic = ZenMaruGothic({ subsets: ["latin"], weight: "500" });

export type MemberProps = {
  memberListResponse: MicroCMSGetListResponse<
    MicroCMS.Endpoints,
    {
      endpoint: "member";
    }
  >;
};

export default function Member({
  memberListResponse: { contents: memberListContents },
}: MemberProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.h1Wrapper}>
        <h1 className={`${goldman.className} ${styles.h1}`}>MEMBER</h1>
      </div>
      <div className={styles.container}>
        <ul className={styles.list}>
          {memberListContents
            .reverse()
            .map(({ color, id, images: [{ url }], name, path }) => (
              <li className={styles.item} key={id}>
                <Link href={`/member/${path}`}>
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
                      src={`${url}?fit=clamp&w=600`}
                    />
                  </div>
                  <div
                    className={`${zenMaruGothic.className} ${styles.name}`}
                    style={{
                      textShadow: `0px 1px ${color}, 1px 0px ${color}, 0px -1px ${color}, -1px 0px ${color}, 3px 3px ${color}`,
                    }}
                  >
                    {name}
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
