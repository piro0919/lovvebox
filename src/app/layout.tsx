// eslint-disable-next-line filenames/match-exported
import dayjs from "dayjs";
import "dayjs/locale/ja";
import type { Metadata } from "next";
import { Noto_Sans_JP as NotoSansJP } from "next/font/google";
import "pattern.css/dist/pattern.css";
import "ress";
import "swiper/css";
import "swiper/css/navigation";
import Layout from "./components/Layout";
import "./globals.css";

dayjs.locale("ja");

const notoSansJP = NotoSansJP({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "会いに行けるアイドルVTuberグループ",
  title: {
    default: "ラブボックス公式サイト",
    template: "%s - ラブボックス公式サイト",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
