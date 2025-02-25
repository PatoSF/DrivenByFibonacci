"use client";
import Link from "next/link";
import { TbError404 } from "react-icons/tb";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-color1 p-4 relative">
            {/* 404 Icon */}
            <TbError404 className="md:w-[300px] md:h-[300px] w-[200px] h-[200px] text-color2/80" />

            {/* Heading */}
            <h1 className="text-center text-color2/90 font-sora font-bold lg:text-[52px] lg:leading-[52px] text-[36px] leading-[36px] tracking-tight lg:-mt-6 mb-4">
                Lost in the Algorithm? 🔄
            </h1>

            {/* Subtext */}
            <p className="text-lg text-color2/70 font-normal font-nunitoSans mb-6 text-center max-w-[500px]">
                This page seems to have de-pegged from our ecosystem. Let&apos;s rebalance and get you back on track!
            </p>

            {/* Action Buttons */}
            <div className="w-full flex justify-center items-center gap-4 md:gap-8">
                <Link
                    href="/"
                    className="w-[150px] h-[45px] flex justify-center items-center rounded-lg bg-color5 text-white font-nunitoSans font-medium shadow-lg text-sm hover:bg-color2 transition"
                >
                    Return Home
                </Link>

                <button
                    type="button"
                    onClick={() => router.back()}
                    className="w-[150px] h-[45px] flex justify-center items-center bg-color1 rounded-lg border border-color2 shadow-sm cursor-pointer text-sm font-medium font-nunitoSans text-color2 hover:bg-color5 hover:border-color5 hover:text-white transition"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}
