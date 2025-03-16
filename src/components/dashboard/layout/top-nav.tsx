"use client";

import Link from "next/link";
import Image from "next/image";
import { CgArrowLongRight } from "react-icons/cg";
import React from "react";
import { cn } from "@/lib/utils";
import { NavLinks, NavlinksType, SubNavType } from "@/utils/NavLinks";
import MobileNav from "@/components/shared/MobileNav";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import ConnectButton from "@/components/shared/ConnectButton";

export default function TopNav() {

  return (
    <header className="w-full z-10 bg-color1 dark:bg-[#0F0F12] border-b border-gray-200 dark:border-[#1F1F23]">
      <nav className="w-full flex items-center justify-end lg:justify-between py-3 px-4 sm:px-8">
        <main className="hidden lg:flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              {NavLinks.map((link: NavlinksType, index) => (
                <NavigationMenuItem
                  key={index}
                  className="font-nunitoSans bg-transparent"
                >
                  {link.subNav ? (
                    <>
                      <NavigationMenuTrigger>{link.name}</NavigationMenuTrigger>

                      <NavigationMenuContent className="rounded-xl">
                        {link.subNav.length > 3 && (
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {link.subNav.map((subnav: SubNavType, i) => (
                              <ListItem
                                key={i}
                                title={subnav.name}
                                href={subnav.href}
                                icon={subnav.icon}
                              >
                                {subnav.description}
                              </ListItem>
                            ))}
                          </ul>
                        )}
                        {link.subNav.length <= 3 && (
                          <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            <ul className="grid gap-1.5">
                              {link.subNav.map((subnav: SubNavType, i) => (
                                <ListItem
                                  key={i}
                                  title={subnav.name}
                                  href={subnav.href}
                                  icon={subnav.icon}
                                >
                                  {subnav.description}
                                </ListItem>
                              ))}
                            </ul>
                            {index === 3 && (
                              <div className="w-full p-3 bg-[#E6D2C0]/50 rounded-md">
                                <div className="w-full flex flex-col bg-white rounded-md">
                                  <div className="w-full h-[105px]">
                                    <Image
                                      src="/buildingWithScroll.webp"
                                      className="w-full h-full object-cover overflow-hidden"
                                      width={600}
                                      height={425}
                                      alt="buildingWithScroll"
                                      quality={100}
                                      priority
                                    />
                                  </div>
                                  <Link
                                    href="https://scroll.io/"
                                    className="p-3 group flex flex-col"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                  >
                                    <span className="text-sm text-color2 font-inter font-medium">
                                      EulerFi on Scroll — Transforming the Open
                                      Economy
                                    </span>

                                    <span className="text-sm flex items-center gap-0.5 text-color2 group-hover:text-color5 font-nunitoSans mt-1">
                                      Learn more about Scroll{" "}
                                      <CgArrowLongRight className="text-xl" />
                                    </span>
                                  </Link>
                                </div>
                              </div>
                            )}
                            {index === 4 && (
                              <div className="w-full p-3 bg-[#375BD2]/50 rounded-md">
                                <div className="w-full flex flex-col bg-white rounded-md">
                                  <div className="w-full h-[120px]">
                                    <Image
                                      src="/buildingWithChainlink.png"
                                      className="w-full h-full object-cover overflow-hidden"
                                      width={1200}
                                      height={631}
                                      alt="buildingWithChainlink"
                                      quality={100}
                                      priority
                                    />
                                  </div>
                                  <Link
                                    href="https://chain.link/"
                                    className="p-3 group flex flex-col"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                  >
                                    <span className="text-sm text-color2 font-inter font-medium">
                                      EulerFi x Chainlink - Reliable & Secure
                                      Price Feeds
                                    </span>

                                    <span className="text-sm flex items-center gap-0.5 text-color2 group-hover:text-color5 font-nunitoSans mt-1">
                                      Explore Chainlink Data Streams{" "}
                                      <CgArrowLongRight className="text-xl" />
                                    </span>
                                  </Link>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {link.name}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </main>

        <div className="flex items-center justify-end gap-2 sm:gap-4">
          <ConnectButton />

          <div className="lg:hidden flex items-center">
            <MobileNav />
          </div>
        </div>
      </nav>
    </header>
  );
}

export const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  { title: string; icon: React.ReactNode } & React.ComponentPropsWithoutRef<"a">
>(({ className, title, icon, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex items-center gap-2 select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all hover:bg-gray-100 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group",
            className
          )}
          {...props}
        >
          <div className="text-color2">{icon}</div>
          <div className="flex flex-col gap-0.5">
            <div className="text-sm font-medium font-inter leading-none flex items-center gap-3">
              {title}
              <CgArrowLongRight className="text-color2 transition-opacity duration-300 text-xl opacity-0 group-hover:opacity-100" />
            </div>
            <p className="line-clamp-2 text-sm font-nunitoSans leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
