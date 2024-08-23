    import { Document, model, models, Schema } from "mongoose";

export interface IOrder extends Document {
    _id: string;
    createdAt: Date;
    price: string;
    phoneNumber: string;
    emailAddress: string;
    studentId: string;
    semester: string;
    department: string;
    paymentScreenshot?: string;
    isPaid: boolean;
    paymentStatus: 'approved' | 'pending' | 'rejected';
    event: {
        _id: string;
        title: string;
        description: string;
        location: string;
        imageUrl: string;
        startDateTime: Date;
        endDateTime: Date;
        price: string;
        isFree: boolean;
        url: string;
        category: string;
        organizer: {
            _id: string;
            firstName: string;
            lastName: string;
        };
    };
    buyer: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        username: string;
    };
}


    const orderSchema = new Schema({ 
        createdAt: {
            type: Date,
            default: Date.now,
        },
        price: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        emailAddress: {
            type: String,
            required: true,
        },
        studentId: {
            type: String,
            required: true,
        },
        semester: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        paymentScreenshot: {
            type: String,
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
        event: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: true
        },
        buyer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    });


    const Order = models.Order || model('Order', orderSchema);
    export default Order;
