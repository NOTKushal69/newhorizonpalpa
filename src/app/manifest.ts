import type { MetadataRoute } from "next";

import { school } from "@/lib/school";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: school.name,
    short_name: school.shortName,
    description: `${school.tagline}. ${school.address.line}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b2b5c",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
