import type { Metadata } from "next";
import Link from "next/link";

import { IconArrow, IconChart, IconCheck, IconFlask } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { admission } from "@/lib/school";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Academics at New Horizon — Grade XI Science and Management streams with computer science options, plus school-level education in Tansen, Palpa.",
  alternates: { canonical: "/academics" },
};

const streamIcon = { science: IconFlask, management: IconChart } as const;

const levels = [
  { name: "Basic Level", detail: "Foundation years building literacy, numeracy and good habits." },
  { name: "Secondary (Grades 9–10)", detail: "Preparation for the SEE with strong subject teaching." },
  { name: "Higher Secondary (Grades 11–12)", detail: "Science and Management streams leading to the +2 board exams." },
];

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        crumb="Academics"
        title="Academics at New Horizon"
        intro="A clear path from the early years through to Grade XII, with two focused streams at the higher-secondary level."
      />

      {/* Levels */}
      <section className="container-page py-16 lg:py-20">
        <SectionHeading
          eyebrow="Academic Programs"
          title="Learning at every level"
          intro="New Horizon supports students through school and into higher secondary, keeping standards high at each step."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {levels.map((l, i) => (
            <Reveal key={l.name} delay={i * 70}>
              <div className="card h-full p-6">
                <span className="font-serif text-4xl font-extrabold text-navy-100">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-serif text-lg font-bold text-navy-900">{l.name}</h3>
                <p className="mt-1.5 text-sm text-ink/70">{l.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Grade XI streams — the real offering */}
      <section id="grade-xi" className="bg-mist py-16 lg:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow={`Grade XI · ${admission.academicYearBS}`}
            title="Higher Secondary streams"
            intro="Choose the stream that matches your goals. Both include a computer-science option."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {admission.streams.map((s, i) => {
              const Icon = streamIcon[s.key as keyof typeof streamIcon];
              return (
                <Reveal key={s.key} delay={i * 80}>
                  <div className="card h-full p-8">
                    <div className="flex items-center gap-4">
                      <span className="grid size-14 place-items-center rounded-xl bg-navy-900 text-gold-400">
                        <Icon className="size-7" />
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-navy-900">
                        {s.name}
                      </h3>
                    </div>
                    <p className="mt-4 text-ink/75">{s.blurb}</p>

                    <div className="mt-5 rounded-xl bg-navy-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-navy-700">
                        Optional subjects
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {s.optionals.map((o) => (
                          <li key={o} className="flex items-center gap-2 text-sm text-ink/80">
                            <IconCheck className="size-4 text-navy-700" />
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href="/admissions"
                      className="btn btn-navy mt-6 w-full"
                    >
                      Apply for {s.name} <IconArrow className="size-4" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="container-page py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHeading
            align="left"
            eyebrow="Our Approach"
            title="Teaching that sticks"
            intro="We combine clear classroom teaching with hands-on practice, regular assessment and personal attention — so students understand, not just memorise."
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              "Experienced subject teachers",
              "Practical labs for Science",
              "Smart-class teaching aids",
              "Regular tests & feedback",
              "Exam-focused revision",
              "Co-curricular activities",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 rounded-lg bg-mist px-4 py-3 text-sm text-ink/80">
                <IconCheck className="size-4 shrink-0 text-navy-700" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
