import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { IconClock, IconMail, IconPhone, IconPin } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { school, telHref } from "@/lib/school";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact New Horizon Awasiya Secondary School, Tansen-7, Palpa. Phone, address, office hours, map and enquiry form.",
  alternates: { canonical: "/contact" },
};

const mapSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1681.15!2d83.54536554629934!3d27.860301016204104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39967ed6f3ed4ad5%3A0x8ccffcf72acef6a2!2sNew%20Horizon%20Higher%20Secondary%20School!5e0!3m2!1sen!2snp!4v1691211672801!5m2!1sen!2snp";

export default function ContactPage() {
  const items = [
    {
      Icon: IconPin,
      label: "Address",
      lines: [school.address.line, `${school.address.province}, ${school.address.country}`],
    },
    {
      Icon: IconPhone,
      label: "Phone",
      lines: school.phones,
      hrefs: school.phones.map(telHref),
    },
    {
      Icon: IconMail,
      label: "Email",
      lines: [school.email],
      hrefs: [`mailto:${school.email}`],
    },
    { Icon: IconClock, label: "Office Hours", lines: [school.officeHours] },
  ];

  return (
    <>
      <PageHero
        crumb="Contact"
        title="Contact Us"
        intro="Visit the campus in Tansen, give us a call, or send a message — we'd be glad to help."
      />

      <section className="container-page py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Details */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {items.map(({ Icon, label, lines, hrefs }) => (
              <div key={label} className="card flex gap-4 p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-700">
                    {label}
                  </p>
                  {lines.map((line, i) => (
                    <p key={line} className="text-sm text-ink/80">
                      {hrefs?.[i] ? (
                        <a href={hrefs[i]} className="hover:text-navy-900">{line}</a>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </section>

      {/* Map */}
      <section aria-label="Map" className="border-t border-black/5">
        <iframe
          title="New Horizon location on Google Maps"
          src={mapSrc}
          className="h-[400px] w-full"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
