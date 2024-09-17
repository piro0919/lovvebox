import fs from "fs";
import path from "path";
import { Metadata } from "next";
import Guidelines from "./components/Guidelines";

// 24 時間ごと
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "GUIDELINES",
};

export default function Page(): JSX.Element {
  const filePath = path.join(process.cwd(), "public", "guidelines.md");
  const fileContent = fs.readFileSync(filePath, "utf8");

  return <Guidelines fileContent={fileContent} />;
}
