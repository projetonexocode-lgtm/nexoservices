import { MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { buildWhatsAppUrl } from "@/lib/site";

type WhatsAppButtonProps = {
  message: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "card";
  className?: string;
  showIcon?: boolean;
};

const VARIANTS: Record<NonNullable<WhatsAppButtonProps["variant"]>, string> = {
  primary: "bg-gold text-cream hover:bg-gold/90",
  secondary:
    "border border-gold bg-transparent text-charcoal hover:bg-sand",
  card: "border border-gold/50 bg-cream text-charcoal hover:border-gold hover:bg-sand",
};

export function WhatsAppButton({
  message,
  children,
  variant = "secondary",
  className = "",
  showIcon = true,
}: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-none px-5 font-display text-sm tracking-[0.14em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${VARIANTS[variant]} ${className}`}
    >
      {showIcon ? <MessageCircle className="size-4 shrink-0" aria-hidden /> : null}
      <span>{children}</span>
    </a>
  );
}
