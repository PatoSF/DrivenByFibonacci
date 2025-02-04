'use client'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetClose,
    SheetTrigger,
} from "@/components/ui/sheet";
import { AiOutlineMenu } from 'react-icons/ai';
import Logo from './Logo';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { NavLinks } from '@/utils/NavLinks';
import Link from 'next/link';
import { ListItem } from './NavBar';

const MobileNav = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="text-color2">
                    <AiOutlineMenu className='w-6 h-6' />
                </button>
            </SheetTrigger>
            <SheetContent className='w-full bg-[#F9FAFB] border-none outline-none'>
                <main className="w-full flex flex-col ">
                    <div className="w-full py-4 px-6 flex justify-between items-center">
                        {/* logo */}
                        <Logo classname="w-[45px]" image="/fibo-logo.png" href="/" />
                    </div>
                    <div className="w-full mt-16 flex flex-col justify-center gap-3 items-center">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {
                                    NavLinks.map((link, index) => (
                                        <NavigationMenuItem key={index} className="font-nunitoSans">
                                            {
                                                link.subNav ? (
                                                    <>
                                                        <NavigationMenuTrigger>{link.name}</NavigationMenuTrigger>
                                                        <NavigationMenuContent>
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
                        <SheetClose asChild>


                        </SheetClose>
                    </div>
                </main>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav