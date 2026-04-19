"use client";

import { useEffect, useMemo, useRef, useState, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type PolicyFlipBookViewerProps = {
  pdfUrl: string;
  title: string;
  onClose: () => void;
};

type FlipPageProps = {
  pageNumber: number;
  width: number;
};

const FlipPage = forwardRef<HTMLDivElement, FlipPageProps>(
  ({ pageNumber, width }, ref) => {
    return (
      <div
        ref={ref}
        className="h-full w-full overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-slate-100 px-4 py-2 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
            Trang {pageNumber}
          </div>

          <div className="flex flex-1 items-center justify-center bg-slate-50 p-3 dark:bg-slate-950">
            <Page
              pageNumber={pageNumber}
              width={width}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </div>
        </div>
      </div>
    );
  },
);

FlipPage.displayName = "FlipPage";

export default function PolicyFlipBookViewer({
  pdfUrl,
  title,
  onClose,
}: PolicyFlipBookViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [bookKey, setBookKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const flipBookRef = useRef<any>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const pageWidth = 420;
  const pageHeight = 560;

  const totalPages = useMemo(() => numPages, [numPages]);

  const handlePrev = () => {
    flipBookRef.current?.pageFlip()?.flipPrev();
  };

  const handleNext = () => {
    flipBookRef.current?.pageFlip()?.flipNext();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm">
      <div className="flex h-full w-full flex-col">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-white">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-white/70">Chế độ xem lật trang</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-white/10"
            aria-label="Đóng"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 py-6">
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
              setBookKey((v) => v + 1);
              setCurrentPage(0);
            }}
            onLoadError={(error) => {
              console.error("PDF load error:", error);
            }}
            loading={
              <div className="rounded-2xl bg-white px-6 py-4 text-slate-700 shadow-lg dark:bg-slate-900 dark:text-slate-200">
                Đang tải tài liệu PDF...
              </div>
            }
            error={
              <div className="rounded-2xl bg-white px-6 py-4 text-red-600 shadow-lg dark:bg-slate-900 dark:text-red-400">
                Không thể tải file PDF.
              </div>
            }
          >
            {numPages > 0 && (
              <div className="flex flex-col items-center gap-4">
                <HTMLFlipBook
                  key={bookKey}
                  ref={flipBookRef}
                  width={pageWidth}
                  height={pageHeight}
                  minWidth={320}
                  maxWidth={520}
                  minHeight={420}
                  maxHeight={700}
                  size="stretch"
                  drawShadow
                  flippingTime={700}
                  usePortrait={false}
                  startPage={0}
                  maxShadowOpacity={0.25}
                  showCover={false}
                  mobileScrollSupport={true}
                  className="shadow-2xl"
                  onFlip={(e: { data: number }) => setCurrentPage(e.data)}
                >
                  {Array.from({ length: numPages }, (_, index) => (
                    <FlipPage
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      width={pageWidth - 30}
                    />
                  ))}
                </HTMLFlipBook>

                <div className="flex items-center gap-3 text-sm text-white/80">
                  <button
                    onClick={handlePrev}
                    className="rounded-full border border-white/20 p-2 transition hover:bg-white/10"
                    aria-label="Trang trước"
                  >
                    <ChevronLeft className="size-4" />
                  </button>

                  <span>
                    Trang hiện tại: {Math.min(currentPage + 1, totalPages)} /{" "}
                    {totalPages}
                  </span>

                  <button
                    onClick={handleNext}
                    className="rounded-full border border-white/20 p-2 transition hover:bg-white/10"
                    aria-label="Trang sau"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            )}
          </Document>
        </div>
      </div>
    </div>
  );
}
