"use client";

import { useRef, useState } from "react";

import { videos } from "@/lib/school";

/**
 * Campus video showcase. Videos are muted + playsInline and only load metadata
 * up front (`preload="metadata"`), so they don't hurt page load; the browser
 * fetches the full file when the visitor presses play.
 */
export function VideoShowcase() {
  const [active, setActive] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
      <div className="overflow-hidden rounded-3xl bg-navy-950 shadow-lift">
        <video
          ref={videoRef}
          key={videos[active].src}
          src={videos[active].src}
          poster="/photos/campus.jpg"
          controls
          muted
          playsInline
          preload="metadata"
          className="aspect-video w-full bg-navy-950 object-contain"
        >
          Your browser doesn&apos;t support embedded video.
        </video>
      </div>

      <div className="flex flex-col gap-3">
        {videos.map((v, i) => (
          <button
            key={v.src}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={`rounded-2xl border p-4 text-left transition ${
              i === active
                ? "border-navy-900 bg-navy-50"
                : "border-black/10 bg-white hover:border-navy-200"
            }`}
          >
            <span className="flex items-center gap-3">
              <span
                className={`grid size-10 shrink-0 place-items-center rounded-full ${
                  i === active ? "bg-navy-900 text-white" : "bg-navy-50 text-navy-700"
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span>
                <span className="block font-serif font-bold text-navy-900">{v.label}</span>
                <span className="block text-xs text-ink/55">Tap to play</span>
              </span>
            </span>
          </button>
        ))}
        <p className="mt-1 text-xs text-ink/50">
          Real footage from the New Horizon campus in Tansen.
        </p>
      </div>
    </div>
  );
}
