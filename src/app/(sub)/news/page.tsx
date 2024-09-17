import { Metadata } from "next";
import News from "@/app/(sub)/news/components/News";

export const metadata: Metadata = {
  title: "NEWS",
};

export default function Page(): JSX.Element {
  return <News />;
}
