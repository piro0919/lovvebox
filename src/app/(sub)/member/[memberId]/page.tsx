import { Metadata } from "next";
import MemberDetail from "@/app/(sub)/member/[memberId]/components/MemberDetail";
import client from "@/utils/client";

export const metadata: Metadata = {
  title: "咲愛りぼん",
};

type PageProps = {
  params: { memberId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({
  params: { memberId },
}: PageProps): Promise<JSX.Element> {
  const memberListDetailResponse = await client.getListDetail({
    contentId: memberId,
    customRequestInit: {
      next: {
        // 24 時間ごと
        revalidate: 86400,
      },
    },
    endpoint: "member",
  });

  return <MemberDetail memberListDetailResponse={memberListDetailResponse} />;
}
