/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  SidebarIcon,
  ArrowRightLeft,
  ShoppingBag,
  ScanBarcode,
  ListStart,
  ScaleIcon
} from "lucide-react";

import { Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/shared/Logo";
import { RiCloseFill } from "react-icons/ri";
import {
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleNavigation() {
    setIsMobileMenuOpen(false);
  }

  function NavItem({
    href,
    icon: Icon,
    children,
  }: {
    href: string;
    icon: any;
    children: React.ReactNode;
  }) {
    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 hover:text-white hover:bg-color5"
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        {children}
      </Link>
    );
  }

  return (
    <>
      <div className="lg:hidden flex fixed  left-4 z-[70]">
        <button
          type="button"
          className=" p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <SidebarIcon className="w-6 h-6 text-gray-600" />
        </button>
        <Logo classname="w-[45px] p-1 m-2" image="/fibo-logo.png" href="/" />
      </div>
      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-color1  transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r border-gray-300
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="h-full flex flex-col">
          <div className="flex">
            <button
              type="button"
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <RiCloseFill className="w-6 h-6 text-gray-600" />
            </button>
            <Logo
              classname="w-[45px] p-1 m-2"
              image="/fibo-logo.png"
              href="/"
            />
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 ">
                  Overview
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard" icon={Home}>
                    Dashboard
                  </NavItem>
                  <NavItem href="/dashboard/listing" icon={ListStart}>
                    Add/Remove Listings
                  </NavItem>
                  <NavItem href="/dashboard/swap" icon={ArrowRightLeft}>
                    Swap
                  </NavItem>
                  <NavItem href="/dashboard/buy" icon={ShoppingBag}>
                    Buy FIBO
                  </NavItem>
                  <NavItem href="/dashboard/mint" icon={ScanBarcode}>
                    Mint FIBO
                  </NavItem>
                  <NavItem href="/dashboard/minteqbl" icon={ScaleIcon}>
                    Mint EQBL
                  </NavItem>
                  <NavItem href="/dashboard/eqblinfo" icon={ScaleIcon}>
                    EQBL Info
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex justify-center space-x-4">
              <Link href="#">
                <span className="text-gray-600 hover:text-color5 transition-colors">
                  <FaTwitter size={20} />
                </span>
              </Link>
              <Link href="#">
                <span className="text-gray-600 hover:text-color5 transition-colors">
                  <FaLinkedin size={20} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
