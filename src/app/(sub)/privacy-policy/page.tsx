import { Metadata } from "next";
import PrivacyPolicy from "./components/PrivacyPolicy";
import client from "@/utils/client";

export const metadata: Metadata = {
  title: "PRIVACY POLICY",
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

  return <PrivacyPolicy documentObjectResponse={documentObjectResponse} />;
}
