import { Coverage } from "@/components/sections/Coverage";
import { Differentials } from "@/components/sections/Differentials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Differentials />
      <HowItWorks />
      <Coverage />
      <Faq />
      <FinalCta />
    </>
  );
}
