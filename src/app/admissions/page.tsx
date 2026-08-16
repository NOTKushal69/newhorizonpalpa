import type { Metadata } from "next";

import { AdmissionForm } from "@/components/admission-form";
import { IconCheck } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { admission, school } from "@/lib/school";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Grade XI admissions at New Horizon, Tansen — Science and Management streams for 2083. Eligibility, process, documents and online application.",
  alternates: { canonical: "/admissions" },
};

const steps = [
  { title: "Enquire or apply", body: "Submit the form below, call the office, or visit the campus in Tansen." },
  { title: "Submit documents", body: "Provide your SEE marksheet, character certificate and photographs." },
  { title: "Entrance & interview", body: "Attend a short entrance and interview on the scheduled date." },
  { title: "Enrol", body: "Complete admission formalities and begin the session." },
];

const documents = [
  "SEE marksheet & certificate",
  "Character certificate from previous school",
  "Birth certificate / citizenship (as applicable)",
  "Passport-size photographs",
  "Guardian's contact details",
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        crumb="Admissions"
        title={`Grade XI Admissions — ${admission.academicYearBS}`}
        intro="Applications are open for Science and Management. Here's everything you need to apply."
      />

      {/* Streams recap */}
      <section className="container-page py-16 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {admission.streams.map((s, i) => (
            <Reveal key={s.key} delay={i * 80}>
              <div className="card h-full p-7">
                <span className="eyebrow">Stream</span>
                <h2 className="mt-2 font-serif text-2xl font-bold text-navy-900">{s.name}</h2>
                <p className="mt-2 text-ink/75">{s.blurb}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-navy-700">
                  Optional subjects
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {s.optionals.map((o) => (
                    <span key={o} className="rounded-full bg-navy-50 px-3 py-1 text-sm text-navy-800">
                      {o}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-mist py-16 lg:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="How to Apply" title="A simple, four-step process" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 70}>
                <div className="card h-full p-6">
                  <span className="grid size-10 place-items-center rounded-full bg-gold-500 font-serif font-bold text-navy-950">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-serif text-lg font-bold text-navy-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-ink/70">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Documents + eligibility */}
      <section className="container-page py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="Eligibility" title="Who can apply" />
            <p className="mt-4 text-ink/75 text-pretty">
              Students who have appeared in or passed the SEE are eligible to
              apply for Grade XI. Final selection is based on SEE results and a
              short entrance and interview. Scholarship options are available for
              deserving students — enquire at the admissions desk.
            </p>
            <p className="mt-3 text-sm text-ink/55">
              Fee structure and important dates are confirmed at the school
              office. Contact us for the current session&apos;s details.
            </p>
          </div>
          <div>
            <SectionHeading align="left" eyebrow="Required Documents" title="What to bring" />
            <ul className="mt-4 space-y-2.5">
              {documents.map((d) => (
                <li key={d} className="flex items-start gap-2.5 text-ink/80">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-navy-900 text-white">
                    <IconCheck className="size-3.5" />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="bg-mist py-16 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Online Application"
              title="Apply for Grade XI"
              intro="Fill in the form and our admissions team will reach out. Fields marked * are required."
            />
            <div className="mt-6 rounded-2xl bg-navy-900 p-6 text-white">
              <p className="font-serif text-lg font-bold text-gold-400">Need help?</p>
              <p className="mt-1 text-sm text-navy-100">
                Call the school office or visit us at {school.address.line}. We&apos;re
                happy to guide you through admission.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {school.phones.map((p) => (
                  <li key={p} className="font-semibold text-white">{p}</li>
                ))}
              </ul>
            </div>
          </div>
          <AdmissionForm />
        </div>
      </section>
    </>
  );
}
