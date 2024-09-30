import { Metadata } from "next";
import News from "@/app/(sub)/news/components/News";
import client from "@/utils/client";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://lovvebox.com/news",
  },
  title: "NEWS",
};

export default async function Page(): Promise<JSX.Element> {
  const newsListResponse = await client.getList({
    customRequestInit: {
      next: {
        // 24 時間ごと
        revalidate: 86400,
      },
    },
    endpoint: "news",
    queries: {
      limit: 20,
      orders: "-pastPublishedAt",
    },
  });

  return <News newsListResponse={newsListResponse} />;
}
