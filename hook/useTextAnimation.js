"use client";

import { useEffect } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export const useTextAnimation = (selector) => {
  useEffect(() => {
    const split = new SplitType(selector, { types: "chars" });

    split.chars.forEach((char) => {
      char.classList.add("gradient-title");
    });

    gsap.fromTo(
      split.chars,
      {
        y: (i) => (i % 2 === 0 ? 30 : -30),
        opacity: 0,
        filter: "blur(3px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.04,
      }
    );

    return () => {
      split.revert();
    };
  }, [selector]);
};
