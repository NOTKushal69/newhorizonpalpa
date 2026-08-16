import type { Metadata } from "next";
import { Merriweather, Mulish } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE_URL, school } from "@/lib/school";

import "./globals.css";

const heading = Merriweather({
  variable: "--font-heading",
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const body = Mulish({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${school.name} | Tansen, Palpa`,
    template: `%s | ${school.shortName}`,
  },
  description:
    "New Horizon Awasiya Secondary School in Tansen, Palpa — quality education from a trusted name since 2049 B.S. Grade XI admissions open in Science and Management.",
  keywords: [
    "New Horizon School",
    "school in Tansen",
    "school in Palpa",
    "Grade XI Tansen",
    "+2 college Palpa",
    "Science college Tansen",
    "Management college Palpa",
    "New Horizon admission",
  ],
  applicationName: school.name,
  authors: [{ name: school.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: school.name,
    title: `${school.name} | Tansen, Palpa`,
    description:
      "Quality education in Tansen, Palpa. Grade XI admissions open — Science and Management.",
    url: SITE_URL,
    locale: "en_NP",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: school.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${school.name} | Tansen, Palpa`,
    description:
      "Quality education in Tansen, Palpa. Grade XI admissions open — Science and Management.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
};

/** EducationalOrganization structured data — real NAP, no invented figures. */
function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: school.name,
    alternateName: school.crestName,
    url: SITE_URL,
    logo: `${SITE_URL}/crest.png`,
    image: `${SITE_URL}/og-image.png`,
    foundingDate: String(school.establishedAD),
    slogan: school.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: school.address.line,
      addressLocality: school.address.city,
      addressRegion: school.address.province,
      addressCountry: "NP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: school.address.geo.lat,
      longitude: school.address.geo.lng,
    },
    telephone: school.phones[0],
    email: school.email,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col bg-white">
        <OrganizationJsonLd />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
