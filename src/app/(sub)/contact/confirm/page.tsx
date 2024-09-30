import { Metadata } from "next";
import Confirm from "./components/Confirm";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://lovvebox.com/contact/confirm",
  },
  title: "CONFIRM",
};

export default function Page(): JSX.Element {
  return <Confirm />;
}
