import { Metadata } from "next";
import Contact from "@/app/(sub)/contact/components/Contact";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://lovvebox.com/contact",
  },
  title: "CONTACT",
};

export default function Page(): JSX.Element {
  return <Contact />;
}
