"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const LottieLoader = ({ src, className }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load Lottie JSON:", err));
  }, [src]);

  if (!animationData) return <div className={className}></div>;

  return <Lottie animationData={animationData} loop className={className} />;
};

export default LottieLoader;
