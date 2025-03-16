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
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { NavLinks } from '@/utils/NavLinks';
import Link from 'next/link';



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
                    <nav className="w-full mt-8 flex flex-col gap-4 px-6">
                        {
                            NavLinks.map((link, index) => (
                                <div key={index} className="w-full">
                                    {link.subNav ? (
                                        // Use Accordion for items with sub-navigation.
                                        <Accordion type="single" collapsible className="w-full font-nunitoSans">
                                            <AccordionItem value={link.name}>
                                                <AccordionTrigger>{link.name}</AccordionTrigger>
                                                <AccordionContent>
                                                    <ul className="flex flex-col gap-3">
                                                        {link.subNav.map((subItem, subIndex) => (
                                                            <li key={subIndex}>
                                                                <SheetClose asChild>
                                                                    <Link href={subItem.href} className="block text-sm text-gray-600 hover:text-gray-800">
                                                                        <span className=" font-sora">{subItem.name}</span>
                                                                        <br />
                                                                        <span className="text-xs font-nunitoSans">{subItem.description}</span>
                                                                    </Link>
                                                                </SheetClose>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    ) : (
                                        <SheetClose asChild>
                                            <Link href={link.href} className="block font-medium text-gray-800  py-2 font-nunitoSans">
                                                {link.name}
                                            </Link>
                                        </SheetClose>
                                    )}
                                </div>
                            ))}
                    </nav>
                </main>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav