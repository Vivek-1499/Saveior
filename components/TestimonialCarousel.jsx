"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { testimonialsData } from "@/data/landing";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function TestimonialCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timer = useRef(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      perView: 3,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 12 },
      },
    },
    slideChanged(slider) {
      const slideCount = slider.track.details.slides.length;
      const centerIndex = Math.floor(slider.options.slides.perView / 2);
      const newIndex = (slider.track.details.rel + centerIndex) % slideCount;
      setCurrentSlide(newIndex);
    },
    renderMode: "performance",
    drag: true,
  });

  useEffect(() => {
    const slider = instanceRef.current;
    if (!slider) return;

    timer.current = setInterval(() => {
      slider.next();
    }, 3500);

    return () => clearInterval(timer.current);
  }, [instanceRef]);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-12">
          What Our Users Say
        </h2>

        <div
          ref={sliderRef}
          className="keen-slider relative transition-all duration-700 ease-in-out"
        >
          {testimonialsData.map((testimonial, idx) => {
            const isCenter = idx === currentSlide;

            return (
              <div
                key={idx}
                className={`keen-slider__slide px-4 transform transition-all duration-700 ease-in-out ${
  isCenter ? "scale-105 opacity-100 z-10" : "scale-90 opacity-40"
}`}
              >
                <div className="bg-indigo-50 p-6 rounded-xl shadow-md text-center h-full flex flex-col items-center justify-center space-y-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-indigo-200 shadow-md"
                  />
                  <h3 className="text-lg font-semibold text-indigo-700">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500 italic">
                    {testimonial.role}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed max-w-sm">
                    “{testimonial.quote}”
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}