type CoverageMapProps = {
  className?: string;
};

/** OpenStreetMap embed centred on Grande Lisboa + Margem Sul. */
export function CoverageMap({ className = "" }: CoverageMapProps) {
  // Approx. AML: Cascais–Setúbal
  const bbox = "-9.48%2C38.52%2C-8.88%2C38.95";
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`;

  return (
    <figure
      className={`relative overflow-hidden border border-bronze/40 bg-sand ${className}`}
    >
      <div className="relative aspect-[5/4] w-full sm:aspect-[4/3]">
        <iframe
          title="Mapa da Área Metropolitana de Lisboa e Margem Sul"
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />

        {/* Zona de atendimento — círculo semi-transparente */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <div
            className="aspect-square w-[68%] max-w-[22rem] rounded-full border-2 border-[#E8C84A]/70"
            style={{
              background:
                "radial-gradient(circle, rgba(245, 215, 110, 0.38) 0%, rgba(245, 215, 110, 0.22) 55%, rgba(245, 215, 110, 0.08) 100%)",
              boxShadow: "inset 0 0 0 1px rgba(232, 200, 74, 0.35)",
            }}
          />
        </div>
      </div>
      <figcaption className="flex items-center justify-between gap-3 border-t border-bronze/30 bg-cream px-3 py-2.5 sm:px-4">
        <span className="font-display text-[11px] uppercase tracking-[0.08em] text-charcoal">
          Zona de atendimento · Grande Lisboa e Margem Sul
        </span>
        <a
          href="https://www.openstreetmap.org/#map=11/38.707/-9.136"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-bronze transition-colors hover:text-charcoal"
        >
          Abrir mapa
        </a>
      </figcaption>
    </figure>
  );
}
