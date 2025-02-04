"use client";

import React, { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";

const Preloader = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onLoadComplete) onLoadComplete();
    }, 9000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [isLoading, onLoadComplete]);

  return (
    <div
      className={`
        fixed inset-0 
        w-screen h-screen 
        z-[9999] 
        bg-black
        transition-opacity duration-500 
        flex items-center justify-center
        ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      style={{
        minHeight: "100dvh",
        minWidth: "100dvw",
      }}
    >
      <div className="w-screen h-screen relative">
        <Spline
          scene="https://prod.spline.design/HKvI5U0gtirUreXl/scene.splinecode"
          onLoad={() => console.log("Spline scene loaded")}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0",
            left: "0",
          }}
        />
      </div>
    </div>
  );
};

export default Preloader;
