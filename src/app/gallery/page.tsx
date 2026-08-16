import type { Metadata } from "next";

import { GalleryGrid } from "@/components/gallery-grid";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photo gallery of New Horizon Awasiya Secondary School, Tansen — campus, classrooms, laboratories, sports and school life.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        crumb="Gallery"
        title="School Gallery"
        intro="A look around our campus and school life in Tansen. Tap any photo to view it larger."
      />
      <section className="container-page py-16 lg:py-20">
        <GalleryGrid />
      </section>
    </>
  );
}
