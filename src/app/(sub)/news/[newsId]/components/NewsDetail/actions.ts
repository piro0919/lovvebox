"use server";
import { MicroCMSContentId, MicroCMSDate } from "microcms-ts-sdk";
import client from "@/utils/client";

export type GetNewsListDetailParams = {
  newsId: string;
};

export type GetNewsListDetailData = Pick<
  MicroCMS.News &
    MicroCMSContentId &
    MicroCMSDate & {
      [key: string]: unknown;
    },
  "content" | "createdAt" | "publishedAt" | "title"
>;

// eslint-disable-next-line import/prefer-default-export
export async function getNewsListDetail({
  newsId,
}: GetNewsListDetailParams): Promise<GetNewsListDetailData> {
  const newsListDetailResponse = await client.getListDetail({
    contentId: newsId,
    endpoint: "news",
    queries: {
      fields: ["content", "createdAt", "publishedAt", "title"],
    },
  });

  return newsListDetailResponse;
}
