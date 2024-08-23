import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dataBase/dbConnect';
import Order from '@/lib/dataBase/order.model';

export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        const { orderId, status } = await req.json();

        const validStatuses = ['pending', 'approved', 'rejected'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ success: false, error: 'Invalid status' }, { status: 400 });
        }

        const order = await Order.findByIdAndUpdate(
            orderId,
            { paymentStatus: status },
            { new: true }
        );

        if (!order) {
            return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, order });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
