"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs({ current } = {}) {
  const pathname = usePathname();

  // Don't show on home page
  if (pathname === "/") return null;

  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm font-body">
        <li>
          <Link href="/" className="text-outline-variant hover:text-primary transition-colors flex items-center">
            <span className="material-symbols-outlined text-[16px]">home</span>
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          
          // Format segment to be more readable (e.g., 'web-development' -> 'Web Development')
          const formattedSegment = segment
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          // Slugs make poor labels ("Seo And Ai Search"), so a page can name
          // its own last crumb.
          const label = isLast && current ? current : formattedSegment;

          return (
            <li key={href} className="flex items-center gap-2">
              <span className="material-symbols-outlined text-outline-variant/50 text-[14px]">chevron_right</span>
              {isLast ? (
                <span className="text-on-surface font-medium pointer-events-none" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link href={href} className="text-outline-variant hover:text-primary transition-colors">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
