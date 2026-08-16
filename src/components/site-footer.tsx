import Link from "next/link";

import { Logo } from "@/components/logo";
import {
  IconFacebook,
  IconInstagram,
  IconMail,
  IconPhone,
  IconPin,
  IconYoutube,
} from "@/components/icons";
import { nav, school, telHref } from "@/lib/school";

const quickLinks = nav.filter((n) => n.href !== "/");

export function SiteFooter() {
  const socials = [
    { href: school.social.facebook, label: "Facebook", Icon: IconFacebook },
    { href: school.social.instagram, label: "Instagram", Icon: IconInstagram },
    { href: school.social.youtube, label: "YouTube", Icon: IconYoutube },
  ].filter((s) => s.href);

  return (
    <footer className="mt-24 bg-navy-950 text-navy-100">
      {/* Final CTA band */}
      <div className="border-b border-white/10">
        <div className="container-page flex flex-col items-center gap-5 py-12 text-center">
          <h2 className="text-balance font-serif text-2xl font-bold text-white sm:text-3xl">
            Begin your journey with New Horizon
          </h2>
          <p className="max-w-xl text-pretty text-navy-100/80">
            Admissions are open for Grade XI — Science and Management. Visit the
            campus in Tansen or apply online today.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/admissions" className="btn btn-gold">
              Apply for Admission
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Contact the School
            </Link>
          </div>
        </div>
      </div>

      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo variant="light" />
          <p className="text-sm text-pretty text-navy-100/70">
            {school.tagline}. A trusted name in education in Tansen, Palpa since{" "}
            {school.establishedBS}.
          </p>
          {socials.length > 0 && (
            <div className="flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          )}
        </div>

        <nav aria-label="Footer" className="space-y-3">
          <h3 className="font-serif text-sm font-semibold tracking-wide text-white">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-navy-100/75 hover:text-gold-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <h3 className="font-serif text-sm font-semibold tracking-wide text-white">
            Admissions
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/admissions" className="text-navy-100/75 hover:text-gold-400">How to Apply</Link></li>
            <li><Link href="/academics" className="text-navy-100/75 hover:text-gold-400">Grade XI Streams</Link></li>
            <li><Link href="/notices" className="text-navy-100/75 hover:text-gold-400">Notices</Link></li>
            <li><Link href="/facilities" className="text-navy-100/75 hover:text-gold-400">Facilities</Link></li>
          </ul>
        </div>

        <address className="space-y-3 not-italic">
          <h3 className="font-serif text-sm font-semibold tracking-wide text-white">
            Contact
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2.5">
              <IconPin className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <span className="text-navy-100/80">
                {school.address.line}
                <br />
                {school.address.province}, {school.address.country}
              </span>
            </li>
            {school.phones.map((phone) => (
              <li key={phone} className="flex gap-2.5">
                <IconPhone className="mt-0.5 size-4 shrink-0 text-gold-400" />
                <a href={telHref(phone)} className="text-navy-100/80 hover:text-gold-400">
                  {phone}
                </a>
              </li>
            ))}
            <li className="flex gap-2.5">
              <IconMail className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <a href={`mailto:${school.email}`} className="text-navy-100/80 hover:text-gold-400">
                {school.email}
              </a>
            </li>
          </ul>
        </address>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-navy-100/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {school.name}. All rights reserved.
          </p>
          <p>{school.address.line} · {school.website}</p>
        </div>
      </div>
    </footer>
  );
}
