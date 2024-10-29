import { Metadata } from "next";
import News from "@/app/(sub)/news/components/News";
import client from "@/utils/client";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://lovvebox.com/news",
  },
  title: "NEWS",
};

type PageProps = {
  params: { newsId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({
  searchParams: { page = "1" },
}: PageProps): Promise<JSX.Element> {
  if (typeof page !== "string") {
    throw new Error("page is not string");
  }

  const newsListResponse = await client.getList({
    customRequestInit: {
      next: {
        // 24 時間ごと
        revalidate: 86400,
      },
    },
    endpoint: "news",
    queries: {
      fields: ["createdAt", "id", "publishedAt", "thumbnail", "title"],
      limit: 9,
      offset: (parseInt(page, 10) - 1) * 9,
      orders: "-publishedAt",
    },
  });

  return <News newsListResponse={newsListResponse} />;
}
