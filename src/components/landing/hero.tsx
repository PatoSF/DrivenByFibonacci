"use client";
import { Globe } from "@/components/ui/globe";
import { LineShadowText } from "@/components/ui/line-shadow-text";

export default function Hero() {
  return (
    <section className="w-full md:h-[1000px] h-[650px] flex items-center justify-center">
      <div className="relative flex w-full h-full items-start justify-center overflow-hidden bg-color1 px-4  py-12 ">
        <div className="lg:w-[60%] md:w-[70%] w-full flex flex-col gap-1.5 justify-center items-center lg:mt-10 mt-16">
          <h1 className="font-inter text-balance leading-none pointer-events-none lg:text-6xl md:text-4xl text-[30px] font-bold text-color2 text-center ">
            <LineShadowText className="" shadowColor={"black"}>
              Discover a New Dimension of
              Stability
            </LineShadowText>
          </h1>
          <p className="font-nunitoSans text-lg text-center pointer-events-none text-color2/80">EulerFi turns data into steady returns, charts a path to financial resilience and unlock new growth opportunities.</p>
        </div>
        <Globe className="lg:top-[210px] md:top-[250px] top-[280px]" />
      </div>
    </section>
  );
};
