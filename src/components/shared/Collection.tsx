import { IEvent } from '@/lib/dataBase/event.model'
import React from 'react'
import Pagination from './Pagination'
import Card from './Card'

type CollectionProps = {
    data: IEvent[],
    emptyTitle: string,
    emptyStateSubtext: string,
    limit: number,
    page: number | string,
    totalPages?: number,
    urlParamName?: string,
    collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Events'
}

const Collection = ({
    data,
    emptyTitle,
    emptyStateSubtext,
    page,
    totalPages = 0,
    collectionType,
    urlParamName,
}: CollectionProps) => {
    return (  
        <>
            {data.length > 0 ? (
                <div className="flex flex-col items-center gap-10 px-4">
                    <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                        {data.map((event:any) => {
                            const hasOrderLink = collectionType === 'Events_Organized';
                            const hidePrice = collectionType === 'My_Tickets';
                            
                            // Debuging lines
                            // console.log("hasorderlink jnds:", hasOrderLink)
                            // console.log("event in collection:",event)  
                            // console.log("hideprice:",hidePrice)

                            return (
                                <li key={event._id} className="flex justify-center">
                                    <Card event={event} hasOrderLink={hasOrderLink} hidePrice={hidePrice} />
                                </li>
                            )  
                        })}
                    </ul>
                    {totalPages > 1 && (
                        <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
                    )}
                </div>
            ) : (
                    <div className='flex wrapper min-h-[200px] w-full flex-col justify-center items-center  rounded-[14px] bg-grey-50 dark:bg-zinc-900  py-28 text-center'>
                    <h3 className='p-bold-20 md:h5-bold '>{emptyTitle}</h3>
                        <p className='p-regular-14 '>{emptyStateSubtext}</p>
                </div>
            )}
        </>
    )
}

export default Collection