"use client";
import React, { useState, useEffect } from 'react';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Link from 'next/link';
import NavItems from './NavItems';
import { MenuIcon } from 'lucide-react';
import { Separator } from '../ui/separator';
import { useTheme } from 'next-themes'; // Assuming you use next-themes or similar for theme management
import { ModeToggle } from './theme-toggler'; // Import ModeToggle component

const Header = () => {
    const { theme } = useTheme(); // Get the current theme from context
    const [logoSrc, setLogoSrc] = useState('/assets/images/logoLight.png'); // Default logo source

    useEffect(() => {
        // Determine logo source based on theme
        const getLogoSrc = () => {
            if (theme === 'system' || !theme) {
                // Detect system theme if theme is 'system' or not set
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                return prefersDark ? '/assets/images/logoDark.png' : '/assets/images/logoLight.png';
            }
            return theme === 'dark' ? '/assets/images/logoDark.png' : '/assets/images/logoLight.png';
        };

        setLogoSrc(getLogoSrc());
    }, [theme]); // Re-run the effect when the theme changes

    return (
        <header className='h-12 px-4 py-4 flex flex-row justify-between items-center dark:text-white'>
            <Link href='/'>
                <Image
                    src={logoSrc}
                    alt='logo img'
                    height={100}
                    width={150}
                />
            </Link>
            <div className='gap-20 dark:text-white hidden md:flex flex-row font-semi-bold'>
                <NavItems />
            </div>

            <div className='flex items-center gap-2 '>
                <ModeToggle /> {/* Use ModeToggle component */}
                <SignedOut>
                    <Button variant="outline" className='rounded-full min-w-20 border-[1px] border-black'>
                        <SignInButton />
                    </Button>
                </SignedOut>
                <div className='md:hidden'>
                    <Sheet >
                        <SheetTrigger className=''>
                            <Button className='rounded-full cursor-pointer' asChild variant="outline">
                                <MenuIcon size={80} className='' />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className='bg-white dark:bg-[#171717]'>
                            <SheetHeader>
                                <SheetTitle>
                                    <Image
                                        src={logoSrc}
                                        alt='logo img'
                                        height={38}
                                        width={128}
                                    />
                                </SheetTitle>
                                <Separator />
                                <SheetDescription>
                                    <NavItems />
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </header>
    );
};

export default Header;