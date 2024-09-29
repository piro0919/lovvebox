import { Metadata } from "next";
import Confirm from "./components/Confirm";

export const metadata: Metadata = {
  title: "CONFIRM",
};

export default function Page(): JSX.Element {
  return <Confirm />;
}
