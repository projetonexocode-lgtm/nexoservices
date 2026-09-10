type SectionHeadingProps = {
  title: string;
  highlight?: string;
  tone?: "light" | "dark" | "accent";
  className?: string;
};

export function SectionHeading({
  title,
  highlight,
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const parts = highlight ? title.split(highlight) : [title];
  const titleColor =
    tone === "dark"
      ? "text-cream"
      : tone === "accent"
        ? "text-bronze"
        : "text-charcoal";
  const markColor = tone === "dark" ? "text-gold" : "text-bronze";

  return (
    <h2
      className={`font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.1] tracking-[-0.02em] uppercase ${titleColor} ${className}`}
    >
      {highlight && parts.length === 2 ? (
        <>
          {parts[0]}
          <span className={markColor}>{highlight}</span>
          {parts[1]}
        </>
      ) : (
        title
      )}
    </h2>
  );
}
