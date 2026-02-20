"use client";

import Image from "next/image";
import { useState } from "react";

interface Tab {
  id: string;
  label: string;
  image: string;
  imageAlt: string;
}

interface InvisalignSectionProps {
  tabs: Tab[];
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export function InvisalignSection({
  tabs,
  title,
  description,
  ctaLabel,
  ctaHref,
}: InvisalignSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const activeImage = tabs[activeTab];

  return (
    <section className="relative w-full">
      {/* Card container — overlaps hero by 238px */}
      <div className="relative z-20 mx-4 -mt-[120px] sm:mx-6 lg:mx-[126px] lg:-mt-[238px]">
        <div
          className="relative overflow-hidden rounded-t-lg"
          style={{
            background:
              "linear-gradient(180deg, rgba(46,178,164,0.85) 0%, rgba(46,178,164,1) 33%, rgba(46,178,164,1) 100%)",
            backdropFilter: "blur(28px)",
          }}
        >
          {/* Layout: stacked on mobile, side-by-side on desktop */}
          <div className="flex min-h-[400px] flex-col lg:min-h-[800px] lg:flex-row">
            {/* LEFT: Girl photo with her real background, fading into teal */}
            <div className="relative w-full lg:w-[48%]">
              {/* The masked image: girl at the door, gradient-fading to transparent on right */}
              {/* Teal card background shows through the transparent area */}
              <div className="relative h-[350px] sm:h-[450px] lg:absolute lg:inset-0 lg:h-auto">
                {tabs.map((tab, index) => (
                  <div
                    key={tab.id}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === activeTab
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                  >
                    <Image
                      src={tab.image}
                      alt={tab.imageAlt}
                      fill
                      className="object-cover object-left"
                      sizes="(max-width: 1023px) 100vw, 48vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Tabs + text + CTA on the teal background */}
            <div className="flex w-full flex-col justify-center px-6 py-10 sm:px-12 lg:w-[52%] lg:py-16 lg:pl-8 lg:pr-16">
              {/* Tabs row */}
              <div className="flex flex-wrap gap-3 lg:gap-6">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(index)}
                    className={`font-outfit text-xs font-medium uppercase leading-[1.5] text-white transition-opacity sm:text-sm lg:text-[14px] ${
                      index === activeTab
                        ? "opacity-100"
                        : "opacity-60 hover:opacity-80"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Title — "Clear, comfortable" bold, rest lighter */}
              <h2 className="mt-6 font-outfit text-2xl leading-[1] text-white sm:text-3xl lg:mt-10 lg:text-[48px]">
                {title.split("\n").map((line, i) => (
                  <span
                    key={i}
                    className={i === 0 ? "font-bold" : "font-medium"}
                  >
                    {line}
                    {i < title.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </h2>

              {/* Description */}
              <p className="mt-5 font-outfit text-sm font-normal leading-[1.5] text-white sm:text-base lg:mt-8 lg:max-w-[408px]">
                {description}
              </p>

              {/* CTA button — white bg, teal text */}
              <a
                href={ctaHref}
                className="mt-6 inline-block w-fit rounded-full bg-white px-10 py-3.5 font-outfit text-sm font-semibold uppercase tracking-[-0.02em] text-[#2EB2A4] transition-shadow hover:shadow-lg active:scale-[0.98] lg:mt-10 lg:px-12 lg:py-4 lg:text-base"
              >
                {ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
