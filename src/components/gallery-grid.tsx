"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { IconArrow, IconClose } from "@/components/icons";
import { gallery } from "@/lib/school";

/**
 * Responsive gallery with an accessible lightbox: open on click/Enter, close on
 * Escape or backdrop, and step through with the arrow keys. Images lazy-load.
 */
export function GalleryGrid() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: number) =>
      setIndex((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  return (
    <>
      <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
        {gallery.map((g, i) => (
          <button
            key={g.src}
            type="button"
            onClick={() => setIndex(i)}
            className="group block w-full overflow-hidden rounded-xl"
            aria-label={`Open image: ${g.alt}`}
          >
            <Image
              src={g.src}
              alt={g.alt}
              width={500}
              height={500}
              loading="lazy"
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/90 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <IconClose className="size-6" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous image"
            className="absolute left-3 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
          >
            <IconArrow className="size-6 rotate-180" />
          </button>

          <figure onClick={(e) => e.stopPropagation()} className="max-h-[85vh] max-w-4xl">
            <Image
              src={gallery[index!].src}
              alt={gallery[index!].alt}
              width={1200}
              height={900}
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-navy-100">
              {gallery[index!].alt} · {index! + 1}/{gallery.length}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Next image"
            className="absolute right-3 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
          >
            <IconArrow className="size-6" />
          </button>
        </div>
      )}
    </>
  );
}
