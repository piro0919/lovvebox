import { Metadata } from "next";
import App from "@/app/components/App";
import client from "@/utils/client";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://lovvebox.com",
  },
  openGraph: {
    type: "website",
  },
};

export default async function Page(): Promise<JSX.Element> {
  const documentObjectResponse = await client.getObject({
    customRequestInit: {
      next: {
        // 24 時間ごと
        revalidate: 86400,
      },
    },
    endpoint: "document",
    queries: {
      fields: ["about", "movie"],
    },
  });
  const memberListResponse = await client.getList({
    customRequestInit: {
      next: {
        // 24 時間ごと
        revalidate: 86400,
      },
    },
    endpoint: "member",
    queries: {
      fields: ["color", "graduation", "id", "images", "name"],
    },
  });
  const newsListResponse = await client.getList({
    customRequestInit: {
      next: {
        // 24 時間ごと
        revalidate: 86400,
      },
    },
    endpoint: "news",
    queries: {
      fields: [
        "createdAt",
        "id",
        "pastPublishedAt",
        "publishedAt",
        "thumbnail",
        "title",
      ],
      limit: 3,
      orders: "-pastPublishedAt",
    },
  });

  return (
    <App
      documentObjectResponse={documentObjectResponse}
      memberListResponse={memberListResponse}
      newsListResponse={newsListResponse}
    />
  );
}
