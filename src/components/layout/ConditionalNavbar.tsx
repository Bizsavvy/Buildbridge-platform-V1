"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

/**
 * ConditionalNavbar hides the global top navigation bar on all /dashboard/* routes.
 * The dashboard uses its own left-side navigation instead.
 *
 * On all other routes it renders:
 *  1. The <Navbar /> itself (fixed-positioned at the top)
 *  2. A spacer div (pt-28) to push page content below the fixed navbar
 *
 * This replaces the previous pt-28 that lived on the root layout's <main>.
 */
export function ConditionalNavbar() {
  const pathname = usePathname();

  const isDashboard =
    pathname === "/dashboard" || pathname?.startsWith("/dashboard/");

  if (isDashboard) return null;

  return (
    <>
      <Navbar />
      {/* Spacer to offset fixed navbar height for non-dashboard pages */}
      <div className="pt-28" aria-hidden="true" />
    </>
  );
}
