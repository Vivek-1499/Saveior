"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useTextAnimation } from "../hook/useTextAnimation";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const titleRef = useRef(null);

  useTextAnimation(".title-animation");

  const imgRef = useRef()
  useEffect(()=>{
    const imageElement = imgRef.current;
    const handleScroll=()=>{
      const scrollPosition = window.scrollY;
      const scrollThreshold =250;

      if(scrollPosition>scrollThreshold){
        imageElement.classList.add("scrolled")
      }else{
        imageElement.classList.remove("scrolled")
      }
    }
    window.addEventListener("scroll", handleScroll)

    return ()=>window.removeEventListener("scroll", handleScroll)
  },[])
  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center overflow-y-hidden">
        <h1
          ref={titleRef}
          className="title-animation text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
          Manage Your Finance <br />
          SMARTER
        </h1>   

        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          A finance application that track your expenses and analyzis to
          optimize your way of spending with clear insights.
        </p>

        <div className="flex justify-center space-x-4">
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

        <div className="hero-image-wrapper">
          <div ref={imgRef} className="hero-image">
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
