"use client";

import React, { useState } from "react";
import Preloader from "@/components/shared/Preloader";


export default function PreloaderLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [loading, setLoading] = useState(true);

    return (
        <>
            <Preloader onLoadComplete={() => setLoading(false)} />
            <div
                className={`min-h-screen w-full transition-opacity bg-color1 duration-500 
                ${loading ? "opacity-0" : "opacity-100"} 
                `}
            >
                {children}
            </div>
        </>
    );
}