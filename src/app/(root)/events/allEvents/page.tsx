import React from 'react'
import Search from '@/components/shared/Search'
import CategoryFilter from '@/components/shared/CategoryFilter'
import Collection from '@/components/shared/Collection'
import { SearchParamProps } from '@/types';
import { getAllEvents } from '@/lib/actions/event.action'

export default async function AllEvents({ searchParams }: SearchParamProps) {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
    const events = await getAllEvents({
        query: searchText,
        category: category,
        page,
        limit: 15
    })
    return (
        <section id="events" className="wrapper my-8 px-6 flex flex-col gap-8 md:gap-12">
            <h2 className="h2-bold">Trust by  Thousands of Events</h2>

            <div className="flex w-full flex-col gap-5 md:flex-row">
                <Search />
                <CategoryFilter />
            </div>

            <Collection
                data={events?.data}
                emptyTitle="No Events Found"
                emptyStateSubtext="Come back later"
                collectionType="All_Events"
                limit={9}
                page={page}
                totalPages={events?.totalPages}
            />
        </section>
    )
}

