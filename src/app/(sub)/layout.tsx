import { Metadata } from "next";
import { ReactNode } from "react";
import LayoutComponent from "@/app/(sub)/components/Layout";

export const metadata: Metadata = {
  openGraph: {
    type: "article",
  },
};

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  return <LayoutComponent>{children}</LayoutComponent>;
}
