import App from "@/app/components/App";
import client from "@/utils/client";

export default async function Page(): Promise<JSX.Element> {
  const documentObjectResponse = await client.getObject({
    customRequestInit: {
      next: {
        // 24 時間ごと
        revalidate: 86400,
      },
    },
    endpoint: "document",
  });
  const memberListResponse = await client.getList({
    customRequestInit: {
      next: {
        // 24 時間ごと
        revalidate: 86400,
      },
    },
    endpoint: "member",
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
