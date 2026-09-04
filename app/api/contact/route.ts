import { NextResponse } from "next/server";
import { parseContactPayload } from "@/lib/contact";
import { SITE } from "@/lib/site";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const attempts = new Map<string, number[]>();

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "local";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    attempts.set(key, recent);
    return true;
  }
  recent.push(now);
  attempts.set(key, recent);
  return false;
}

export async function POST(request: Request) {
  const key = clientKey(request);
  if (isRateLimited(key)) {
    return NextResponse.json(
      {
        ok: false,
        code: "rate_limited",
        message:
          "Já recebemos vários pedidos deste aparelho. Ligue ou use o WhatsApp para urgências.",
      },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "invalid",
        message: "O pedido chegou incompleto. Tente outra vez.",
      },
      { status: 400 },
    );
  }

  const parsed = parseContactPayload(body);
  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false, code: "invalid", message: parsed.error },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      {
        ok: false,
        code: "unconfigured",
        message:
          "Ainda não recebemos pedidos por aqui. Ligue ou envie a mesma informação pelo WhatsApp.",
      },
      { status: 503 },
    );
  }

  const { name, phone, message, service } = parsed.data;
  const text = [
    `Nome: ${name}`,
    `Telefone: ${phone}`,
    `Serviço: ${service}`,
    "",
    message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Pedido de assistência · ${service} · ${SITE.name}`,
        text,
      }),
    });

    if (!response.ok) {
      console.error("contact email failed", response.status);
      return NextResponse.json(
        {
          ok: false,
          code: "upstream",
          message:
            "Não conseguimos enviar o pedido agora. Ligue ou use o WhatsApp — a mensagem já está pronta.",
        },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("contact email error", error);
    return NextResponse.json(
      {
        ok: false,
        code: "network",
        message:
          "A ligação falhou. Ligue ou use o WhatsApp para não perder o pedido.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Pedido recebido. Ligamos para o número que indicou.",
  });
}
