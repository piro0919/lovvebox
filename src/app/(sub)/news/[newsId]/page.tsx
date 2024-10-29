import { convert } from "html-to-text";
import { Metadata } from "next";
import NewsDetail from "./components/NewsDetail";
import client from "@/utils/client";

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
    queries: {
      fields: ["content", "title"],
    },
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
    queries: {
      fields: ["content", "createdAt", "publishedAt", "title"],
    },
  });

  return <NewsDetail newsListDetailResponse={newsListDetailResponse} />;
}
