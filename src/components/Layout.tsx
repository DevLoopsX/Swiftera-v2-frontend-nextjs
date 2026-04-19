"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Footer } from "./Footer";
import { MainLayout } from "@/layouts/MainLayout";
import { MapPinned, Phone } from "lucide-react";

type LayoutProps = {
  children: React.ReactNode;
  stickyHeader?: boolean;
};

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isLegalPage = pathname === "/legal";

  const buttonWrapperClass =
    "group relative flex h-14 w-14 items-center justify-center";
  const buttonActiveArea =
    "flex h-full w-full items-center justify-center rounded-full border-2 border-white bg-theme-primary-start text-white shadow-lg transition-transform duration-300 translate-x-1/2 group-hover:translate-x-0";

  return (
    <MainLayout>
      <main className={`min-h-screen flex-1 ${isLegalPage ? "pt-4" : ""}`}>
        {children}
      </main>

      {!isLegalPage && <Footer />}

      {!isLegalPage && (
        <div className="fixed right-0 bottom-8 z-50 hidden flex-col gap-3 sm:flex">
          <div className={buttonWrapperClass}>
            <a
              href="tel:19001234"
              className={buttonActiveArea}
              aria-label="Gọi ngay"
            >
              <Phone className="size-6" />
            </a>
            <span className="pointer-events-none absolute right-full mr-1.5 whitespace-nowrap rounded-md bg-white px-2 py-1 text-xs font-medium text-text-main opacity-0 shadow transition-opacity group-hover:opacity-100 dark:bg-surface-card dark:text-white">
              Gọi ngay
            </span>
          </div>

          <div className={buttonWrapperClass}>
            <Link
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonActiveArea}
              aria-label="Bản đồ"
            >
              <MapPinned className="size-6" />
            </Link>
            <span className="pointer-events-none absolute right-full mr-1.5 whitespace-nowrap rounded-md bg-white px-2 py-1 text-xs font-medium text-text-main opacity-0 shadow transition-opacity group-hover:opacity-100 dark:bg-surface-card dark:text-white">
              Bản đồ
            </span>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
