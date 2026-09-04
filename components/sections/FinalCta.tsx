"use client";

import { useRef, useState, type FormEvent, type MouseEvent, type ReactNode } from "react";
import { CallButton } from "@/components/ui/CallButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  CONTACT_LIMITS,
  UNKNOWN_SERVICE,
  contactWhatsAppMessage,
  parseContactPayload,
} from "@/lib/contact";
import { PRIMARY_SERVICE_SLUGS, getService } from "@/lib/services";
import { buildWhatsAppUrl, SITE, URGENT_WHATSAPP_MESSAGE } from "@/lib/site";

const OTHER_SERVICE = "Outro serviço";

const SERVICE_OPTIONS = [
  UNKNOWN_SERVICE,
  ...PRIMARY_SERVICE_SLUGS.map((slug) => getService(slug)?.title).filter(
    (title): title is string => Boolean(title),
  ),
  OTHER_SERVICE,
];

type FormStatus = "idle" | "loading" | "success" | "error";

export function FinalCta() {
  const formRef = useRef<HTMLFormElement>(null);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [servico, setServico] = useState(UNKNOWN_SERVICE);
  const [mensagem, setMensagem] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  const payload = {
    name: nome,
    phone: telefone,
    service: servico,
    message: mensagem,
    company,
  };

  const whatsappHref = buildWhatsAppUrl(contactWhatsAppMessage({
    name: nome || "—",
    phone: telefone || "—",
    service: servico,
    message: mensagem || "Preciso de assistência técnica urgente.",
  }));

  function guardWhatsApp(event: MouseEvent<HTMLAnchorElement>) {
    if (!formRef.current?.reportValidity()) {
      event.preventDefault();
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formRef.current?.reportValidity()) return;

    const parsed = parseContactPayload(payload);
    if (!parsed.ok) {
      setStatus("error");
      setFeedback(parsed.error);
      return;
    }

    setStatus("loading");
    setFeedback("A enviar o pedido…");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setFeedback(
          result.message ??
            "Não conseguimos enviar o pedido. Ligue ou use o WhatsApp.",
        );
        return;
      }

      setStatus("success");
      setFeedback(result.message ?? "Pedido recebido. Ligamos para o número que indicou.");
      setNome("");
      setTelefone("");
      setServico(UNKNOWN_SERVICE);
      setMensagem("");
    } catch {
      setStatus("error");
      setFeedback("A ligação falhou. Ligue ou use o WhatsApp para não perder o pedido.");
    }
  }

  return (
    <section
      id="contacto"
      className="scroll-mt-28 bg-cream px-6 py-[clamp(4.5rem,8vw,8.1rem)] sm:px-8"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-[clamp(2.1rem,5vw,4.4rem)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
        <div>
          <h2 className="max-w-[16ch] font-display text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-charcoal">
            Deixe o número. <span className="text-bronze">Ligamos nós.</span>
          </h2>
          <p className="mt-5 mb-8 max-w-[42ch] text-[16.5px] leading-relaxed text-muted">
            Ou fale já connosco. O WhatsApp leva a descrição que escrever ao lado.
          </p>
          <div className="flex max-w-[400px] flex-col gap-3">
            <CallButton className="justify-between px-7 py-5 text-[1.03rem]">
              {SITE.phoneDisplay}
            </CallButton>
            <WhatsAppButton
              message={URGENT_WHATSAPP_MESSAGE}
              className="justify-between px-7 py-5 text-[1.03rem]"
            >
              {SITE.whatsappDisplay}
            </WhatsAppButton>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="flex flex-col gap-4 rounded-2xl bg-sand p-[clamp(1.6rem,3.2vw,2.5rem)]"
        >
          <div className="sr-only" aria-hidden>
            <label htmlFor="company">Empresa</label>
            <input
              id="company"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
            />
          </div>

          <Field label="Nome" htmlFor="nome">
            <input
              id="nome"
              name="name"
              required
              minLength={2}
              maxLength={CONTACT_LIMITS.name}
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              placeholder="O seu nome"
              autoComplete="name"
              className={fieldClass}
            />
          </Field>
          <Field label="Telefone" htmlFor="telefone">
            <input
              id="telefone"
              name="phone"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
              minLength={9}
              maxLength={CONTACT_LIMITS.phone}
              value={telefone}
              onChange={(event) => setTelefone(event.target.value)}
              placeholder="+351 ___ ___ ___"
              className={fieldClass}
            />
          </Field>
          <Field label="Serviço" htmlFor="servico">
            <select
              id="servico"
              name="service"
              value={servico}
              onChange={(event) => setServico(event.target.value)}
              className={fieldClass}
            >
              {SERVICE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
          <Field label="O que precisa" htmlFor="mensagem">
            <textarea
              id="mensagem"
              name="message"
              required
              minLength={4}
              maxLength={CONTACT_LIMITS.message}
              rows={3}
              value={mensagem}
              onChange={(event) => setMensagem(event.target.value)}
              placeholder="Descreva a avaria e a localidade."
              className={`${fieldClass} resize-y leading-relaxed`}
            />
          </Field>

          <div className="mt-1.5 flex flex-wrap gap-2.5">
            <button
              type="submit"
              disabled={status === "loading"}
              className="cursor-pointer rounded-xl bg-charcoal px-7 py-4.5 font-sans text-[15px] text-cream transition-colors hover:bg-bronze disabled:cursor-wait disabled:opacity-70"
            >
              {status === "loading" ? "A enviar…" : "Pedir que liguem"}
            </button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={guardWhatsApp}
              className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border border-charcoal/35 px-6 py-4.5 font-sans text-[15px] text-charcoal transition-colors hover:border-bronze hover:text-bronze"
            >
              <WhatsAppIcon size={16} />
              Enviar por WhatsApp
            </a>
          </div>

          <p
            role="status"
            aria-live="polite"
            className={`min-h-5 text-sm leading-relaxed ${
              status === "error"
                ? "text-urgent"
                : status === "success"
                  ? "text-bronze"
                  : "text-muted"
            }`}
          >
            {feedback || "Para urgência, envie no WhatsApp. Pedir que liguem usa o número que indicar."}
          </p>
        </form>
      </div>
    </section>
  );
}

const fieldClass =
  "min-h-12 w-full rounded-xl border border-bronze/40 bg-cream px-3.5 py-3.5 text-base text-charcoal outline-none focus:border-bronze";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex flex-col gap-2 text-sm text-muted"
    >
      {label}
      {children}
    </label>
  );
}
