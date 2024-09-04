import { Metadata } from "next";
import Member from "@/components/Member";

export const metadata: Metadata = {
  title: "MEMBER",
};

export default function Page(): JSX.Element {
  return <Member />;
}
