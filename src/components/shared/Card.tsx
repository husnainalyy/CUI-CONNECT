import { IEvent } from '@/lib/dataBase/event.model'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'

type CardProps = {
    event: any,
    hasOrderLink?: boolean,
    hidePrice?: boolean
}

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    // Check if event is nested
    const isNested = event?.event;

    // Destructure event data based on structure
    const currentEvent = isNested ? event.event : event;
    const isEventCreator = currentEvent?.organizer && userId === currentEvent.organizer?._id?.toString();

    // Debugging
    // console.log("Event:", event);
    // console.log("Current Event Data:", currentEvent);

    // Extract paymentStatus
    const paymentStatus = isNested ? event?.paymentStatus : currentEvent?.paymentStatus;

    return (
        <div className="group relative flex min-h-[300px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl neuShad-light dark:neuShad transition-all hover:shadow-lg md:min-h-[438px]">
            <Link
                href={`/events/${currentEvent?._id}`}
                style={{ backgroundImage: `url(${currentEvent?.imageUrl})` }}
                className="min-h-48 flex-center flex-grow bg-gray-50 bg-cover bg-center bg-no-repeat "
            />
            {/* IS EVENT CREATOR ... */}
            {isEventCreator && !hidePrice && (
                <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
                    <Link href={`/events/${currentEvent?._id}/update`}>
                        <Image src="/assets/edit.svg" alt="edit" width={20} height={20} />
                    </Link>
                    <DeleteConfirmation eventId={currentEvent?._id} />
                </div>
            )}
            <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
                {!hidePrice && <div className="flex gap-2">
                    <span className="p-semibold-14 w- rounded-full bg-green-100 dark:bg-green-700 px-4 py-1 text-green-60">
                        {currentEvent?.isFree ? 'FREE' : `Rs ${currentEvent?.price}`}
                    </span>
                    <p className="p-semibold-14 min-w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 dark:text-gray-200 line-clamp-1">
                        {currentEvent?.category?.name}
                    </p>
                </div>}
                <p className="p-medium-16 p-medium-18 text-grey-500">
                    {formatDateTime(new Date(currentEvent?.startDateTime)).dateTime}
                </p>
                <Link href={`/events/${currentEvent?._id}`}>
                    <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black dark:text-white">{currentEvent?.title}</p>
                </Link>
                <div className="flex-between w-full">
                    <p className="p-medium-14 md:p-medium-16 text-grey-600">
                        {currentEvent?.organizer?.firstName} {currentEvent?.organizer?.lastName}
                    </p>
                    {paymentStatus && (
                        <p className={`text-sm mt-2 ${paymentStatus === 'approved' ? 'text-green-500' : paymentStatus === 'pending' ? 'text-yellow-500' : 'text-red-500'}`}>
                            Payment Status: {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
                        </p>
                    )}
                    {hasOrderLink && (
                        <Link href={`/orders?eventId=${currentEvent?._id}`} className="flex gap-2">
                            <p className="text-primary-500">Order Details</p>
                            <Image src="/assets/arrow.svg" alt="search" width={10} height={10} />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Card
