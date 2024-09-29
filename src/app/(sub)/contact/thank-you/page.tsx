import { Metadata } from "next";
import ThankYou from "./components/ThankYou";

export const metadata: Metadata = {
  title: "THANK YOU",
};

export default function Page(): JSX.Element {
  return <ThankYou />;
}
