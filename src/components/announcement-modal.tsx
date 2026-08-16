"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { IconArrow, IconCheck, IconClose, IconPhone } from "@/components/icons";
import { admission, school, telHref } from "@/lib/school";

const DISMISS_KEY = "nh_admission_seen";

/**
 * The Grade XI admission announcement. Pops up shortly after the homepage
 * loads and is dismissable by the close button, the backdrop, or Escape
 * ("cut it"). It stays closed for the rest of the browser session so it
 * doesn't nag on every navigation.
 *
 * The card is a faithful, responsive rebuild of the printed admission poster.
 * To show the exact poster artwork instead, drop the image at
 * `public/announcement.jpg` and set SHOW_POSTER_IMAGE to true.
 */
const SHOW_POSTER_IMAGE = true;

export function AnnouncementModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!admission.open) return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    const timer = setTimeout(() => {
      setMounted(true);
      // next frame → trigger the enter transition
      requestAnimationFrame(() => setOpen(true));
    }, 650);
    return () => clearTimeout(timer);
  }, []);

  // Escape to close, focus the close button on open, lock body scroll.
  useEffect(() => {
    if (!mounted) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mounted]);

  function close() {
    setOpen(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
    setTimeout(() => setMounted(false), 250); // wait out the exit transition
  }

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admission-title"
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-250 ${
        open ? "opacity-100" : "opacity-0"
      }`}
    >
      <button
        type="button"
        aria-label="Close announcement"
        onClick={close}
        className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm"
        tabIndex={-1}
      />

      <div
        className={`relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-lift transition-all duration-250 ${
          open ? "scale-100 translate-y-0" : "scale-95 translate-y-3"
        }`}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30"
        >
          <IconClose className="size-5" />
        </button>

        {SHOW_POSTER_IMAGE ? (
          <Link href="/admissions" onClick={close} className="block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/announcement.jpg" alt="Grade XI admissions open for 2083" className="w-full" />
          </Link>
        ) : (
          <div className="relative bg-gradient-to-br from-navy-900 via-navy-900 to-navy-950 px-6 pb-7 pt-9 text-center text-white">
            <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-gold-500/20 blur-2xl" />
            <div className="relative">
              <span className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-white p-1 shadow-lg ring-2 ring-gold-500/60">
                <Image src="/crest.png" alt="" width={52} height={52} className="size-12 object-contain" />
              </span>

              <span className="eyebrow !text-gold-400">Admissions Open · {admission.academicYearBS}</span>
              <h2 id="admission-title" className="mt-2 font-serif text-3xl font-extrabold sm:text-4xl">
                Grade{" "}
                <span className="rounded-lg bg-gold-500 px-2 text-navy-950">XI</span>
              </h2>
              <p className="mt-1 text-sm text-navy-100">
                {school.name} · Tansen, Palpa
              </p>

              <div className="mt-5 grid gap-3 text-left sm:grid-cols-2">
                {admission.streams.map((s) => (
                  <div key={s.key} className="rounded-xl bg-white/10 p-3.5 ring-1 ring-white/15">
                    <p className="font-serif text-lg font-bold text-gold-400">{s.name}</p>
                    <ul className="mt-1.5 space-y-1">
                      {s.optionals.map((o) => (
                        <li key={o} className="flex items-center gap-1.5 text-xs text-navy-100">
                          <IconCheck className="size-3.5 text-gold-400" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                <Link href="/admissions" onClick={close} className="btn btn-gold">
                  Apply Now <IconArrow className="size-4" />
                </Link>
                <a href={telHref(school.phones[0])} className="btn btn-outline">
                  <IconPhone className="size-4" /> {school.phones[0]}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
