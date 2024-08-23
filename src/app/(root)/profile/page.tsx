import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByDate, getEventsByUser } from '@/lib/actions/event.action'
import { getOrdersByUser } from '@/lib/actions/order.action'
import { IOrder } from '@/lib/dataBase/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'
import { getUserRole } from '@/lib/actions/user.action'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const ordersPage = Number(searchParams?.ordersPage) || 1;
    const eventsPage = Number(searchParams?.eventsPage) || 1;

    const orders = await getOrdersByUser({ userId, page: ordersPage })
    
    const orderedEvents = orders?.data.map((order: IOrder) => ({
        event: order.event,
        isPaid: order.isPaid,
        paymentStatus: order.paymentStatus,
        price: order.price,  
        orderId: order._id, })) || [];

    const organizedEvents = await getEventsByUser({ userId, page: eventsPage }) 

    
    const userRole = await getUserRole(userId); 
    const page = Number(searchParams?.page) || 1;
    const events = await getEventsByDate();
    return ( 
        
        <>
            {/* My Tickets */}
            <section className=" bg-cover bg-center py-5 px-4 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between">
                    <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
                    <Button asChild size="lg" className="button hidden sm:flex">
                        <Link href="/events/allEvents">
                            Explore More Events
                        </Link>
                    </Button>
                </div>
            </section>

            <section className="wrapper my-8">
                <Collection
                    data={orderedEvents}
                    emptyTitle="No event tickets purchased yet"
                    emptyStateSubtext="No worries - plenty of exciting events to explore!"
                    collectionType="My_Tickets"
                    limit={3}
                    page={ordersPage}
                    urlParamName="ordersPage"
                    totalPages={orders?.totalPages}
                />
            </section>

            {/* Events Organized */}
            {userRole === 'user' && (
                <>
                    <section className="wrapper my-8 px-4">
                        <h3 className='h3-bold text-center my-4 sm:text-left ml-4'>Up Coming Events</h3>
                        <Collection
                            data={events?.data}
                            emptyTitle="No Events Found"
                            emptyStateSubtext="Come back later"
                            collectionType="All_Events"
                            limit={3}
                            page={page}
                            totalPages={3}
                        />
                    </section>
                </>
            )}
            
            {userRole === 'admin' && (
                <>
                    <section className=" bg-cover bg-center py-5 px-4 md:py-10">
                        <div className="wrapper flex items-center justify-center sm:justify-between">

                            <>
                                <h3 className='h3-bold text-center sm:text-left '>Events Organized</h3>
                                <Button asChild size="lg" className="button  sm:flex">
                                    <Link href="/events/create">
                                        Create New Event
                                    </Link>
                                </Button>
                            </>

                        </div>
                    </section>
                    <section className="wrapper my- px-4">
                        <h3 className='h3-bold text-center m-4 sm:text-left'>Your Organized Events</h3>
                        <Collection
                            data={organizedEvents?.data}
                            emptyTitle="No events have been created yet"
                            emptyStateSubtext="Go create some now"
                            collectionType="Events_Organized"
                            limit={3}
                            page={eventsPage}
                            urlParamName="eventsPage"
                            totalPages={organizedEvents?.totalPages}
                        />
                    </section>
                </>
            )}
        </>
    )
}

export default ProfilePage