import { MicroCMSDate } from "microcms-ts-sdk";
import { Goldman } from "next/font/google";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import styles from "./style.module.css";

const goldman = Goldman({ subsets: ["latin"], weight: ["400", "700"] });

export type PrivacyPolicyProps = {
  documentObjectResponse: MicroCMS.Document &
    MicroCMSDate & {
      [key: string]: unknown;
    };
};

export default function PrivacyPolicy({
  documentObjectResponse: { privacypolicy },
}: PrivacyPolicyProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.h1Wrapper}>
        <h1 className={`${goldman.className} ${styles.h1}`}>PRIVACY POLICY</h1>
      </div>
      <div className={styles.container}>
        <ReactMarkdown
          className={styles.reactMarkdown}
          components={{
            ol: ({ children }) => <ol className={styles.ol}>{children}</ol>,
            ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
          }}
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkBreaks, remarkGfm]}
        >
          {privacypolicy}
        </ReactMarkdown>
      </div>
    </div>
  );
}
