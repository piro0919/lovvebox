import { Metadata } from "next";
import Member from "./components/Member";
import client from "@/utils/client";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://lovvebox.com/member",
  },
  title: "MEMBER",
};

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

  return <Member memberListResponse={memberListResponse} />;
}
