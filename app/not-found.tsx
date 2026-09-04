import Link from "next/link";
import { CallButton } from "@/components/ui/CallButton";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-8">
      <h1 className="mt-3 font-display text-4xl text-charcoal">
        Página não encontrada
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        Volte ao início ou ligue de imediato se precisar de um técnico.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <CallButton className="px-5 py-3">Ligar agora</CallButton>
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center border border-bronze px-5 text-sm text-charcoal hover:bg-sand"
        >
          Ir para o início
        </Link>
      </div>
    </div>
  );
}
