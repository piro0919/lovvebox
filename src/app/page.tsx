import App from "@/app/components/App";
import client from "@/utils/client";

export default async function Page(): Promise<JSX.Element> {
  const memberListResponse = await client.getList({
    customRequestInit: {
      next: {
        // 24 時間ごと
        revalidate: 86400,
      },
    },
    endpoint: "member",
  });

  return <App memberListResponse={memberListResponse} />;
}
