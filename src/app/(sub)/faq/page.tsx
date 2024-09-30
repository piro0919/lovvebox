import { Metadata } from "next";
import Faq from "./components/Faq";
import client from "@/utils/client";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://lovvebox.com/faq",
  },
  title: "FAQ",
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
  });

  return <Faq documentObjectResponse={documentObjectResponse} />;
}
