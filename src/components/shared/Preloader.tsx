"use client";

import React, { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";

const Preloader = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fadeOutStarted, setFadeOutStarted] = useState(false);

  useEffect(() => {
    const hasPreloaderShown = sessionStorage.getItem("hasPreloaderShown");

    if (!hasPreloaderShown) {
      setIsLoading(true);

      document.body.style.overflow = isLoading ? "hidden" : "unset";

      const fadeOutTimer = setTimeout(() => {
        setFadeOutStarted(true);
      }, 8000);

      const loadTimer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("hasPreloaderShown", "true");
        onLoadComplete();
      }, 8000);

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(loadTimer);
        document.body.style.overflow = "unset";
      };
    } else {
      onLoadComplete();
      document.body.style.overflow = "unset";
    }
  }, [onLoadComplete, isLoading]);

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={`
        fixed inset-0 
        w-screen h-screen 
        z-[9999]
        bg-transparent
        transition-opacity duration-1000 
        flex items-center justify-center
        ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"}
        ${fadeOutStarted ? "opacity-75" : "opacity-100"}
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
            top: 0,
            left: 0,
          }}
        />
      </div>
    </div>
  );
};

export default Preloader;