import { NextResponse } from "next/server";
import { buildWhatsAppUrl, SITE } from "@/lib/site";

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  need?: unknown;
  website?: unknown;
};

function asNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Pedido inválido." },
      { status: 400 },
    );
  }

  if (asNonEmptyString(payload.website)) {
    return NextResponse.json({ ok: true, channel: "email" });
  }

  const name = asNonEmptyString(payload.name);
  const phone = asNonEmptyString(payload.phone);
  const need = asNonEmptyString(payload.need);

  if (!name || !phone || !need) {
    return NextResponse.json(
      { ok: false, error: "Preencha nome, telefone e o que precisa." },
      { status: 400 },
    );
  }

  const text = [
    `${name} pediu assistência através do site.`,
    `Telefone: ${phone}`,
    "",
    need,
  ].join("\n");

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;

  if (resendKey && toEmail) {
    try {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:
            process.env.CONTACT_FROM_EMAIL ||
            "Nexo Services <noreply@nexoservices.pt>",
          to: [toEmail],
          subject: `Pedido urgente — ${SITE.name}`,
          text: `Nome: ${name}\nTelefone: ${phone}\n\n${need}`,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error(`Resend status ${emailResponse.status}`);
      }

      return NextResponse.json({ ok: true, channel: "email" });
    } catch (error) {
      console.error("Email delivery failed", error);
      return NextResponse.json({
        ok: true,
        channel: "whatsapp",
        url: buildWhatsAppUrl(
          `Olá! Preciso de assistência técnica urgente.\n\n${text}`,
        ),
      });
    }
  }

  return NextResponse.json({
    ok: true,
    channel: "whatsapp",
    url: buildWhatsAppUrl(
      `Olá! Preciso de assistência técnica urgente.\n\nNome: ${name}\nTelefone: ${phone}\nPedido: ${need}`,
    ),
  });
}
