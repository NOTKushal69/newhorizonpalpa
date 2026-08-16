"use client";

import { useState } from "react";

import { IconCheck } from "@/components/icons";
import { school, telHref } from "@/lib/school";

/**
 * General enquiry form. Same validation/honeypot pattern as the admission form.
 * Transport is stubbed — wire `payload` to an API route or form service to
 * actually deliver messages.
 */
const fieldBase =
  "w-full rounded-lg border border-black/10 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-navy-600 focus:ring-2 focus:ring-navy-600/20";

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if ((form.elements.namedItem("company") as HTMLInputElement)?.value) return;

    const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement)?.value.trim() ?? "";
    const e: Record<string, string> = {};
    if (get("name").length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) e.email = "Enter a valid email.";
    if (get("message").length < 5) e.message = "Please write a short message.";
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus("submitting");
    const payload = Object.fromEntries(new FormData(form).entries());
    await new Promise((r) => setTimeout(r, 600));
    console.info("Contact enquiry (not yet delivered):", payload);
    setStatus("done");
    form.reset();
  }

  if (status === "done") {
    return (
      <div className="card grid place-items-center p-10 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-emerald-100 text-emerald-700">
          <IconCheck className="size-7" />
        </span>
        <h3 className="mt-4 font-serif text-xl font-bold text-navy-900">Message sent</h3>
        <p className="mt-2 max-w-sm text-sm text-ink/70">
          Thanks for reaching out. For anything urgent, call{" "}
          <a href={telHref(school.phones[0])} className="font-semibold text-navy-700">
            {school.phones[0]}
          </a>
          .
        </p>
        <button onClick={() => setStatus("idle")} className="btn btn-ghost mt-6">
          Send another message
        </button>
      </div>
    );
  }

  const err = (n: string) =>
    errors[n] ? <p className="mt-1 text-xs text-crest" role="alert">{errors[n]}</p> : null;

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px]" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium text-navy-900">
            Name <span className="text-crest">*</span>
          </label>
          <input id="c-name" name="name" className={fieldBase} placeholder="Your name" />
          {err("name")}
        </div>
        <div>
          <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium text-navy-900">
            Email <span className="text-crest">*</span>
          </label>
          <input id="c-email" name="email" type="email" className={fieldBase} placeholder="you@email.com" />
          {err("email")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-phone" className="mb-1.5 block text-sm font-medium text-navy-900">
            Phone
          </label>
          <input id="c-phone" name="phone" type="tel" className={fieldBase} placeholder="Optional" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-subject" className="mb-1.5 block text-sm font-medium text-navy-900">
            Subject
          </label>
          <input id="c-subject" name="subject" className={fieldBase} placeholder="How can we help?" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-message" className="mb-1.5 block text-sm font-medium text-navy-900">
            Message <span className="text-crest">*</span>
          </label>
          <textarea id="c-message" name="message" rows={5} className={fieldBase} placeholder="Write your message…" />
          {err("message")}
        </div>
      </div>

      <button type="submit" disabled={status === "submitting"} className="btn btn-navy mt-6 w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
