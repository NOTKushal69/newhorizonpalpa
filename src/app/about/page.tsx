import type { Metadata } from "next";
import Image from "next/image";

import { IconCheck } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { school } from "@/lib/school";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About New Horizon Awasiya Secondary School in Tansen, Palpa — our mission, vision, values and history since 2049 B.S.",
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Discipline", body: "A respectful, orderly campus where learning comes first." },
  { title: "Excellence", body: "High expectations in the classroom, backed by real support." },
  { title: "Character", body: "Honesty, responsibility and kindness, taught alongside subjects." },
  { title: "Community", body: "A close partnership between teachers, students and parents." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        title="About New Horizon"
        intro={`${school.tagline}. A trusted school in Tansen, Palpa since ${school.establishedBS}.`}
      />

      {/* Intro + image */}
      <section className="container-page py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="A trusted name in Tansen for over three decades"
              intro={`Established in ${school.establishedBS}, New Horizon has grown into one of Tansen's respected schools. Generations of families in Palpa have sent their children here to be taught well and raised with strong values.`}
            />
            <p className="mt-4 text-ink/75 text-pretty">
              Today the school runs up to Grade XII, offering Science and
              Management at the higher-secondary level, and is ISO-certified in
              recognition of its quality. Our focus has stayed the same
              throughout: careful teaching, a disciplined environment, and
              genuine care for every student&apos;s progress and character.
            </p>
          </div>
          <Reveal>
            <div className="overflow-hidden rounded-3xl shadow-card">
              <Image
                src="/photos/front.jpg"
                alt="Front view of the New Horizon campus"
                width={720}
                height={560}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-mist py-16 lg:py-20">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card h-full p-8">
              <span className="eyebrow">Our Mission</span>
              <p className="mt-3 text-lg text-ink/80 text-pretty">
                To provide quality education that helps every child in our
                community build strong knowledge, good habits and confidence for
                the future.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="card h-full p-8">
              <span className="eyebrow">Our Vision</span>
              <p className="mt-3 text-lg text-ink/80 text-pretty">
                To be a school that Tansen is proud of — known for disciplined,
                capable students who succeed academically and contribute to
                society.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="container-page py-16 lg:py-20">
        <SectionHeading eyebrow="Core Values" title="What we stand for" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 70}>
              <div className="card h-full p-6">
                <span className="grid size-10 place-items-center rounded-full bg-navy-900 text-white">
                  <IconCheck className="size-5" />
                </span>
                <h3 className="mt-4 font-serif text-lg font-bold text-navy-900">{v.title}</h3>
                <p className="mt-1.5 text-sm text-ink/70">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Principal's message — placeholder, clearly marked */}
      <section className="bg-navy-950 py-16 text-white lg:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="overflow-hidden rounded-3xl">
              <Image
                src="/photos/staff-1.jpg"
                alt="Principal, New Horizon"
                width={480}
                height={520}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <div>
            <span className="eyebrow !text-gold-400">Principal&apos;s Message</span>
            <blockquote className="mt-4 font-serif text-xl leading-relaxed text-balance sm:text-2xl">
              &ldquo;At New Horizon, we believe every child can do well when they
              are taught with care and held to a clear standard. We welcome you to
              be part of our school family.&rdquo;
            </blockquote>
            <p className="mt-5 text-navy-100">
              <span className="font-semibold text-white">The Principal</span>
              <br />
              <span className="text-sm text-navy-100/70">
                {school.name} {/* Replace with the principal's name */}
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
