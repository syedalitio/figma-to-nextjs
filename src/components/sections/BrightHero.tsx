import Image from "next/image";

interface GoogleReviewProps {
  rating: string;
  reviewCount: string;
}

interface BrightHeroProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  heroImage: string;
  heroImageAlt: string;
  googleReview: GoogleReviewProps;
}

function GoogleReviewBadge({ rating, reviewCount }: GoogleReviewProps) {
  return (
    <div className="inline-flex items-center gap-4 rounded-full bg-white px-4 py-2 pr-8 shadow-[0_6px_6px_rgba(0,0,0,0.06)] border border-gray-100">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1.5">
          <Image
            src="/images/google-icon.svg"
            alt="Google"
            width={20}
            height={20}
          />
          <span className="text-xs font-medium tracking-[-0.02em] text-[#333]">
            Google Rating
          </span>
        </div>
      </div>
      <div className="flex flex-col items-start gap-0.5">
        <div className="flex items-center gap-1">
          <span className="text-base font-semibold text-[#333]">{rating}</span>
          <Image
            src="/images/stars-5.svg"
            alt="5 stars"
            width={91}
            height={14}
          />
        </div>
        <span className="text-[8px] font-medium leading-tight text-[#333]">
          {reviewCount} Google
          <br />
          Reviews
        </span>
      </div>
    </div>
  );
}

export function BrightHero({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  heroImage,
  heroImageAlt,
  googleReview,
}: BrightHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="relative mx-auto min-h-[600px] max-w-[1920px] sm:min-h-[700px] lg:min-h-[856px]">
        {/* ===== Decorative background blobs ===== */}

        {/* Yellow blob — right side */}
        <div className="pointer-events-none absolute right-0 top-[255px] hidden w-[514px] lg:block">
          <Image
            src="/images/blob-yellow.svg"
            alt=""
            width={514}
            height={452}
            aria-hidden="true"
          />
        </div>

        {/* Pink blurred blob — right side */}
        <div className="pointer-events-none absolute right-[100px] top-[162px] hidden w-[807px] lg:block">
          <Image
            src="/images/blob-pink-blur.svg"
            alt=""
            width={807}
            height={698}
            aria-hidden="true"
            className="opacity-100"
          />
        </div>

        {/* Pink gradient blob — right side */}
        <div className="pointer-events-none absolute right-[267px] top-[244px] hidden w-[697px] lg:block">
          <Image
            src="/images/blob-pink.svg"
            alt=""
            width={697}
            height={612}
            aria-hidden="true"
          />
        </div>

        {/* Yellow blob — left side (partially off-screen) */}
        <div className="pointer-events-none absolute -left-[162px] top-[225px] hidden w-[427px] lg:block">
          <Image
            src="/images/blob-yellow-left.svg"
            alt=""
            width={427}
            height={405}
            aria-hidden="true"
          />
        </div>

        {/* ===== Hero image (person) ===== */}
        <div className="relative mx-auto mb-8 mt-8 aspect-[704/832] w-[280px] sm:w-[340px] md:w-[400px] lg:absolute lg:right-[264px] lg:top-[24px] lg:mb-0 lg:mt-0 lg:w-[500px] xl:w-[560px]">
          <Image
            src={heroImage}
            alt={heroImageAlt}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 639px) 280px, (max-width: 767px) 340px, (max-width: 1023px) 400px, 560px"
          />
        </div>

        {/* ===== Text content ===== */}
        <div className="relative z-10 px-6 pb-12 sm:px-12 lg:px-0 lg:pb-0">
          <div className="mx-auto max-w-lg text-center lg:mx-0 lg:ml-[308px] lg:max-w-[528px] lg:pt-[369px] lg:text-left">
            <h1 className="text-3xl font-semibold leading-[1.2] tracking-[-0.03em] text-[#333] sm:text-4xl lg:text-[48px]">
              {title}
            </h1>

            <p className="mt-6 text-base font-medium leading-[1.4] tracking-[-0.03em] text-[#333] sm:text-lg lg:text-xl">
              {subtitle}
            </p>

            {/* CTA Button */}
            <a
              href={ctaHref}
              className="mt-8 inline-block rounded-full bg-gradient-to-b from-[#FAE72B] to-[#F9B91B] px-10 py-4 text-lg font-semibold tracking-[-0.02em] text-[#333] transition-shadow hover:shadow-lg active:scale-[0.98]"
            >
              {ctaLabel}
            </a>

            {/* Google Reviews */}
            <div className="mt-6">
              <GoogleReviewBadge {...googleReview} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
