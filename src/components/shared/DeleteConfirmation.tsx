'use client'

import { useTransition } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { deleteEvent } from '@/lib/actions/event.action'

export const DeleteConfirmation = ({ eventId }: { eventId: string }) => {
    const pathname = usePathname()
    let [isPending, startTransition] = useTransition()

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Image src="/assets/delete.svg" alt="edit" width={20} height={20} />
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-white dark:bg-black">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
                    <AlertDialogDescription className="p-regular-16 text-grey-600 dark:text-grey-50">
                        This will permanently delete this event
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className='text-black dark:text-white'>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction
                        onClick={() =>
                            startTransition(async () => {
                                await deleteEvent({ eventId, path: pathname })
                            })
                        }>
                        {isPending ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}