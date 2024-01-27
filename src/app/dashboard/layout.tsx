import { ReactNode } from 'react';
import { SiteHeader } from "@/components/site-header";
import { MainLayout } from "@/components/MainLayout";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <SiteHeader />
      <MainLayout>
        <main>{children}</main>
      </MainLayout>
    </div>
  );
}
