import { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "CONTACT",
};

export default function Page(): JSX.Element {
  return <Contact />;
}
