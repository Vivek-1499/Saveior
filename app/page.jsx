import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/hero";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { Button } from "@/components/ui/button";
import { howItWorksData, statsData } from "@/data/landing";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-40">
      <HeroSection />

      <section className="py-15 bg-blue-100 ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((statsData, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-indigo-900 mb-2">
                  {statsData.value}
                </div>
                <div className="text-gray-700">{statsData.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection />

      <section className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howItWorksData.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-20 h-20 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="font-bold text-xl mb-4">{step.title}</h3>
                <p className="text-sm text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialCarousel />

      <section className="py-10 bg-indigo-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-center mb-3">
            Let's get Started
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join and manage the Finance like never before
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-indigo-50 text-indigo-500 hover:bg-indigo-100 animate-bounce">
              Start Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
