import { ReactNode } from "react";
import SubLayout from "@/components/SubLayout";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  return <SubLayout>{children}</SubLayout>;
}
