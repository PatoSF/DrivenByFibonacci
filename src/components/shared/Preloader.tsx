"use client";

import React, { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";

const Preloader = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [isLoading, setIsLoading] = useState(
    typeof window !== "undefined" && !localStorage.getItem("preloaderShown") // Check localStorage
  );

  useEffect(() => {
    if (!isLoading) {
      onLoadComplete();
      return;
    }

    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("preloaderShown", "true"); // Store flag
      onLoadComplete();
    }, 12000); // Keep your preloader duration

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [isLoading, onLoadComplete]);

  if (!isLoading) return null; // Don't render if preloader has already been shown

  return (
    <div
      className={`
        fixed inset-0 
        w-screen h-screen 
        z-[9999] 
        bg-transparent
        transition-opacity duration-500 
        flex items-center justify-center
        opacity-100
      `}
      style={{ minHeight: "100dvh", minWidth: "100dvw" }}
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



// "use client";

// import React, { useState, useEffect } from "react";
// import Spline from "@splinetool/react-spline";

// const Preloader = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [fadeOutStarted, setFadeOutStarted] = useState(false);

//   useEffect(() => {
//     if (isLoading) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }

//     const fadeOutTimer = setTimeout(() => {
//       setFadeOutStarted(true);
//     }, 8000);

//     const loadTimer = setTimeout(() => {
//       setIsLoading(false);
//       if (onLoadComplete) onLoadComplete();
//     }, 12000);

//     return () => {
//       clearTimeout(fadeOutTimer);
//       clearTimeout(loadTimer);
//       document.body.style.overflow = "unset";
//     };
//   }, [isLoading, onLoadComplete]);

//   return (
//     <div
//       className={`
//         fixed inset-0 
//         w-screen h-screen 
//         z-[9999] 
//         bg-transparent
//         transition-opacity duration-1000 
//         flex items-center justify-center
//         ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"}
//         ${fadeOutStarted ? "opacity-75" : "opacity-100"}
//       `}
//       style={{
//         minHeight: "100dvh",
//         minWidth: "100dvw",
//       }}
//     >
//       <div className="w-screen h-screen relative">
//         <Spline
//           scene="https://prod.spline.design/HKvI5U0gtirUreXl/scene.splinecode"
//           onLoad={() => console.log("Spline scene loaded")}
//           style={{
//             width: "100%",
//             height: "100%",
//             position: "absolute",
//             top: "0",
//             left: "0",
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Preloader;