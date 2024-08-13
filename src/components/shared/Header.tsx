"use client";
import React, { useState } from 'react';
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Link from 'next/link';
import NavItems from './NavItems';
import { MenuIcon, SeparatorVertical } from 'lucide-react';
import { Separator } from '../ui/separator';
import { headerLinks } from '@/constants';
import { usePathname } from 'next/navigation';

const Header = () => {
    return (
        <header className='h-12 px-4 flex flex-row justify-between items-center'>
            <Link href='/'>
                <Image src='/assets/logo.png' alt='log img' height={100} width={150} />
            </Link>
            <div className='gap-20  hidden md:flex flex-row font-semi-bold'>
                <NavItems />
            </div>

            <div className='flex items-center gap-2'>
                <SignedOut>
                    <Button variant="secondary" className='rounded-full min-w-20 bg-white border-[1px] border-black'>
                        <SignInButton />
                    </Button>
                </SignedOut>
                <div className='md:hidden'>
                    <Sheet>
                        <SheetTrigger>
                            <Button className='rounded-full cursor-pointer' asChild variant="secondary">
                                <MenuIcon size={80} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>
                                    <Image src='/assets/logo.svg' alt='log img' height={38} width={128} />
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