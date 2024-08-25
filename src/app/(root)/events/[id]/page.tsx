import CheckoutButton from '@/components/shared/CheckoutButton';
import Collection from '@/components/shared/Collection';
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.action'
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types'
import Image from 'next/image';
import { useState } from 'react';

const EventDetails = async ({ params: { id },searchParams }: SearchParamProps) => {
    const event = await getEventById(id);
    const relatedEvents = await getRelatedEventsByCategory({
        categoryId: event.category._id,
        eventId: event._id,
        page: searchParams.page as string,
    });
     const [copyButtonText, setCopyButtonText] = useState('Copy URL');

    // Function to handle URL copying
    const handleCopyUrl = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                setCopyButtonText('Copied!');
                setTimeout(() => setCopyButtonText('Copy URL'), 2000); // Reset text after 2 seconds
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };
    
    return (
        <>
            <section className="flex justify-center bg-primary-50 dark:bg-zinc-900 bg-dotted-pattern bg-contain ">
                <div className="flex flex-col  md:flex-row lg:flex-row xl:flex-row 2xl:max-w-7xl">
                    <div className='w-full md:w-2/5 '>
                        <Image
                            src={event.imageUrl}
                            alt="hero image"
                            width={1000}
                            height={1000}
                            className="h-full min-h-[300px] object-fit object-center"
                        />
                    </div>
                    <div className='flex w-full md:w-3/5 flex-col gap-8 py-10 px-4 dark:bg-zinc-900'>
                        <div className='flex flex-col gap-6 '>
                            <h2 className='h2-bold '>{event.title}</h2>
                            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                                <div className='flex gap-3'>
                                    <p className='p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700'>
                                    {event.isFree?'Free':`Rs ${event.price}`}
                                    </p>
                                    <p className='p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500'>
                                        {event.category.name}
                                    </p>
                                </div>
                                 <div className='flex items-center'>
                                    <p className='p-medium-18 ml-2 mt-2 sm:mt-0'>
                                        By{' '}
                                        <span>{event.organizer.firstName} {event.organizer.lastName}</span>
                                    </p>
                                    <button 
                                        onClick={handleCopyUrl} 
                                        className="ml-4 text-sm text-primary-500 underline"
                                        title="Copy event URL to clipboard"
                                    >
                                        {copyButtonText}
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <CheckoutButton event={event} />
                        
                        <div className='flex flex-col gap-5 '>
                            <div className='flex gap-2 md:gap-3'>
                                <Image src="/assets/calendar.svg" alt='calendar' width={32} height={32} />
                                <div className='p-medium-16 lg:p-regular-20 flex flex-col items-center'>
                                    <p >
                                        {formatDateTime(event.startDateTime).dateOnly} - {' '}
                                        {formatDateTime(event.startDateTime).timeOnly}
                                    </p>
                                    <p className='ml-1'>
                                        {formatDateTime(event.endDateTime).dateOnly} - {' '}
                                        {formatDateTime(event.endDateTime).timeOnly}
                                    </p>
                                </div>
                            </div>
                            <div className='p-regular-20 flex items-center gap-3'>
                                <Image src="/assets/location.svg" alt='location' width={32} height={32} />
                                <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <p className='p-bold-20 text-grey-600 dark:text-grey-50'>What you get:</p>
                            <p className='p-medium-16 lg:p-regular-18'>{event.description}</p>
                            <p className='p-medium-10 lg:p-regular-18 truncate text-primary-500'>{event.url}</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* EVENTS with the same category */}
            <section className='wrapper my-8 flex flex-col gap-8 md:gap-12 '>
                <h2 className='h2-bold pl-4'>More Events Like This</h2>
                <Collection
                    data={relatedEvents?.data}
                    emptyTitle="No Events Found"
                    emptyStateSubtext="Come back later"
                    collectionType="All_Events"
                    limit={3}
                    page={searchParams.page as string}
                    totalPages={relatedEvents?.totalPages}
                />
            </section>
                
        </>
    )
}

export default EventDetails
