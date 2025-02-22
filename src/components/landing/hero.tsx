"use client";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import Spline from "@splinetool/react-spline";

export default function Hero() {
  return (
    <section className="w-full md:h-[1000px] h-[650px] bg-color1 flex flex-col items-center justify-center">
      <div className="relative  w-full h-full text-center overflow-hidden bg-transparent px-4  py-12 ">
        <div className="lg:w-[60%] md:w-[70%] w-full mx-auto flex flex-col bg-transparent gap-1.5 justify-center items-center  px-4 md:px-0">
          <h1 className="font-inter md:text-balance leading-none pointer-events-none pt-10 lg:text-6xl md:text-4xl text-[30px] font-bold text-color2 text-center ">
            <LineShadowText className="md:whitespace-nowrap tracking-wide line-shadow-text" shadowColor={"black"}>
              Discover a New Dimension of Stability
            </LineShadowText>
          </h1>
          <p className="font-nunitoSans text-lg text-center pointer-events-none text-color2/80">
            EulerFi turns data into steady returns, charts a path to financial resilience and unlock new growth opportunities.
          </p>
        </div>

        <div className="w-full ">
          <Spline
            scene="https://prod.spline.design/o5E6X6Nm3OZxO-YT/scene.splinecode"
            onLoad={() => console.log("Spline scene loaded")}
            className="mt-2 mx-auto w-full left-0 right-0 relative pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
};