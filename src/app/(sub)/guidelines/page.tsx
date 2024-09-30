import { Metadata } from "next";
import Guidelines from "./components/Guidelines";
import client from "@/utils/client";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://lovvebox.com/guidelines",
  },
  title: "GUIDELINES",
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

  return <Guidelines documentObjectResponse={documentObjectResponse} />;
}
