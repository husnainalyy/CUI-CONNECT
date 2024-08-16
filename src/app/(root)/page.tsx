import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getAllEvents } from '@/lib/actions/event.action'
import Image from 'next/image'
import React from 'react'
import { SearchParamProps } from '@/types';
import Link from 'next/link'
import CategoryFilter from '@/components/shared/CategoryFilter'
import Search from '@/components/shared/Search'

export default async function Home({ searchParams }: SearchParamProps) {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
    const events = await getAllEvents({
        query: '',
        category:'',
        page:1,
        limit: 6
    })
    return (
        <div className=''>
            <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10 px-4">
                <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
                    <div className="flex flex-col justify-center gap-8">
                        <h1 className="h1-bold"> Connect, Engage, Succeed  <br className=" lg:inline-block" /> Discover and Register for Campus Events</h1>
                        <p className="p-regular-20 md:p-regular-24">Find out whats happening around campus and sign up for events that interest you. Keep track of all your activities and stay engaged with university life.</p>
                        <Button size="lg" asChild className="button w-full sm:w-fit">
                            <Link href="#events">
                                Explore Now
                            </Link>
                        </Button>
                    </div>

                    <Image
                        src="/assets/hero.png"
                        alt="hero"
                        width={1000}
                        height={1000}
                        className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
                    />
                </div>
            </section> 
            <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12 border !px-4">
                <h2 className="h2-bold ">Trust by  Thousands of Events</h2>
                <div className="flex w-full flex-col gap-5 md:flex-row ">
                    <Search />
                    <CategoryFilter />
                </div>

                <Collection
                    data={events?.data}
                    emptyTitle="No Events Found"
                    emptyStateSubtext="Come back later"
                    collectionType="All_Events"
                    limit={6}
                    page={page}
                    totalPages={events?.totalPages}
                />
            </section>
        </div>
    )
}

