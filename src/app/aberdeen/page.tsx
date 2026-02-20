import { AberdeenHero } from "@/components/sections/AberdeenHero";
import { InvisalignSection } from "@/components/sections/InvisalignSection";
import { heroData, invisalignTabs, invisalignData } from "@/data/aberdeen";

export default function AberdeenPage() {
  return (
    <main className="bg-white">
      <AberdeenHero {...heroData} />
      <InvisalignSection
        tabs={invisalignTabs}
        title={invisalignData.title}
        description={invisalignData.description}
        ctaLabel={invisalignData.ctaLabel}
        ctaHref={invisalignData.ctaHref}
      />
    </main>
  );
}
