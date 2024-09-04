import { Goldman } from "next/font/google";
import styles from "./style.module.css";

const goldman = Goldman({ subsets: ["latin"], weight: ["400", "700"] });

export default function Guidelines(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.h1Wrapper}>
        <h1 className={`${goldman.className} ${styles.h1}`}>GUIDELINES</h1>
      </div>
    </div>
  );
}
