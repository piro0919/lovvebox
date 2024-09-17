import fs from "fs";
import path from "path";
import { Metadata } from "next";
import PrivacyPolicy from "./components/PrivacyPolicy";

// 24 時間ごと
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "PRIVACY POLICY",
};

export default function Page(): JSX.Element {
  const filePath = path.join(process.cwd(), "public", "privacy-policy.md");
  const fileContent = fs.readFileSync(filePath, "utf8");

  return <PrivacyPolicy fileContent={fileContent} />;
}
