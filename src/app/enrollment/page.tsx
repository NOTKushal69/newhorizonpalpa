import type { Metadata } from "next";

import { EnrollmentManager } from "@/components/enrollment/enrollment-manager";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Enrollment Records",
  description:
    "Internal enrollment management for New Horizon — record student enquiries, track status, and export to Excel.",
  alternates: { canonical: "/enrollment" },
  robots: { index: false, follow: false }, // internal admin page — keep out of search
};

export default function EnrollmentPage() {
  return (
    <>
      <PageHero
        crumb="Enrollment"
        title="Enrollment Records"
        intro="Record and manage student enrollments — add, edit, delete, and export the list to Excel. Entries are saved on this device."
      />
      <section className="container-page py-12 lg:py-16">
        <EnrollmentManager />
      </section>
    </>
  );
}
