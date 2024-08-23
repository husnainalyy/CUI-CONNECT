import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { dbConnect } from '@/lib/dataBase/dbConnect';
import Order from '@/lib/dataBase/order.model';
import { orderSchema } from '@/lib/validators'; // Adjust path as needed
import { z } from "zod";

type OrderData = z.infer<typeof orderSchema>;

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        // Parse and log the request body
        const data = await req.json();
        console.log("Received data:", data);

        // Validate the request data using Zod schema
        const parsedData: OrderData = orderSchema.parse(data);
        console.log("Validated data:", parsedData);

        // Convert the validated ObjectId strings to actual MongoDB ObjectId instances
        const buyerId = new mongoose.Types.ObjectId(parsedData.buyerId);
        const eventId = new mongoose.Types.ObjectId(parsedData.eventId);
        console.log("Converted buyerId to ObjectId:", buyerId);
        console.log("Converted eventId to ObjectId:", eventId);

        // Create a new order with the correct ObjectId references
        const order = new Order({
            ...parsedData,
            buyer: buyerId,
            event: eventId,
            paymentScreenshot: parsedData.paymentScreenshot,
        });
        console.log("Order object to be saved:", order);

        // Save the order to the database
        await order.save();
        console.log("Order saved successfully");

        // Send a success response
        return NextResponse.json({ success: true, message: 'Order created successfully!' }, { status: 201 });
    } catch (error:any) {
        console.error('Error creating order:', error);
        // Handle different types of errors (validation, database, etc.)
        return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
