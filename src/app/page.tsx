import { Hero } from "@/components/sections/Hero";
import { BrightHero } from "@/components/sections/BrightHero";
import { heroData, brightHeroData } from "@/data/home";

export default function Home() {
  return (
    <main>
      <BrightHero {...brightHeroData} />
      <Hero {...heroData} />
    </main>
  );
}
