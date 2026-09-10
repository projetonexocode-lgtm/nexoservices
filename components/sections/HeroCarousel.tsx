"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type HeroSlide = {
  src: string;
  alt: string;
};

type HeroCarouselProps = {
  slides: HeroSlide[];
  intervalMs?: number;
};

export function HeroCarousel({ slides, intervalMs = 5500 }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const safeSlides = slides.filter((slide) => slide.src);

  useEffect(() => {
    if (safeSlides.length < 2) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % safeSlides.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [safeSlides.length, intervalMs]);

  if (safeSlides.length === 0) return null;

  return (
    <>
      <div className="absolute inset-0" aria-hidden>
        {safeSlides.map((slide, slideIndex) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt=""
            fill
            priority={slideIndex === 0}
            sizes="100vw"
            className={`object-cover object-[center_30%] transition-opacity duration-[1200ms] ease-out ${
              slideIndex === index ? "opacity-70" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {safeSlides.length > 1 ? (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-8">
          {safeSlides.map((slide, slideIndex) => (
            <button
              key={`${slide.src}-dot`}
              type="button"
              aria-label={`Mostrar imagem ${slideIndex + 1} de ${safeSlides.length}`}
              aria-current={slideIndex === index}
              onClick={() => setIndex(slideIndex)}
              className={`h-1.5 rounded-full transition-all ${
                slideIndex === index
                  ? "w-6 bg-gold"
                  : "w-1.5 bg-cream/45 hover:bg-cream/70"
              }`}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
