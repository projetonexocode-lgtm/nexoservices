import { Coverage } from "@/components/sections/Coverage";
import { Differentials } from "@/components/sections/Differentials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { TrustBar } from "@/components/sections/TrustBar";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <Differentials />
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <Reviews />
      <SectionDivider />
      <Coverage />
      <SectionDivider />
      <Faq />
      <SectionDivider />
      <FinalCta />
    </>
  );
}
