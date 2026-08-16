import type { Metadata } from "next";
import Link from "next/link";

import { IconArrow } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { notices } from "@/lib/school";

export const metadata: Metadata = {
  title: "Notices",
  description:
    "Latest notices and announcements from New Horizon Awasiya Secondary School, Tansen — admissions, exams, scholarships and events.",
  alternates: { canonical: "/notices" },
};

function formatBS(date: string) {
  // Dates are stored as B.S. (yyyy-mm-dd); show them as-is with a B.S. label.
  return `${date} B.S.`;
}

export default function NoticesPage() {
  const sorted = [...notices].sort((a, b) => Number(b.pinned) - Number(a.pinned));

  return (
    <>
      <PageHero
        crumb="Notices"
        title="Notices & Announcements"
        intro="Official updates from the school. Please confirm dates and details at the school office."
      />

      <section className="container-page py-16 lg:py-20">
        <div className="mx-auto grid max-w-3xl gap-4">
          {sorted.map((n, i) => (
            <Reveal key={n.title} delay={i * 60}>
              <article className="card flex flex-col gap-3 p-6 sm:flex-row sm:items-start sm:gap-6">
                <div className="shrink-0">
                  <span className="inline-flex rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-700">
                    {n.category}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-serif text-lg font-bold text-navy-900">{n.title}</h2>
                    {n.pinned && (
                      <span className="rounded bg-gold-500/15 px-2 py-0.5 text-[11px] font-bold text-gold-600">
                        PINNED
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-ink/50">{formatBS(n.date)}</p>
                  <p className="mt-2 text-sm text-ink/75 text-pretty">{n.body}</p>
                  {n.category === "Admissions" && (
                    <Link
                      href="/admissions"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-navy-900"
                    >
                      Admission details <IconArrow className="size-4" />
                    </Link>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-ink/50">
          Notices shown here are examples of the format. Replace them with the
          school&apos;s official notices, or connect this page to a content system.
        </p>
      </section>
    </>
  );
}
