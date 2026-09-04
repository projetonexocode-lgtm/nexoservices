export const CONTACT_LIMITS = {
  name: 80,
  phone: 24,
  message: 1000,
  service: 80,
} as const;

export const UNKNOWN_SERVICE = "Não sei / é urgente";

export type ContactPayload = {
  name: string;
  phone: string;
  message: string;
  service: string;
};

export type ContactParseResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string };

function asTrimmedString(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);
}

export function parseContactPayload(input: unknown): ContactParseResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "O pedido chegou incompleto. Tente outra vez." };
  }

  const record = input as Record<string, unknown>;

  if (typeof record.company === "string" && record.company.trim() !== "") {
    return { ok: false, error: "O pedido não pôde ser enviado." };
  }

  const name = asTrimmedString(record.name, CONTACT_LIMITS.name);
  const phone = asTrimmedString(record.phone, CONTACT_LIMITS.phone);
  const message = asTrimmedString(record.message, CONTACT_LIMITS.message);
  const service =
    asTrimmedString(record.service, CONTACT_LIMITS.service) || UNKNOWN_SERVICE;

  if (name.length < 2) {
    return { ok: false, error: "Indique o seu nome para sabermos a quem ligar." };
  }

  const digits = phone.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 15) {
    return {
      ok: false,
      error: "Indique um telefone válido, com o indicativo se estiver fora de Portugal.",
    };
  }

  if (message.length < 4) {
    return {
      ok: false,
      error: "Descreva a avaria e a localidade, mesmo que seja em duas frases.",
    };
  }

  return { ok: true, data: { name, phone, message, service } };
}

export function contactWhatsAppMessage(payload: ContactPayload): string {
  return [
    "Olá! Preciso de assistência técnica.",
    `Nome: ${payload.name}`,
    `Telefone: ${payload.phone}`,
    `Serviço: ${payload.service}`,
    "",
    payload.message,
  ].join("\n");
}
