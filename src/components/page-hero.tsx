import Link from "next/link";

/** Compact banner for interior pages, with breadcrumbs. */
export function PageHero({
  title,
  intro,
  crumb,
}: {
  title: string;
  intro?: string;
  crumb: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="container-page py-14 lg:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-navy-100/70">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-gold-400">Home</Link></li>
            <li aria-hidden>/</li>
            <li className="text-white" aria-current="page">{crumb}</li>
          </ol>
        </nav>
        <h1 className="mt-3 font-serif text-3xl font-extrabold text-balance sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {intro ? (
          <p className="mt-3 max-w-2xl text-lg text-pretty text-navy-100">{intro}</p>
        ) : null}
      </div>
    </section>
  );
}
