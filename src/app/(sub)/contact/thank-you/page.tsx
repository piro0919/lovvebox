import { Metadata } from "next";
import ThankYou from "./components/ThankYou";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://lovvebox.com/contact/thank-you",
  },
  title: "THANK YOU",
};

export default function Page(): JSX.Element {
  return <ThankYou />;
}
