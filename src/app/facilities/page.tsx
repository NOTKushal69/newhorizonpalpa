import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { facilities } from "@/lib/school";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "Campus facilities at New Horizon, Tansen — library, science laboratories, playground, volleyball court, canteen and smart classrooms.",
  alternates: { canonical: "/facilities" },
};

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        crumb="Facilities"
        title="Campus & Facilities"
        intro="Everything a student needs to learn, practise and play — on one campus in Tansen."
      />

      <section className="container-page py-16 lg:py-20">
        <div className="grid gap-8">
          {facilities.map((f, i) => (
            <Reveal key={f.name}>
              <article
                className={`grid items-center gap-6 overflow-hidden rounded-3xl bg-white shadow-card md:grid-cols-2 ${
                  i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[16/10] md:aspect-auto md:h-full md:min-h-72">
                  <Image
                    src={f.image}
                    alt={f.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 sm:p-10">
                  <span className="eyebrow">Facility {String(i + 1).padStart(2, "0")}</span>
                  <h2 className="mt-2 font-serif text-2xl font-bold text-navy-900">{f.name}</h2>
                  <p className="mt-3 text-ink/75 text-pretty">{f.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
