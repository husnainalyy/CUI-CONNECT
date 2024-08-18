import { useCallback } from 'react';
import { Document, model, models, Schema } from "mongoose";

export interface IOrder extends Document {
    _id: string;
    createdAt: Date;
    paymentId: string;
    totalAmount: string;
    event: {_id: string, title: string};
    buyer: {_id: string, firstName: string, lastName: string, email: string ,username: string};
}

export type IOrderItem = {
    _id: string
    totalAmount: string
    createdAt: Date
    eventTitle: string
    eventId: string
    buyer: string,
    username: string,
    email: string
}

const orderSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    stripeId: {
        type: String,
        required: true,
        unique: true
    },
    totalAmount: {
        type: String,
        required: true
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})

const Order = models.Order || model('Order', orderSchema);
export default Order