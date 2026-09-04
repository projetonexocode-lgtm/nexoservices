type LogoProps = {
  tone?: "light" | "dark";
  className?: string;
};

export function Logo({ tone = "light", className = "" }: LogoProps) {
  const nexoColor = tone === "dark" ? "text-cream" : "text-charcoal";
  const servicesColor = tone === "dark" ? "text-gold" : "text-bronze";

  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span
        className={`font-display text-[1.1rem] leading-none tracking-[0.04em] sm:text-[1.25rem] ${nexoColor}`}
      >
        Nexo
      </span>
      <span
        className={`font-display text-[0.8rem] leading-none tracking-[0.08em] sm:text-sm ${servicesColor}`}
      >
        Services
      </span>
    </span>
  );
}
