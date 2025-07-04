"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useTextAnimation } from "../hook/useTextAnimation"; // import the hook
import { useRef } from "react";

const HeroSection = () => {
  const titleRef = useRef(null);

  useTextAnimation(".title-animation");

  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center overflow-y-hidden">
        <h1
          ref={titleRef}
          className="title-animation text-5xl md:text-8xl lg:text-[105px] pb-6"
        >
          Manage Your Finance <br />
          SMARTER
        </h1>

        <p>
          A finance application that track your expenses and analyzis to
          optimize your way of spending with clear insights.
        </p>

        <div>
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href="https://www.banklandmark.com/blog/using-ai-and-apps-for-personal-finance-automation/">
            <Button size="lg" variant="outline" className="px-8">
              Learn More
            </Button>
          </Link>
        </div>

        <div>
          <div>
            <Image
              src="/banner.png"
              width={1280}
              height={720}
              alt="banner"
              priority
              className="rounded-lg shadow-2xl border mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
