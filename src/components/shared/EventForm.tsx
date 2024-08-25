"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validators"
import * as z from 'zod'
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUploader"
import { useState } from "react"
import Image from "next/image"
import DatePicker from "react-datepicker";
import { useUploadThing } from '@/lib/uploadthing'
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox"
import { useRouter } from "next/navigation"
import { IEvent } from "@/lib/dataBase/event.model"
import { createEvent, updateEvent } from "@/lib/actions/event.action"

type EventFormProps = {
    userId: string
    type: "Create" | "Update"
    event?: IEvent,
    eventId?: string
}

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
    const [isFree, setIsFree] = useState(false)
    const [price, setPrice] = useState<string>("0")

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;

        // Remove all non-numeric characters (except for decimal point)
        value = value.replace(/[^0-9.]/g, '');

        // Remove leading zeros
        if (value.startsWith('0') && value.length > 1 && !value.includes('.')) {
            value = value.replace(/^0+/, '');
        }

        // Set value or default to "0"
        setPrice(value || '0');
    }



    const [files, setFiles] = useState<File[]>([])
    const initialValues = event && type === 'Update'
        ? {
            ...event,
            startDateTime: new Date(event.startDateTime),
            endDateTime: new Date(event.endDateTime),
            price: event.price.toString() // Ensure price is a string
        }
        : {
            ...eventDefaultValues,
            price: "0" // Default to "0" for new events
        };
    
    const router = useRouter();

    const { startUpload } = useUploadThing('imageUploader')

    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues
    })

    async function onSubmit(values: z.infer<typeof eventFormSchema>) {
        let uploadedImageUrl = values.imageUrl;

        if (files.length > 0) {
            const uploadedImages = await startUpload(files)

            if (!uploadedImages) {
                return
            }

            uploadedImageUrl = uploadedImages[0].url
        }

        
        
        if (type === 'Create') {
           
            try {
                const newEvent = await createEvent({
                    event: { ...values, imageUrl: uploadedImageUrl },
                    userId,
                    path: '/profile'
                })

                
                if (newEvent) {
                    form.reset();
                    router.push(`/events/${newEvent._id}`)
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (type === 'Update') {
            if (!eventId) {
                router.back()
                return;
            }

            try {
                const updatedEvent = await updateEvent({
                    userId,
                    event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
                    path: `/events/${eventId}`
                })

                if (updatedEvent) {
                    form.reset();
                    router.push(`/events/${updatedEvent._id}`)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 px-4">
                <div className="flex flex-col gap-5 md:flex-row ">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Event title" {...field} className="input-field " />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="w-full ">
                                <FormControl>
                                    <Dropdown onChangeHandler={field.onChange} value={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col justify-center items-center gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full  ">
                                <FormControl className="h-72 ">
                                    <Textarea placeholder="Description" {...field} className="textarea rounded-2xl bg-grey-50 dark:bg-zinc-800 " />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem className="w-full rounded-2xl bg-grey-50 dark:bg-zinc-800">
                                <FormControl className="h-72 rounded-2xl bg-grey-50  dark:bg-zinc-800">
                                    <FileUploader
                                        onFieldChange={field.onChange}
                                        imageUrl={field.value}
                                        setFiles={setFiles}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 dark:bg-zinc-800 px-4 py-2">
                                        <Image
                                            src="/assets/location-grey.svg"
                                            alt="calendar"
                                            width={24}
                                            height={24}
                                        />
                                        <Input placeholder="Event location or Online" {...field} className="input-field" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="startDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 dark:bg-zinc-800 px-4 py-2">
                                        <Image
                                            src="/assets/calendar.svg"
                                            alt="calendar"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <p className="ml-3 whitespace-nowrap text-gray-400 ">Start Date:</p>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date: Date | null) => field.onChange(date)}
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            wrapperClassName="datePicker"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 dark:bg-zinc-800 px-4 py-2">
                                        <Image
                                            src="/assets/calendar.svg"
                                            alt="calendar"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <p className="ml-3 whitespace-nowrap text-gray-400">End Date:</p>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date: Date | null) => field.onChange(date)}
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            wrapperClassName="datePicker"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 dark:bg-zinc-800  px-4 py-2">
                                        <Image
                                            src="/assets/dollar.svg"
                                            alt="dollar"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Price"
                                            {...field}
                                            className="p-regular-16 border-0 bg-grey-50 dark:bg-zinc-800 placeholder:text-gray-400 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            disabled={isFree}
                                            value={price}
                                            onChange={(e) => {
                                                field.onChange(e)
                                                handlePriceChange(e)
                                            }}
                                        />
                                       
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 dark:bg-zinc-800 px-4 py-2">
                                        <Image
                                            src="/assets/link.svg"
                                            alt="link"
                                            width={24}
                                            height={24}
                                        />
                                        <Input placeholder="URL" {...field} className="input-field " />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                    className="button col-span-2 w-full"
                >
                    {form.formState.isSubmitting ? (
                        'Submitting...'
                    ) : `${type} Event `}
                </Button>
            </form>
        </Form>
    )
}

export default EventForm
