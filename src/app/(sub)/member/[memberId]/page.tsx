import { Metadata } from "next";
import MemberDetail from "@/app/(sub)/member/[memberId]/components/MemberDetail";
import client from "@/utils/client";

type PageProps = {
  params: { memberId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params: { memberId },
}: PageProps): Promise<Metadata> {
  const { name, profile } = await client.getListDetail({
    contentId: memberId,
    customRequestInit: {
      next: {
        // 24 時間ごと
        revalidate: 86400,
      },
    },
    endpoint: "member",
  });

  return {
    alternates: {
      canonical: `https://lovvebox.com/member/${memberId}`,
    },
    description: profile,
    title: name,
  };
}

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
