import { Metadata } from "next";
import NewsDetail from "./components/NewsDetail";
import client from "@/utils/client";
import { convert } from "html-to-text";

type PageProps = {
  params: { newsId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params: { newsId },
}: PageProps): Promise<Metadata> {
  const { content, title } = await client.getListDetail({
    contentId: newsId,
    customRequestInit: {
      next: {
        // 24 時間ごと
        revalidate: 86400,
      },
    },
    endpoint: "news",
  });

  return {
    alternates: {
      canonical: `https://lovvebox.com/news/${newsId}`,
    },
    description: convert(content).slice(0, 250),
    title,
  };
}

export default async function Page({
  params: { newsId },
}: PageProps): Promise<JSX.Element> {
  const newsListDetailResponse = await client.getListDetail({
    contentId: newsId,
    customRequestInit: {
      next: {
        // 24 時間ごと
        revalidate: 86400,
      },
    },
    endpoint: "news",
  });

  return <NewsDetail newsListDetailResponse={newsListDetailResponse} />;
}
