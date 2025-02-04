"use client";


import { Button } from "@/components/ui/button";
import Link from "next/link";
import Spline from '@splinetool/react-spline';

export default function Hero (){
  return (
    <>
      <section className="container mx-auto mt-28">
        <div className="mx-auto grid max-w-screen-3xl px-4 pt-32 lg:grid-cols-12 lg:gap-8">
          <div className="  lg:col-span-7">
            <h1 className="mb-4 max-w-3xl text-4xl font-extrabold leading-none tracking-tight lg:text-5xl xl:text-6xl">
              Mint Your Digital Masterpiece with Ease.
              <br />
            </h1>

            <p className="md:text-xllg:mb-8 mb-6 max-w-2xl font-mono font-light  lg:text-2xl">
              Step into the digital realm where ownership meets creativity. With
              our platform, you can bring your unique digital assets to life as
              NFTs (Non-Fungible Tokens) with just a single click.
            </p>

            <div className="mb-4 space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
              <Link href="/">
                <Button
                  variant={"default"}
                  // className="h-12 min-w-[4rem] gap-2 rounded-xl border border-white/10 bg-primary px-4 py-3 font-bold text-foreground lg:min-w-[8rem] lg:rounded-2xl"
                  className="h-12 min-w-[4rem] gap-2 rounded-xl border border-white/10  px-4 py-3 font-bold text-foreground lg:min-w-[8rem] lg:rounded-2xl"
                  translate="no"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
          {/* <div className=" lg:col-span-5"> */}
          <Spline className="h-full w-full lg:col-span-5" scene="https://prod.spline.design/Nw7qEXSPGkMODQVN/scene.splinecode" />
          {/* </div> */}
        </div>
      </section>
    </>
  );
};
