"use client";

import { useState } from "react";

import { IconCheck } from "@/components/icons";
import { admission, school, telHref } from "@/lib/school";

/**
 * Grade XI application form with client-side validation, a honeypot spam trap,
 * and success/error states.
 *
 * NOTE: there is no backend wired up in this build, so submissions are not yet
 * delivered anywhere. To go live, POST `payload` to an API route or a form
 * service (e.g. a Next.js route handler that emails the office). The validation,
 * UX and accessibility here are production-ready; only the transport is stubbed.
 */
type Errors = Record<string, string>;

const fieldBase =
  "w-full rounded-lg border border-black/10 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-navy-600 focus:ring-2 focus:ring-navy-600/20";

export function AdmissionForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  function validate(form: HTMLFormElement): Errors {
    const e: Errors = {};
    const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement)?.value.trim() ?? "";

    if (get("studentName").length < 2) e.studentName = "Enter the student's full name.";
    if (!get("dob")) e.dob = "Select the date of birth.";
    if (!get("stream")) e.stream = "Choose a stream.";
    if (get("guardianName").length < 2) e.guardianName = "Enter a parent/guardian name.";
    const phone = get("phone");
    if (!/^[0-9+\-\s]{7,}$/.test(phone)) e.phone = "Enter a valid phone number.";
    const email = get("email");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email, or leave it blank.";
    if (!(form.elements.namedItem("consent") as HTMLInputElement)?.checked)
      e.consent = "Please confirm the information is correct.";
    return e;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    // Honeypot: real users never fill this hidden field.
    if ((form.elements.namedItem("company") as HTMLInputElement)?.value) return;

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      form.querySelector<HTMLElement>(`[data-field="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    const payload = Object.fromEntries(new FormData(form).entries());
    // TODO: replace with a real POST to your API route / email service.
    await new Promise((r) => setTimeout(r, 700));
    console.info("Admission enquiry (not yet delivered):", payload);
    setStatus("done");
    form.reset();
  }

  if (status === "done") {
    return (
      <div className="card p-8 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-100 text-emerald-700">
          <IconCheck className="size-7" />
        </span>
        <h3 className="mt-4 font-serif text-xl font-bold text-navy-900">Thank you!</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink/70">
          Your enquiry has been recorded. Our admissions team will get in touch.
          For anything urgent, please call{" "}
          <a href={telHref(school.phones[0])} className="font-semibold text-navy-700">
            {school.phones[0]}
          </a>
          .
        </p>
        <button onClick={() => setStatus("idle")} className="btn btn-ghost mt-6">
          Submit another enquiry
        </button>
      </div>
    );
  }

  const err = (name: string) =>
    errors[name] ? (
      <p className="mt-1 text-xs text-crest" role="alert">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px]"
        aria-hidden
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="studentName" className="mb-1.5 block text-sm font-medium text-navy-900">
            Student&apos;s full name <span className="text-crest">*</span>
          </label>
          <input id="studentName" name="studentName" data-field="studentName" className={fieldBase} placeholder="e.g. Sita Sharma" />
          {err("studentName")}
        </div>

        <div>
          <label htmlFor="dob" className="mb-1.5 block text-sm font-medium text-navy-900">
            Date of birth <span className="text-crest">*</span>
          </label>
          <input id="dob" name="dob" data-field="dob" type="date" className={fieldBase} />
          {err("dob")}
        </div>

        <div>
          <label htmlFor="gender" className="mb-1.5 block text-sm font-medium text-navy-900">
            Gender
          </label>
          <select id="gender" name="gender" className={fieldBase} defaultValue="">
            <option value="" disabled>Select</option>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="stream" className="mb-1.5 block text-sm font-medium text-navy-900">
            Stream <span className="text-crest">*</span>
          </label>
          <select id="stream" name="stream" data-field="stream" className={fieldBase} defaultValue="">
            <option value="" disabled>Select a stream</option>
            {admission.streams.map((s) => (
              <option key={s.key} value={s.name}>{s.name}</option>
            ))}
          </select>
          {err("stream")}
        </div>

        <div>
          <label htmlFor="previousSchool" className="mb-1.5 block text-sm font-medium text-navy-900">
            Previous school
          </label>
          <input id="previousSchool" name="previousSchool" className={fieldBase} placeholder="Where you studied SEE" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="guardianName" className="mb-1.5 block text-sm font-medium text-navy-900">
            Parent / guardian name <span className="text-crest">*</span>
          </label>
          <input id="guardianName" name="guardianName" data-field="guardianName" className={fieldBase} placeholder="Full name" />
          {err("guardianName")}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy-900">
            Phone <span className="text-crest">*</span>
          </label>
          <input id="phone" name="phone" data-field="phone" type="tel" inputMode="tel" className={fieldBase} placeholder="98XXXXXXXX" />
          {err("phone")}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy-900">
            Email
          </label>
          <input id="email" name="email" data-field="email" type="email" className={fieldBase} placeholder="Optional" />
          {err("email")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-navy-900">
            Address
          </label>
          <input id="address" name="address" className={fieldBase} placeholder="Municipality / ward, district" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy-900">
            Message
          </label>
          <textarea id="message" name="message" rows={4} className={fieldBase} placeholder="Any questions for the admissions team?" />
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-2.5 text-sm text-ink/75">
            <input type="checkbox" name="consent" data-field="consent" className="mt-0.5 size-4 accent-navy-900" />
            <span>
              I confirm the information provided is correct and agree to be
              contacted by the school about this enquiry.
            </span>
          </label>
          {err("consent")}
        </div>
      </div>

      <button type="submit" disabled={status === "submitting"} className="btn btn-gold mt-6 w-full sm:w-auto">
        {status === "submitting" ? "Submitting…" : "Submit Application"}
      </button>
      <p className="mt-3 text-xs text-ink/55">
        Prefer to talk? Call{" "}
        <a href={telHref(school.phones[0])} className="font-medium text-navy-700">{school.phones[0]}</a>
        {" "}or{" "}
        <a href={telHref(school.phones[1])} className="font-medium text-navy-700">{school.phones[1]}</a>.
      </p>
    </form>
  );
}
