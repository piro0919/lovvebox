// eslint-disable-next-line filenames/match-exported
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import type { Metadata } from "next";
import { M_PLUS_1 as MPLUS1 } from "next/font/google";
import "pattern.css/dist/pattern.css";
import "react-modern-drawer/dist/index.css";
import "ress";
import "swiper/css";
import Layout from "./components/Layout";
import Providers from "./components/Providers";
import "./globals.css";

dayjs.locale("ja");

const mPlus1 = MPLUS1({ subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: "ラブボックス",
  description: "会いに行けるアイドルVTuberグループ",
  robots: {
    follow: true,
    index: true,
  },
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
      <body className={mPlus1.className}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
