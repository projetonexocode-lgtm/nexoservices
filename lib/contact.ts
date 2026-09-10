import type { ContactErrorCode } from "@/lib/cms/uiCopy";
import { defaultUiCopy } from "@/lib/cms/uiCopy";

export const CONTACT_LIMITS = {
  name: 80,
  phone: 24,
  email: 120,
  message: 1000,
  service: 80,
} as const;

export type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  message: string;
  service: string;
};

export type ContactParseResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; code: ContactErrorCode };

function asTrimmedString(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseContactPayload(
  input: unknown,
  unknownService: string = defaultUiCopy.formUnknownService,
): ContactParseResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, code: "incomplete" };
  }

  const record = input as Record<string, unknown>;

  if (typeof record.company === "string" && record.company.trim() !== "") {
    return { ok: false, code: "honeypot" };
  }

  const name = asTrimmedString(record.name, CONTACT_LIMITS.name);
  const phone = asTrimmedString(record.phone, CONTACT_LIMITS.phone);
  const email = asTrimmedString(record.email, CONTACT_LIMITS.email).toLowerCase();
  const message = asTrimmedString(record.message, CONTACT_LIMITS.message);
  const service =
    asTrimmedString(record.service, CONTACT_LIMITS.service) || unknownService;

  if (name.length < 2) {
    return { ok: false, code: "name" };
  }

  const digits = phone.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 15) {
    return { ok: false, code: "phone" };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, code: "email" };
  }

  if (message.length < 4) {
    return { ok: false, code: "message" };
  }

  return { ok: true, data: { name, phone, email, message, service } };
}

export function contactWhatsAppMessage(
  payload: ContactPayload,
  intro: string = defaultUiCopy.formWhatsappIntro,
): string {
  return [
    intro,
    `Nome: ${payload.name}`,
    `Telefone: ${payload.phone}`,
    `E-mail: ${payload.email}`,
    `Serviço: ${payload.service}`,
    "",
    payload.message,
  ].join("\n");
}
