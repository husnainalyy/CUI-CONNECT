"use client";
import Link from 'next/link'
import React from 'react'
import { headerLinks } from '@/constants'
import { usePathname } from 'next/navigation';
const NavItems = () => {
    const pathname = usePathname();

    return (
        <div className='flex  md:flex-row  flex-col  justify-start items-start    text-xl md:gap-12 gap-2 '>
            {
                headerLinks.map((link, index) => {
                    const isActive = pathname === link.route;
                    return (
                        <p
                            key={link.route}
                            className={`${ isActive && 'text-blue-500 text-xl '}`}>
                            <Link href={link.route} key={index}>
                                {link.label}
                            </Link>
                        </p>
                    );
                })
            }
        </div>
    )
}

export default NavItems