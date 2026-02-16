import Image from "next/image";

interface HeroProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export function Hero({ title, description, imageSrc, imageAlt }: HeroProps) {
  return (
    <section className="relative w-full bg-navy">
      {/* Mobile/Tablet: stacked | Desktop: side-by-side */}
      <div className="flex flex-col lg:flex-row lg:min-h-[729px]">
        {/* Text content */}
        <div className="flex flex-1 items-center px-6 py-16 sm:px-12 md:py-20 lg:py-0 lg:px-0">
          <div className="mx-auto w-full max-w-md lg:mx-0 lg:ml-[308px] lg:max-w-[408px]">
            <h1
              className="font-heading text-gray-heading text-4xl leading-[1.2] tracking-tight sm:text-5xl lg:text-[64px] lg:tracking-[-0.02em]"
              style={{ fontWeight: 250 }}
            >
              {title}
            </h1>
            <p className="mt-5 text-white font-light text-base leading-[1.5] tracking-normal">
              {description}
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="relative aspect-[940/729] w-full lg:aspect-auto lg:w-[49%] lg:min-h-[729px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1023px) 100vw, 49vw"
          />
        </div>
      </div>
    </section>
  );
}
