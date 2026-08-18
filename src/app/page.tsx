import Image from "next/image";
import Link from "next/link";

import { AnnouncementModal } from "@/components/announcement-modal";
import {
  IconArrow,
  IconBook,
  IconChart,
  IconCheck,
  IconFlask,
  IconShield,
  IconSpark,
  IconTarget,
  ICONS,
} from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { VideoShowcase } from "@/components/video-showcase";
import {
  achievements,
  admission,
  facilities,
  gallery,
  highlights,
  highlightsNews,
  school,
} from "@/lib/school";

const achievementIcon = {
  shield: IconShield,
  target: IconTarget,
  book: IconBook,
  spark: IconSpark,
} as const;

const quickFacts = [
  { label: "Established", value: school.establishedBS, sub: "A trusted name for 30+ years" },
  { label: "Grade XI Streams", value: "2", sub: "Science & Management" },
  { label: "Location", value: "Tansen", sub: "Palpa, Lumbini Province" },
  { label: "Approach", value: "Character + Results", sub: "Academics with values" },
];

const streamIcon = { science: IconFlask, management: IconChart } as const;

export default function HomePage() {
  return (
    <>
      <AnnouncementModal />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        {/* Drone footage of the campus as the background. Muted + autoplay +
            loop so it plays everywhere; the poster shows before it loads and
            on data-saver browsers that block autoplay. */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/photos/campus.jpg"
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-35"
        >
          <source src="/video/campus-2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/80 via-navy-900/85 to-navy-950" />

        <div className="container-page grid gap-10 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
          <div>
            <span className="eyebrow !text-gold-400">{school.tagline}</span>
            <h1 className="mt-4 font-serif text-4xl font-extrabold leading-[1.08] text-balance sm:text-5xl lg:text-6xl">
              A strong start for every child in{" "}
              <span className="text-gold-400">Tansen</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-pretty text-navy-100">
              New Horizon Awasiya Secondary School combines experienced teachers,
              a disciplined environment and modern facilities — so students learn
              well and grow into good people.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/admissions" className="btn btn-gold">
                Apply for Admission <IconArrow className="size-4" />
              </Link>
              <Link href="/about" className="btn btn-outline">
                Explore Our School
              </Link>
            </div>
          </div>

          {/* Admission banner card */}
          {admission.open && (
            <Reveal className="lg:justify-self-end">
              <div className="w-full max-w-sm rounded-2xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur">
                <span className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-navy-950">
                  <span className="size-1.5 animate-pulse rounded-full bg-navy-950" />
                  ADMISSIONS OPEN {admission.academicYearBS}
                </span>
                <p className="mt-4 font-serif text-2xl font-bold">
                  Grade XI — Science &amp; Management
                </p>
                <ul className="mt-4 space-y-2 text-sm text-navy-100">
                  {admission.streams.map((s) => (
                    <li key={s.key} className="flex items-start gap-2">
                      <IconCheck className="mt-0.5 size-4 shrink-0 text-gold-400" />
                      <span>
                        <strong className="text-white">{s.name}:</strong>{" "}
                        {s.optionals.join(", ")}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href="/admissions" className="btn btn-gold mt-5 w-full">
                  See Admission Details
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── Quick facts ──────────────────────────────────────── */}
      <section className="border-b border-black/5 bg-mist">
        <div className="container-page grid grid-cols-2 gap-px overflow-hidden py-2 lg:grid-cols-4">
          {quickFacts.map((f) => (
            <div key={f.label} className="px-4 py-6 text-center">
              <p className="font-serif text-2xl font-extrabold text-navy-900 sm:text-3xl">
                {f.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-navy-700">{f.label}</p>
              <p className="text-xs text-ink/55">{f.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Introduction ─────────────────────────────────────── */}
      <section className="container-page py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-3xl shadow-card">
              <Image
                src="/photos/about.jpg"
                alt="Students and campus at New Horizon"
                width={720}
                height={560}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-navy-900 px-6 py-5 text-white shadow-lift sm:block">
              <p className="font-serif text-3xl font-extrabold text-gold-400">
                {school.establishedBS}
              </p>
              <p className="text-xs tracking-wide text-navy-100">
                Serving Tansen since establishment
              </p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Welcome to New Horizon"
              title="Quality education, and children we're proud of"
              intro="For over three decades, families in Tansen have trusted New Horizon to educate their children well. We keep class sizes focused, hold students to a real standard, and pair strong academics with discipline and character."
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Experienced, qualified teachers",
                "Calm, disciplined campus",
                "Smart classes & practical labs",
                "Co-curricular activities for all",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-ink/80">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-navy-50 text-navy-700">
                    <IconCheck className="size-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn btn-navy">
                About the School
              </Link>
              <Link href="/academics" className="btn btn-ghost">
                Our Academics
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Grade XI streams ─────────────────────────────────── */}
      <section className="bg-navy-950 py-20 text-white lg:py-24">
        <div className="container-page">
          <SectionHeading
            tone="light"
            eyebrow={`Grade XI · ${admission.academicYearBS}`}
            title="Choose the stream that fits your future"
            intro="After SEE, continue at New Horizon in Science or Management — each with a computer-science option to keep pace with a digital world."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {admission.streams.map((s, i) => {
              const Icon = streamIcon[s.key as keyof typeof streamIcon];
              return (
                <Reveal key={s.key} delay={i * 80}>
                  <div className="group h-full rounded-2xl bg-white/[0.06] p-8 ring-1 ring-white/10 transition-colors hover:bg-white/[0.1]">
                    <span className="grid size-14 place-items-center rounded-xl bg-gold-500 text-navy-950">
                      <Icon className="size-7" />
                    </span>
                    <h3 className="mt-5 font-serif text-2xl font-bold">{s.name}</h3>
                    <p className="mt-2 text-navy-100/85">{s.blurb}</p>
                    <div className="mt-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">
                        Optional subjects
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {s.optionals.map((o) => (
                          <span
                            key={o}
                            className="rounded-full bg-white/10 px-3 py-1 text-sm ring-1 ring-white/15"
                          >
                            {o}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link
                      href="/admissions"
                      className="mt-6 inline-flex items-center gap-1.5 font-semibold text-gold-400 hover:text-gold-500"
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

      {/* ── Why New Horizon (4 commitments) ──────────────────── */}
      <section className="container-page py-20 lg:py-24">
        <SectionHeading
          eyebrow="Why New Horizon"
          title="Four commitments behind every classroom"
          intro="These are the promises printed on our admission notice — and the way we run the school every day."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => {
            const Icon = ICONS[h.icon as keyof typeof ICONS] ?? IconBook;
            return (
              <Reveal key={h.title} delay={i * 70}>
                <div className="card h-full p-6 transition-transform hover:-translate-y-1">
                  <span className="grid size-12 place-items-center rounded-xl bg-navy-50 text-navy-700">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-4 font-serif text-lg font-bold text-navy-900">
                    {h.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink/70">{h.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── Achievements ─────────────────────────────────────── */}
      <section className="bg-navy-950 py-20 text-white lg:py-24">
        <div className="container-page">
          <SectionHeading
            tone="light"
            eyebrow="Achievements"
            title="A record the community is proud of"
            intro="Recognised for quality, and known for students who go on to do well."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((a, i) => {
              const Icon = achievementIcon[a.icon as keyof typeof achievementIcon];
              return (
                <Reveal key={a.title} delay={i * 70}>
                  <div className="h-full rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10">
                    <span className="grid size-12 place-items-center rounded-xl bg-gold-500 text-navy-950">
                      <Icon className="size-6" />
                    </span>
                    <h3 className="mt-4 font-serif text-lg font-bold">{a.title}</h3>
                    <p className="mt-1.5 text-sm text-navy-100/80">{a.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── News & Highlights ────────────────────────────────── */}
      <section className="container-page py-20 lg:py-24">
        <SectionHeading
          eyebrow="News & Highlights"
          title="Moments from campus life"
          intro="From daily assembly to prize days and eco activities — a glimpse of what happens at New Horizon."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlightsNews.map((n, i) => (
            <Reveal key={n.title} delay={(i % 3) * 70}>
              <article className="group h-full overflow-hidden rounded-2xl bg-white shadow-card">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={n.image}
                    alt={n.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-navy-900">{n.title}</h3>
                  <p className="mt-1.5 text-sm text-ink/70">{n.caption}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Facilities preview ───────────────────────────────── */}
      <section className="bg-mist py-20 lg:py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              align="left"
              eyebrow="Campus & Facilities"
              title="Room to learn, play and grow"
            />
            <Link href="/facilities" className="btn btn-ghost">
              All facilities <IconArrow className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.slice(0, 6).map((f, i) => (
              <Reveal key={f.name} delay={(i % 3) * 70}>
                <article className="group overflow-hidden rounded-2xl bg-white shadow-card">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={f.image}
                      alt={f.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-bold text-navy-900">{f.name}</h3>
                    <p className="mt-1.5 text-sm text-ink/70">{f.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Campus video ─────────────────────────────────────── */}
      <section className="container-page py-20 lg:py-24">
        <SectionHeading
          eyebrow="Campus Tour"
          title="See New Horizon for yourself"
          intro="A short look around our campus and school day in Tansen, Palpa."
        />
        <div className="mt-12">
          <VideoShowcase />
        </div>
      </section>

      {/* ── Gallery preview ──────────────────────────────────── */}
      <section className="bg-mist py-20 lg:py-24">
       <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading align="left" eyebrow="Gallery" title="Life at New Horizon" />
          <Link href="/gallery" className="btn btn-ghost">
            Full gallery <IconArrow className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.slice(0, 8).map((g, i) => (
            <Reveal
              key={g.src}
              delay={(i % 4) * 60}
              className={i === 0 ? "col-span-2 row-span-2" : ""}
            >
              <div className="relative h-full overflow-hidden rounded-xl">
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
       </div>
      </section>
    </>
  );
}
