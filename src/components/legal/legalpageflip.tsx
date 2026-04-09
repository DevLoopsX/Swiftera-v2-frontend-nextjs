"use client";

import HTMLFlipBook from "react-pageflip";
import { forwardRef } from "react";
import { BookOpen, Scale, ShieldCheck, FileText } from "lucide-react";
import type { LegalSection } from "@/api/legal";

type Props = {
  title: string;
  subtitle?: string;
  description?: string;
  updatedAt?: string;
  sections: LegalSection[];
};

type PageProps = {
  pageNumber: number;
  children: React.ReactNode;
};

const FlipPage = forwardRef<HTMLDivElement, PageProps>(function FlipPage(
  { pageNumber, children },
  ref,
) {
  return (
    <div
      ref={ref}
      className="h-full w-full rounded-[28px] border border-white/10 bg-[#0f1117] text-white shadow-[0_25px_80px_rgba(0,0,0,0.45)] overflow-hidden"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
          <div className="flex items-center gap-2 text-theme-primary-start">
            <BookOpen className="size-4" />
            <span className="text-sm font-semibold tracking-wide">
              SWIFTERA LEGAL
            </span>
          </div>
          <span className="text-xs text-white/45">Trang {pageNumber}</span>
        </div>

        <div className="flex-1 p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
});

function SectionIcon({ type }: { type?: string }) {
  if (type === "law") return <Scale className="size-5" />;
  if (type === "terms") return <FileText className="size-5" />;
  return <ShieldCheck className="size-5" />;
}

export default function LegalPageFlip({
  title,
  subtitle,
  description,
  updatedAt,
  sections,
}: Props) {
  const pages = [
    {
      id: "cover",
      title,
      subtitle,
      content:
        description ||
        "Thông tin pháp lý và chính sách thuê sản phẩm điện tử tại Swiftera.",
      type: "cover",
    },
    ...sections.sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0)),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-18 lg:py-14">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-theme-primary-start">
          Chính sách & luật pháp
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-text-main dark:text-white md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-base text-text-sub dark:text-white/60">
            {subtitle}
          </p>
        )}
        {updatedAt && (
          <p className="mt-2 text-sm text-text-sub dark:text-white/45">
            Cập nhật: {new Date(updatedAt).toLocaleDateString("vi-VN")}
          </p>
        )}
      </div>

      <div className="rounded-[32px] border border-white/5 bg-[radial-gradient(circle_at_top,rgba(255,0,90,0.10),transparent_28%),linear-gradient(180deg,#090b10_0%,#0d1017_100%)] p-4 md:p-8">
        <div className="flex justify-center">
          {/* @ts-expect-error package typings hơi gắt */}
          <HTMLFlipBook
            width={460}
            height={640}
            minWidth={320}
            maxWidth={520}
            minHeight={420}
            maxHeight={720}
            size="stretch"
            maxShadowOpacity={0.25}
            showCover
            mobileScrollSupport
            drawShadow
            flippingTime={900}
            usePortrait
            startZIndex={1}
            autoSize
            clickEventForward
            useMouseEvents
            swipeDistance={30}
            showPageCorners
          >
            {pages.map((page, index) => (
              <FlipPage key={page.id} pageNumber={index + 1}>
                <div className="flex h-full flex-col">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-theme-primary-start/15 text-theme-primary-start">
                      <SectionIcon type={page.type} />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {page.title}
                      </h2>
                      {"subtitle" in page && page.subtitle ? (
                        <p className="text-sm text-white/55">{page.subtitle}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/8 bg-white/5 p-5">
                    <p className="whitespace-pre-line text-[15px] leading-7 text-white/88">
                      {page.content}
                    </p>
                  </div>

                  <div className="mt-auto pt-6 text-xs tracking-wide text-white/35">
                    Swiftera • Legal Book
                  </div>
                </div>
              </FlipPage>
            ))}
          </HTMLFlipBook>
        </div>
      </div>
    </div>
  );
}
