import { Metadata } from "next";
import Guidelines from "@/components/Guidelines";

export const metadata: Metadata = {
  title: "GUIDELINES",
};

export default function Page(): JSX.Element {
  return <Guidelines />;
}
