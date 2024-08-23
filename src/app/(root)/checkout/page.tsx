"use client";

import React, { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IEvent } from "@/lib/dataBase/event.model";
import { FileUploader } from "@/components/shared/FileUploader";
import { formSchema } from "@/lib/validators";
import { useRouter, useSearchParams } from 'next/navigation';
import { useUploadThing } from "@/lib/uploadthing";

export type CheckoutFormData = z.infer<typeof formSchema>;

const CheckoutForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Extract data from URL query parameters
    const eventId = searchParams.get('eventId') || '';
    const buyerId = searchParams.get('buyerId') || '';
    const eventTitle = searchParams.get('eventTitle') || '';
    const price = searchParams.get('price') || '';
    const isFree = searchParams.get('isFree') === 'true';

    const [files, setFiles] = useState<File[]>([]);
    const [registrationSuccess, setRegistrationSuccess] = useState(false); // Track registration status
    const { startUpload } = useUploadThing('imageUploader');

    const methods = useForm<CheckoutFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phoneNumber: "",
            emailAddress: "",
            studentId: "",
            semester: "",
            department: "",
            paymentScreenshot: "",
        },
    });

    const { handleSubmit, formState, control } = methods;

    const onSubmit = async (data: CheckoutFormData) => {
        let uploadedImageUrl = data.paymentScreenshot; // Use the existing image URL if available

        if (files.length > 0) {
            try {
                const uploadedImages = await startUpload(files);

                if (uploadedImages && uploadedImages.length > 0) {
                    uploadedImageUrl = uploadedImages[0].url;
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                return;
            }
        }

        console.log('Form data:', data, 'event ID:', eventId, 'event title:', eventTitle, 'price:', price, 'isFree:', isFree, 'buyer ID:', buyerId);
        try {
            const response = await fetch('/api/register-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    eventId, // Use the event ID from query params
                    buyerId, // Use the buyer ID from query params                
                    eventTitle, // Use event title from query params
                    price, // Use price from query params
                    isFree, // Use isFree from query params
                    paymentScreenshot: uploadedImageUrl, // Include the uploaded image URL
                }),
            });

            const result = await response.json();

            if (result.success) {
                console.log('Registration successful:', result.order);
                setRegistrationSuccess(true); // Set success state
                router.push('/profile'); // Redirect to the profile page
            } else {
                console.error('Registration failed:', result.error);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    if (registrationSuccess) {
        return (
            <section className="bg-dotted-pattern bg-cover bg-center py-5 md:py-5">
                <h3 className="wrapper h3-bold text-center">Event Registered Successfully!</h3>
            </section>
        );
    }

    return (
        <>
            <section className="bg-dotted-pattern bg-cover bg-center py-5 md:py-5">
                <h3 className="wrapper h3-bold text-center">Register Event</h3>
            </section>

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 px-4">
                    <FormField
                        control={control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Phone Number" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="emailAddress"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Email Address" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="studentId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Student ID" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="semester"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Semester" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="department"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Department" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="paymentScreenshot"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
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

                    <Button
                        type="submit"
                        size="lg"
                        disabled={formState.isSubmitting}
                        className="button col-span-2 w-full"
                    >
                        {formState.isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </form>
            </FormProvider> 
        </>
    );
};

export default CheckoutForm;
