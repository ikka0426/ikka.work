import type { Metadata } from "next";
import "./globals.css";

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppBreadcrumb } from "@/components/app-breadcrumb";

export const metadata: Metadata = {
  title: "ikka 的妙妙屋",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 fixed top-0 w-full bg-white z-10">
              <SidebarTrigger className="-ml-1" />
              <AppBreadcrumb />
            </header>
            <main className="pt-16 h-svh max-w-[80vh] w-full mx-auto p-4">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}