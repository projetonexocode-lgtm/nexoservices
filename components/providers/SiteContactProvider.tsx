"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { SITE, URGENT_WHATSAPP_MESSAGE } from "@/lib/site";

export type SiteContactValue = {
  name: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsappDisplay: string;
  whatsappE164: string;
  urgentWhatsappMessage: string;
  projetoNexoUrl: string;
  logoLightUrl: string;
  logoDarkUrl: string;
};

const defaults: SiteContactValue = {
  name: SITE.name,
  phoneDisplay: SITE.phoneDisplay,
  phoneTel: SITE.phoneTel,
  whatsappDisplay: SITE.whatsappDisplay,
  whatsappE164: SITE.whatsappE164,
  urgentWhatsappMessage: URGENT_WHATSAPP_MESSAGE,
  projetoNexoUrl: SITE.projetoNexoUrl,
  logoLightUrl: "/assets/nexo-services-fundo-claro.svg",
  logoDarkUrl: "/assets/nexo-services.svg",
};

const SiteContactContext = createContext<SiteContactValue>(defaults);

export function SiteContactProvider({
  value,
  children,
}: {
  value: Partial<SiteContactValue>;
  children: ReactNode;
}) {
  return (
    <SiteContactContext.Provider value={{ ...defaults, ...value }}>
      {children}
    </SiteContactContext.Provider>
  );
}

export function useSiteContact(): SiteContactValue {
  return useContext(SiteContactContext);
}

export function buildWhatsAppHref(
  message: string,
  e164: string = defaults.whatsappE164,
): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${e164}?text=${text}`;
}
