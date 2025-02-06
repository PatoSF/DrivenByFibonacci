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
import { NavLinks } from "@/utils/NavLinks";
import MobileNav from "./MobileNav";

export default function Nav() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <header className="fixed top-0 inset-x-0 w-full z-50 bg-color1 bg-opacity-30 backdrop-blur-lg backdrop-filter">
      <motion.div
        className="fixed top-0 inset-x-0 bg-color5 origin-[0%] h-[6px] z-40"
        style={{ scaleX }}
      />
      <nav className="w-full flex items-center justify-between py-4 px-8">

        <Logo classname="w-[45px]" image="/fibo-logo.png" href="/" />

        {/* Navigation Links */}
        <main className="hidden lg:flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              {
                NavLinks.map((link, index) => (
                  <NavigationMenuItem key={index} className="font-nunitoSans bg-transparent">
                    { 
                      link.subNav ? (
                        <>
                          <NavigationMenuTrigger>{link.name}</NavigationMenuTrigger>
                          <NavigationMenuContent className="rounded-xl">
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                              {link.subNav.map((subnav, i) => (
                                <ListItem
                                  key={i}
                                  title={subnav.name}
                                  href={subnav.href}
                                >
                                  {subnav.description}
                                </ListItem>
                              ))}
                            </ul>
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
          <Button className="bg-color5 rounded-lg transition-all duration-200 hover:bg-color2 text-white">Launch App</Button>

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
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium font-inter leading-none">{title}</div>
          <p className="line-clamp-2 text-sm font-nunitoSans leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"