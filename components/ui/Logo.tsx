type LogoProps = {
  /** `light` = logo for cream/light backgrounds; `dark` = logo for charcoal/dark backgrounds */
  tone?: "light" | "dark";
  className?: string;
  src?: string;
};

const FALLBACK_SRC = {
  light: "/assets/nexo-services-fundo-claro.svg",
  dark: "/assets/nexo-services.svg",
} as const;

export function Logo({ tone = "light", className = "", src }: LogoProps) {
  return (
    <img
      src={src || FALLBACK_SRC[tone]}
      alt="Nexo Services"
      width={220}
      height={88}
      className={`h-10 w-auto sm:h-11 ${className}`}
      decoding="async"
    />
  );
}
