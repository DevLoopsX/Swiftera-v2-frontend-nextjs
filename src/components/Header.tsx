"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Heart,
  LayoutDashboard,
  LogOut,
  LogIn,
  Menu,
  Moon,
  Search,
  ShoppingCart,
  Sun,
  UserRound,
  FileText,
} from "lucide-react";
import { topLevelCategories } from "@/data/categories";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/theme-context";
import logo from "../../public/logo.png";

export function Header() {
  const HOVER_BRIDGE_HEIGHT = 10;
  const pathname = usePathname();
  const isLegalPage = pathname === "/legal";
  const { resolvedTheme, toggleTheme } = useTheme();

  const sortedCategories = useMemo(
    () => [...topLevelCategories].sort((a, b) => a.sortOrder - b.sortOrder),
    [],
  );

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null,
  );

  const hoveredCategoryData = useMemo(
    () => sortedCategories.find((c) => c.categoryId === hoveredCategoryId),
    [hoveredCategoryId, sortedCategories],
  );

  useEffect(() => {
    if (isLegalPage) {
      setIsSearchOpen(false);
      setHoveredCategoryId(null);
    }
  }, [isLegalPage]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    const onClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "top-0 w-full bg-white dark:bg-surface-base transition-colors duration-300 shadow-sm dark:shadow-black/30",
          isSearchOpen && !isLegalPage
            ? "z-50 border-transparent"
            : "z-40 border-b border-border/20 dark:border-white/5 backdrop-blur",
        )}
      >
        {isSearchOpen && !isLegalPage && (
          <div
            className="fixed inset-0 z-40 h-screen w-screen bg-black/40 backdrop-blur-xs"
            onClick={() => setIsSearchOpen(false)}
          />
        )}

        <div className="mx-auto max-w-full px-4 py-3 lg:px-18">
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="relative z-30 flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden dark:hover:bg-white/10"
              >
                <Menu className="size-5" />
              </Button>

              <Link href="/" className="flex items-center gap-2">
                <Image
                  src={logo}
                  alt="logo"
                  width={150}
                  height={40}
                  className="object-contain dark:brightness-[1.15]"
                />
              </Link>
            </div>

            {!isLegalPage && <div></div>}

            {!isLegalPage && (
              <div className="relative z-50 hidden flex-1 lg:flex">
                <div
                  className="flex h-12 w-full max-w-2xl cursor-text items-center rounded-full border border-border/60 bg-white px-4 shadow-sm transition-all dark:border-white/10 dark:bg-white/5"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="mr-3 size-5 text-text-sub" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm thiết bị, điện thoại, máy tính..."
                    className="w-full border-none bg-transparent text-sm text-text-main placeholder:text-text-sub focus:outline-none"
                    readOnly={!isSearchOpen}
                  />
                </div>

                {isSearchOpen && (
                  <div className="absolute -top-2 left-0 z-50 w-full rounded-3xl bg-white p-2 shadow-2xl dark:bg-surface-card dark:shadow-black/60">
                    <div className="flex h-12 items-center gap-3 rounded-full border-2 border-theme-primary-start px-4">
                      <Search className="size-5 text-text-sub" />
                      <input
                        type="text"
                        autoFocus
                        placeholder="Tìm kiếm thiết bị, điện thoại, máy tính..."
                        className="flex-1 border-none bg-transparent text-sm text-text-main placeholder:text-text-sub focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsSearchOpen(false);
                        }}
                        className="flex size-8 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-text-sub"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {sortedCategories.slice(0, 8).map((category) => {
                          return (
                            <button
                              type="button"
                              key={category.categoryId}
                              className="group flex flex-col items-center justify-center gap-3 rounded-2xl bg-gray-50/50 p-4 transition-colors hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10"
                            >
                              {category.image && (
                                <div className="relative h-20 w-20 overflow-hidden mix-blend-multiply dark:mix-blend-normal">
                                  <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="aspect-square object-contain"
                                  />
                                </div>
                              )}
                              <span className="text-sm font-medium text-text-main">
                                {category.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div
              className={cn(
                "relative ml-auto flex items-center gap-2 lg:gap-3",
                isSearchOpen && !isLegalPage ? "z-30" : "z-50",
              )}
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label="Wishlist"
                className="dark:hover:bg-white/10"
              >
                <Heart className="size-5 text-text-main" />
              </Button>

              <div ref={userMenuRef} className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Tài khoản"
                  onClick={() => setIsUserMenuOpen((v) => !v)}
                  className={cn(
                    "dark:hover:bg-white/10",
                    isUserMenuOpen ? "bg-gray-100 dark:bg-white/10" : "",
                  )}
                >
                  <UserRound className="size-5 text-text-main" />
                </Button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-gray-100 bg-white py-1 shadow-xl animate-in fade-in slide-in-from-top-1 dark:border-white/8 dark:bg-surface-card dark:shadow-black/50">
                    <div className="border-b border-gray-100 px-4 py-3 dark:border-white/8">
                      <p className="text-sm font-semibold text-text-main">
                        Khách hàng
                      </p>
                      <p className="truncate text-xs text-text-sub">
                        khach@swiftera.com
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-main transition-colors hover:bg-gray-50 hover:text-theme-primary-start dark:hover:bg-white/8"
                      >
                        <UserRound
                          size={15}
                          className="shrink-0 text-text-sub"
                        />
                        Thông tin cá nhân
                      </Link>

                      <Link
                        href="/orders"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-main transition-colors hover:bg-gray-50 hover:text-theme-primary-start dark:hover:bg-white/8"
                      >
                        <FileText
                          size={15}
                          className="shrink-0 text-text-sub"
                        />
                        Đơn thuê của tôi
                      </Link>

                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-main transition-colors hover:bg-gray-50 hover:text-theme-primary-start dark:hover:bg-white/8"
                      >
                        <LayoutDashboard
                          size={15}
                          className="shrink-0 text-text-sub"
                        />
                        Trang quản trị
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 py-1 dark:border-white/8">
                      <button
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-theme-primary-start transition-colors hover:bg-red-50 dark:hover:bg-theme-primary-start/10"
                      >
                        <LogOut size={15} className="shrink-0" />
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                aria-label="Chuyển chế độ sáng/tối"
                onClick={toggleTheme}
                className="dark:hover:bg-white/10"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="size-5 text-text-main" />
                ) : (
                  <Moon className="size-5 text-text-main" />
                )}
              </Button>

              <Link href="/legal" title="Chính sách & pháp lý">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Pháp lý"
                  className={cn(
                    "dark:hover:bg-white/10",
                    isLegalPage ? "bg-gray-100 dark:bg-white/10" : "",
                  )}
                >
                  <FileText className="size-5 text-text-main" />
                </Button>
              </Link>

              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Cart"
                  className="dark:hover:bg-white/10"
                >
                  <ShoppingCart className="size-5 text-text-main" />
                </Button>
              </Link>

              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Đi tới trang đăng nhập"
                  className="dark:hover:bg-white/10"
                >
                  <LogIn className="size-5 text-text-main" />
                </Button>
              </Link>

              <Button
                variant="secondary"
                size="icon"
                className="hidden rounded-full bg-foreground text-white hover:bg-foreground/90 dark:bg-white/15 dark:hover:bg-white/25 lg:inline-flex"
                aria-label="More actions"
              >
                <Menu className="size-5" />
              </Button>
            </div>
          </div>

          {!isLegalPage && (
            <div
              className="relative hidden lg:block"
              onMouseLeave={() => setHoveredCategoryId(null)}
            >
              <div className="relative z-30 mt-3 hidden flex-wrap items-center gap-6 text-sm font-semibold text-text-main lg:flex">
                {sortedCategories.map((category) => (
                  <div key={category.categoryId}>
                    <Link
                      href={`/${category.slug}`}
                      onMouseEnter={() =>
                        setHoveredCategoryId(category.categoryId)
                      }
                      className={cn(
                        `flex shrink-0 items-center gap-2 rounded-full py-2 transition-colors ${
                          category.sortOrder === 1 ? "pr-3" : "px-3"
                        }`,
                        hoveredCategoryId === category.categoryId
                          ? "text-theme-primary-start"
                          : "hover:text-theme-primary-start",
                      )}
                    >
                      {category.name}
                    </Link>
                  </div>
                ))}
              </div>

              <div
                className="absolute left-0 top-full w-full"
                style={{ height: HOVER_BRIDGE_HEIGHT }}
                aria-hidden
              />

              {hoveredCategoryData &&
              (hoveredCategoryData.children?.length ||
                hoveredCategoryData.brands?.length) ? (
                <div
                  className="absolute left-1/2 z-50 w-screen -translate-x-1/2 cursor-default border-t border-border/40 bg-white shadow-xl animate-in fade-in slide-in-from-top-1 dark:border-white/5 dark:bg-surface-card dark:shadow-black/50"
                  style={{ top: `calc(100% + ${HOVER_BRIDGE_HEIGHT}px)` }}
                  onMouseEnter={() =>
                    setHoveredCategoryId(hoveredCategoryData.categoryId)
                  }
                >
                  <div className="mx-auto flex max-w-full gap-32 px-4 py-4 lg:px-18">
                    {hoveredCategoryData.children &&
                      hoveredCategoryData.children.length > 0 && (
                        <div className="w-70 shrink-0">
                          <h3 className="mb-6 text-lg font-bold text-text-main">
                            {hoveredCategoryData.name}
                          </h3>

                          <ul className="space-y-2">
                            {hoveredCategoryData.children.map((child) => (
                              <li
                                key={child.categoryId}
                                className="group/child relative"
                              >
                                <Link
                                  href={`/${child.slug}`}
                                  className="flex items-center justify-between py-2 font-medium text-text-main transition-colors hover:text-theme-primary-start"
                                >
                                  {child.name}
                                  {child.children &&
                                    child.children.length > 0 && (
                                      <ChevronRight className="size-5 text-text-sub transition-colors group-hover/child:text-theme-primary-start" />
                                    )}
                                </Link>

                                {child.children &&
                                  child.children.length > 0 && (
                                    <div className="absolute left-full top-0 z-50 hidden pl-8 group-hover/child:block">
                                      <div className="w-64 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl dark:border-white/8 dark:bg-[#1e1e26] dark:shadow-black/50">
                                        <ul className="space-y-1.5">
                                          {child.children.map((subChild) => (
                                            <li key={subChild.categoryId}>
                                              <Link
                                                href={`/${subChild.slug}`}
                                                className="block rounded-xl px-4 py-2.5 text-sm font-medium text-text-main transition-colors hover:bg-rose-50/50 hover:text-theme-primary-start dark:hover:bg-theme-primary-start/10"
                                              >
                                                {subChild.name}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {hoveredCategoryData.brands &&
                      hoveredCategoryData.brands.length > 0 && (
                        <div className="w-70 shrink-0">
                          <h3 className="mb-6 text-lg font-bold text-text-main">
                            Brands
                          </h3>
                          <ul className="space-y-2">
                            {hoveredCategoryData.brands.map((brand, index) => (
                              <li key={index}>
                                <Link
                                  href={`/brands/${brand.toLowerCase()}`}
                                  className="block py-2 font-medium text-text-main transition-colors hover:text-theme-primary-start"
                                >
                                  {brand}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </header>
    </>
  );
}
