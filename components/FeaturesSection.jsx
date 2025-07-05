"use client";

import LottieLoader from "./LottieLoader";
import { featuresData } from "@/data/landing";

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-blue-50">
      <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {featuresData.map((feature, idx) => (
          <div
            key={idx}
            className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition"
          >
            <LottieLoader
              src={`/animations/${feature.key}.json`}
              className="h-20 w-20 mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
