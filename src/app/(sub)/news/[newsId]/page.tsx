import NewsDetail from "./components/NewsDetail";
import client from "@/utils/client";

type PageProps = {
  params: { newsId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

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
