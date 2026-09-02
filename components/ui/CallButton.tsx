import { Phone } from "lucide-react";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";

type CallButtonProps = {
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
};

export function CallButton({
  children,
  className = "",
  showIcon = true,
}: CallButtonProps) {
  return (
    <a
      href={`tel:${SITE.phoneTel}`}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-none bg-gold px-5 font-display text-sm tracking-[0.14em] text-cream transition-colors hover:bg-gold/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${className}`}
    >
      {showIcon ? <Phone className="size-4 shrink-0" aria-hidden /> : null}
      <span>{children}</span>
    </a>
  );
}
