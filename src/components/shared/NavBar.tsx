'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useScroll, motion, useSpring } from 'framer-motion';
import Logo from "./Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React from "react";
import { cn } from "@/lib/utils";
import { NavLinks, NavlinksType, SubNavType } from "@/utils/NavLinks";
import MobileNav from "./MobileNav";
import { CgArrowLongRight } from "react-icons/cg";
import Image from "next/image";


export default function Nav() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <header className="fixed top-0 inset-x-0 w-full z-50 bg-color1 bg-opacity-80 backdrop-blur-lg backdrop-filter">
      <motion.div
        className="fixed top-0 inset-x-0 bg-color5 origin-[0%] h-[6px] z-40"
        style={{ scaleX }}
      />
      <nav className="w-full flex items-center justify-between py-3 px-8">

        <Logo classname="w-[45px] lg:w-[60px]" image="/fibo-logo.png" href="/" />

        {/* Navigation Links */}
        <main className="hidden lg:flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              {
                NavLinks.map((link: NavlinksType, index) => (
                  <NavigationMenuItem key={index} className="font-nunitoSans bg-transparent">
                    {
                      link.subNav ? (
                        <>
                          <NavigationMenuTrigger>{link.name}</NavigationMenuTrigger>

                          <NavigationMenuContent className="rounded-xl">
                            {
                              link.subNav.length > 3 && (
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
                              )
                            }
                            {
                              link.subNav.length <= 3 && (
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
                                  {index === 3 && <div className="w-full p-3 bg-[#E6D2C0]/50 rounded-md">
                                    <div className="w-full flex flex-col bg-white rounded-md">
                                      <div className="w-full h-[105px]">
                                        <Image src="/buildingWithScroll.webp" className="w-full h-full object-cover overflow-hidden" width={600} height={425} alt="buildingWithScroll" quality={100} priority />
                                      </div>
                                      <Link href="https://scroll.io/" className="p-3 group flex flex-col" rel="noopener noreferrer" target="_blank">
                                        <span className="text-sm text-color2 font-inter font-medium">EulerFi on Scroll — Transforming the Open Economy</span>

                                        <span className="text-sm flex items-center gap-0.5 text-color2 group-hover:text-color5 font-nunitoSans mt-1">Learn more about Scroll <CgArrowLongRight className="text-xl" /></span>
                                      </Link>
                                    </div>
                                  </div>}
                                  {index === 4 && <div className="w-full p-3 bg-[#375BD2]/50 rounded-md">
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
                                          EulerFi x Chainlink - Reliable & Secure Price Feeds
                                        </span>

                                        <span className="text-sm flex items-center gap-0.5 text-color2 group-hover:text-color5 font-nunitoSans mt-1">
                                          Explore Chainlink Data Streams <CgArrowLongRight className="text-xl" />
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  }
                                </div>

                              )
                            }

                          </NavigationMenuContent>
                        </>
                      )
                        : (
                          <Link href={link.href} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                              {link.name}
                            </NavigationMenuLink>
                          </Link>
                        )
                    }
                  </NavigationMenuItem>
                ))
              }
            </NavigationMenuList>
          </NavigationMenu>
        </main>


        <div className='flex items-center gap-[24px]'>
          <Button className="bg-color5 rounded-lg transition-all font-medium font-inter duration-200 hover:bg-color2 text-white">Launch App</Button>

          <div className="lg:hidden flex items-center">
            <MobileNav />
          </div>
        </div>
      </nav>
    </header>
  )
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
          <div className="text-color2">
            {icon}
          </div>
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
  )
})
ListItem.displayName = "ListItem"