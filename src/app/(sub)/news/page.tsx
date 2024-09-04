import { Metadata } from "next";
import News from "@/components/News";

export const metadata: Metadata = {
  title: "NEWS",
};

export default function Page(): JSX.Element {
  return <News />;
}
