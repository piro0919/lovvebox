import { ReactNode } from "react";
import LayoutComponent from "@/app/(sub)/components/Layout";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  return <LayoutComponent>{children}</LayoutComponent>;
}
