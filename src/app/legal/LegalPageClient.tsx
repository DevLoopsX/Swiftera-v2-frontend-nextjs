"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { Policy } from "@/lib/policy";

const PolicyFlipBookViewer = dynamic(
  () => import("@/components/legal/PolicyFlipBookViewer"),
  { ssr: false },
);

type LegalPageClientProps = {
  policies: Policy[];
};

function formatDate(dateString: string) {
  if (!dateString) return "Không xác định";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        isActive
          ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
          : "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400"
      }`}
    >
      {isActive ? "Đang áp dụng" : "Ngừng áp dụng"}
    </span>
  );
}

export default function LegalPageClient({ policies }: LegalPageClientProps) {
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  return (
    <>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-6 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/" className="transition hover:text-rose-500">
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-slate-700 dark:text-slate-200">
              Chính sách
            </span>
          </div>

          <div className="mb-10 rounded-[32px] border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 inline-block rounded-full bg-rose-50 px-4 py-1 text-sm font-medium text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                Swiftera Legal Center
              </p>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl lg:text-5xl dark:text-white">
                Chính sách & Pháp lý
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base dark:text-slate-400">
                Danh sách các tài liệu chính sách hiện hành của nền tảng
                Swiftera. Người dùng có thể xem thông tin hiệu lực, phiên bản và
                mở tài liệu PDF trực tiếp trên website với chế độ lật trang.
              </p>
            </div>
          </div>

          {policies.length === 0 ? (
            <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-14 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
              <div className="mx-auto max-w-md">
                <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                  Chưa có tài liệu chính sách
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Hiện tại hệ thống chưa trả về tài liệu chính sách nào để hiển
                  thị.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {policies.map((item) => (
                <article
                  key={item.policyDocumentId}
                  className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 dark:hover:shadow-black/30"
                >
                  <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400" />

                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                          <StatusBadge isActive={item.isActive} />

                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            v{item.policyVersion}
                          </span>
                        </div>

                        <h2 className="text-2xl font-bold leading-tight text-slate-800 sm:text-[30px] dark:text-white">
                          {item.title}
                        </h2>

                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                          <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/70">
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                              Mã chính sách
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                              {item.code}
                            </p>
                          </div>

                          <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/70">
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                              Phiên bản
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                              v{item.policyVersion}
                            </p>
                          </div>

                          <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/70">
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                              Hiệu lực từ
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                              {formatDate(item.effectiveFrom)}
                            </p>
                          </div>

                          <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/70">
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                              Trạng thái
                            </p>
                            <p
                              className={`mt-1 text-sm font-semibold ${
                                item.isActive
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-500 dark:text-red-400"
                              }`}
                            >
                              {item.isActive ? "Đang áp dụng" : "Ngừng áp dụng"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {item.pdfUrl && (
                        <div className="lg:pl-6">
                          <button
                            type="button"
                            onClick={() => setSelectedPolicy(item)}
                            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                          >
                            Xem tài liệu PDF
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {selectedPolicy?.pdfUrl && (
        <PolicyFlipBookViewer
          pdfUrl={selectedPolicy.pdfUrl}
          title={selectedPolicy.title}
          onClose={() => setSelectedPolicy(null)}
        />
      )}
    </>
  );
}
