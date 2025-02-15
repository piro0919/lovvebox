import { Metadata } from "next";
import PrivacyPolicy from "./components/PrivacyPolicy";
import client from "@/utils/client";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://lovvebox.com/privacy-policy",
  },
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
    queries: {
      fields: ["privacypolicy"],
    },
  });

  return <PrivacyPolicy documentObjectResponse={documentObjectResponse} />;
}
