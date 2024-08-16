"use client"
import { IEvent } from '@/lib/dataBase/event.model'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import Checkout from './Checkout';


const CheckoutButton = ({ event }: { event: IEvent }) => {
    const { isLoaded, isSignedIn, user } = useUser();
    const userId = isSignedIn && user ? (user.publicMetadata?.userId as string) : null;
    const hasEventFinished = new Date(event.endDateTime) < new Date();
    return (
        <div className='flex items-center gap-3'>
            {
                hasEventFinished ? (
                    <Button
                        className='rounded-full'
                        variant={'destructive'}
                        disabled
                    >
                        Event has ended
                    </Button>
                ) : (
                    <>
                            <SignedOut>
                                <Button asChild className="button rounded-full" size="lg">
                                    <Link href="/sign-in">
                                        Get Tickets
                                    </Link>
                                </Button>
                            </SignedOut>

                            <SignedIn>
                                <Checkout event={event} userId={userId as string} />
                            </SignedIn>
                    </>
                )
            }
        </div>
    )
}

export default CheckoutButton