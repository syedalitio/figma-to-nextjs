import Image from "next/image";

interface AberdeenHeroProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  bgImage: string;
}

export function AberdeenHero({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  bgImage,
}: AberdeenHeroProps) {
  return (
    <section className="relative h-[500px] w-full sm:h-[600px] lg:h-[1032px]">
      {/* Background image */}
      <Image
        src={bgImage}
        alt="Aberdeen Orthodontics practice"
        fill
        className="object-cover"
        priority
      />

      {/* Dark overlay — #131E39 at 34% */}
      <div className="absolute inset-0 bg-[#131E39]/[0.34]" />

      {/* Top gradient — heavy dark at top, fading down */}
      <div
        className="absolute inset-x-0 top-0 h-[60%]"
        style={{
          background:
            "linear-gradient(180deg, #131E39 0%, transparent 100%)",
        }}
      />

      {/* Text content — positioned at ~30% from top, 16% from left */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-12 lg:px-0">
        <div className="lg:ml-[308px] lg:max-w-[525px]">
          <h1 className="whitespace-pre-line font-outfit text-3xl font-medium leading-[1] text-white sm:text-5xl lg:text-[72px]">
            {title}
          </h1>

          <p className="mt-4 font-outfit text-base font-medium leading-[1.1] text-white sm:text-xl lg:mt-6 lg:text-[28px]">
            {subtitle}
          </p>

          <a
            href={ctaHref}
            className="mt-6 inline-block rounded-full bg-gradient-to-b from-[#FD9340] to-[#FC7003] px-8 py-3.5 font-outfit text-sm font-semibold uppercase tracking-[-0.02em] text-white transition-shadow hover:shadow-lg active:scale-[0.98] sm:px-10 sm:py-4 sm:text-base lg:mt-10 lg:text-[20px]"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
