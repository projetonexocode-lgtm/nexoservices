"use client";

import { useId } from "react";

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

/** Text-based brand SVGs blur on iPhone Safari when used as <img> (no page fonts, 1× raster). */
function isBrandWordmarkSrc(src?: string): boolean {
  if (!src) return true;
  try {
    const path = src.startsWith("http") ? new URL(src).pathname : src;
    return /\/assets\/nexo-services(-fundo-claro)?\.svg$/i.test(path);
  } catch {
    return /nexo-services(-fundo-claro)?\.svg/i.test(src);
  }
}

function resolveTone(tone: "light" | "dark", src?: string): "light" | "dark" {
  if (!src) return tone;
  if (/fundo-claro\.svg/i.test(src)) return "light";
  if (/nexo-services\.svg/i.test(src) && !/fundo-claro/i.test(src)) return "dark";
  return tone;
}

export function Logo({ tone = "light", className = "", src }: LogoProps) {
  if (!isBrandWordmarkSrc(src)) {
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

  const palette = resolveTone(tone, src);
  const uid = useId().replace(/:/g, "");
  const gradId = `${uid}-nx`;
  const isDark = palette === "dark";

  return (
    <svg
      viewBox="160 340 680 400"
      role="img"
      aria-label="Nexo Services"
      width={220}
      height={88}
      className={`nx-logo h-10 w-auto sm:h-11 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          {isDark ? (
            <>
              <stop offset="0%" stopColor="#F2C166" />
              <stop offset="35%" stopColor="#F5A623" />
              <stop offset="70%" stopColor="#D9984A" />
              <stop offset="100%" stopColor="#E8931F" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#D9984A" />
              <stop offset="45%" stopColor="#B87118" />
              <stop offset="100%" stopColor="#734A26" />
            </>
          )}
        </linearGradient>
      </defs>
      <g
        textAnchor="middle"
        style={{
          fontFamily:
            "var(--font-montserrat), Montserrat, 'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        <text
          x="500"
          y="556"
          fontSize="224"
          fontWeight="600"
          letterSpacing="6"
          fill={isDark ? "#FFFFFF" : "#0B0B0D"}
        >
          NE
          <tspan fill={`url(#${gradId})`}>X</tspan>O
        </text>
        <text
          x="512"
          y="686"
          fontSize="76"
          fontWeight="400"
          letterSpacing="27"
          fill={isDark ? "#FFFFFF" : "#0B0B0D"}
        >
          SERVICES
        </text>
      </g>
    </svg>
  );
}
