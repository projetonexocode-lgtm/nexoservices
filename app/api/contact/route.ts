import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/cms";
import { contactErrorMessage, defaultUiCopy } from "@/lib/cms/uiCopy";
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
  const settings = await getSiteSettings();
  const copy =
    "uiCopy" in settings && settings.uiCopy
      ? settings.uiCopy
      : defaultUiCopy;

  const key = clientKey(request);
  if (isRateLimited(key)) {
    return NextResponse.json(
      {
        ok: false,
        code: "rate_limited",
        message: copy.errorRateLimited,
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
        message: copy.errorIncomplete,
      },
      { status: 400 },
    );
  }

  const parsed = parseContactPayload(body, copy.formUnknownService);
  if (!parsed.ok) {
    return NextResponse.json(
      {
        ok: false,
        code: "invalid",
        message: contactErrorMessage(parsed.code, copy),
      },
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
        message: copy.errorUnconfigured,
      },
      { status: 503 },
    );
  }

  const { name, phone, email, message, service } = parsed.data;
  const text = [
    `Nome: ${name}`,
    `Telefone: ${phone}`,
    `E-mail: ${email}`,
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
        reply_to: email,
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
          message: copy.errorUpstream,
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
        message: copy.errorNetwork,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: copy.successReceived,
  });
}
