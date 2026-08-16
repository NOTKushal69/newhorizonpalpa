import Image from "next/image";
import Link from "next/link";

import { school } from "@/lib/school";

/**
 * The school crest + wordmark used in the header and footer. The crest image is
 * the exact official logo — never recoloured or redrawn.
 */
export function Logo({
  variant = "dark",
  className = "",
}: {
  /** "dark" text for light backgrounds, "light" text for the navy footer. */
  variant?: "dark" | "light";
  className?: string;
}) {
  const nameColor = variant === "light" ? "text-white" : "text-navy-900";
  const subColor = variant === "light" ? "text-navy-100" : "text-navy-600/70";

  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label={`${school.name} — home`}
    >
      <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-white shadow-[0_2px_10px_rgba(11,43,92,0.18)] ring-1 ring-black/5">
        <Image
          src="/crest.png"
          alt=""
          width={44}
          height={44}
          className="size-10 object-contain"
          priority
        />
      </span>
      <span className="leading-tight">
        <span className={`block font-serif text-[0.95rem] font-bold ${nameColor}`}>
          New Horizon
        </span>
        <span className={`block text-[0.68rem] font-medium tracking-wide ${subColor}`}>
          Awasiya Secondary School
        </span>
      </span>
    </Link>
  );
}
