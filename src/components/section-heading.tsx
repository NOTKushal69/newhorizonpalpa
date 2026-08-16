import { Reveal } from "@/components/reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
}) {
  const titleColor = tone === "light" ? "text-white" : "text-navy-900";
  const introColor = tone === "light" ? "text-navy-100/80" : "text-ink/70";

  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className={`mt-3 text-3xl font-bold text-balance sm:text-4xl ${titleColor}`}>
        {title}
      </h2>
      {intro ? (
        <p className={`mt-4 text-lg text-pretty ${introColor}`}>{intro}</p>
      ) : null}
    </Reveal>
  );
}
