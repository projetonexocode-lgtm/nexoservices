import { HomeSections } from "@/components/sections/HomeSections";
import { getHomepage, getSiteSettings } from "@/lib/cms";
import { SITE, URGENT_WHATSAPP_MESSAGE } from "@/lib/site";

export default async function HomePage() {
  const [homepage, settings] = await Promise.all([
    getHomepage(),
    getSiteSettings(),
  ]);

  return (
    <HomeSections
      sections={(homepage.sections || []) as Array<Record<string, unknown>>}
      site={{
        phoneDisplay: settings.phoneDisplay || SITE.phoneDisplay,
        phoneTel: settings.phoneTel || SITE.phoneTel,
        whatsappDisplay: settings.whatsappDisplay || SITE.whatsappDisplay,
        whatsappE164: settings.whatsappE164 || SITE.whatsappE164,
        urgentWhatsappMessage:
          settings.urgentWhatsappMessage || URGENT_WHATSAPP_MESSAGE,
      }}
    />
  );
}
