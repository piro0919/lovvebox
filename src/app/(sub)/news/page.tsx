import { Metadata } from "next";
import News from "@/app/(sub)/news/components/News";
import client from "@/utils/client";

export const metadata: Metadata = {
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
  });

  return <News newsListResponse={newsListResponse} />;
}