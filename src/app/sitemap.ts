import type { MetadataRoute } from "next";

import { SITE_URL, nav } from "@/lib/school";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return nav.map((item) => ({
    url: `${SITE_URL}${item.href === "/" ? "" : item.href}`,
    lastModified: now,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : item.href === "/admissions" ? 0.9 : 0.7,
  }));
}
