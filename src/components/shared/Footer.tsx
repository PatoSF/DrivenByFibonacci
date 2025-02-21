'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { NavLinks } from "@/utils/NavLinks";
import SubscribeForm from "./SubscribeForm";
import Image from "next/image";

export const Footer = () => {
    const [year, setYear] = useState("");

    useEffect(() => {
        const year = new Date().getFullYear()
        setYear(year.toString())
    }, [])

    return (
        <footer className="bg-color2 pt-20 pb-14">
            <div className="max-w-[1380px] mx-auto px-4 lg:px-10">
                {/* Navigation Grid */}
                <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {NavLinks.filter((link) => link.name !== "Transparency" && link.name !== "Platform").map((link) => (
                        <div key={link.name} className="flex flex-col space-y-4">
                            <h2 className="font-medium font-sora text-color1/90 text-base">{link.name}</h2>
                            <div className="flex flex-col space-y-2 text-sm text-gray-300 font-nunitoSans">
                                {link.subNav &&
                                    link.subNav.map((sub) => (
                                        <Link key={sub.name} href={sub.href}>
                                            <span className="hover:text-color5 transition-colors">
                                                {sub.name}
                                            </span>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Newsletter and Social Links */}
                <div className="mt-12 border-t border-color1/20 pt-8 flex flex-col md:flex-row justify-between items-center">
                    {/* Newsletter Form */}
                    <div className="w-full md:w-1/2 mb-4 md:mb-0">
                        <h2 className="font-bold mb-2 text-lg text-color5">Subscribe to our Newsletter</h2>
                        <SubscribeForm />
                    </div>
                    {/* Social Links */}
                    <div className="flex space-x-4">
                        <Link href="#">
                            <span className="text-gray-300 hover:text-color5 transition-colors">
                                <FaFacebook size={20} />
                            </span>
                        </Link>
                        <Link href="#">
                            <span className="text-gray-300 hover:text-color5 transition-colors">
                                <FaTwitter size={20} />
                            </span>
                        </Link>
                        <Link href="#">
                            <span className="text-gray-300 hover:text-color5 transition-colors">
                                <FaLinkedin size={20} />
                            </span>
                        </Link>
                        <Link href="#">
                            <span className="text-gray-300 hover:text-color5 transition-colors">
                                <FaInstagram size={20} />
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Brand Logo and Copyright */}
                <div className="mt-20 flex flex-col justify-center items-center text-center">
                    <Link href="/" className="lg:w-[100px] w-[50px]">
                        <Image src="/fibo-logo.png" alt="Logo" className="w-full" width={955} height={1060} priority quality={100} />
                    </Link>
                    <p className="mt-4 text-gray-300 font-marcellus font-bold text-base tracking-wider">EulerFi</p>
                    <p className="mt-2 text-gray-300 font-nunitoSans text-xs">
                        &copy; {year} EulerFi. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};
