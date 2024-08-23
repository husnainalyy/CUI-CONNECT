import { z } from "zod";
import mongoose from "mongoose";


export const eventFormSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    location: z.string().min(3, "Location must be at least 3 characters"),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url("Invalid URL"),

})

export const formSchema = z.object({
    phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
    emailAddress: z.string().email("Invalid email address"),
    studentId: z.string().min(5, "Student ID must be at least 5 characters"),
    semester: z.string().nonempty("Semester is required"),
    department: z.string().nonempty("Department is required"),
    paymentScreenshot: z
        .any()
        .refine((file) => file?.length > 0, "Payment screenshot is required for paid events")
        .optional(),
});


// Custom validator for MongoDB ObjectId
const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
});

export const orderSchema = z.object({
    phoneNumber: z.string().min(10, "Phone number must be at least 10 characters").max(15, "Phone number can be at most 15 characters"),
    emailAddress: z.string().email("Invalid email address"),
    studentId: z.string().min(5, "Student ID must be at least 5 characters"),
    semester: z.string().nonempty("Semester is required"),
    department: z.string().nonempty("Department is required"),
    paymentScreenshot: z.string().optional(),
    eventId: objectIdSchema, // Validate as ObjectId string
    buyerId: objectIdSchema, // Validate as ObjectId string
    eventTitle: z.string(),
    price: z.string(),
    isFree: z.boolean()
});


interface IOrganizer {
    _id: string;
    firstName: string;
    lastName: string;
}

export interface ITicket {
    _id: string;
    title: string;
    description: string;
    location: string;
    imageUrl: string;
    startDateTime: string;
    endDateTime: string;
    price: string;
    isFree: boolean;
    url: string;
    category: string;
    organizer: IOrganizer;
    createdAt: string;
    __v: number;
}
