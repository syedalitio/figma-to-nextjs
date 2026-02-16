import { Hero } from "@/components/sections/Hero";
import { heroData } from "@/data/home";

export default function Home() {
  return (
    <main>
      <Hero {...heroData} />
    </main>
  );
}
