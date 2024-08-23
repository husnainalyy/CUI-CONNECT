"use client";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import Search from "@/components/shared/Search";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { IOrder } from "@/lib/dataBase/order.model";
import Image from "next/image";

const Orders = ({ orders }: { orders: IOrder[] }) => {
    const [orderStatus, setOrderStatus] = useState<Record<string, string>>(
        () => orders.reduce((acc: Record<string, string>, order: IOrder) => {
            acc[order._id] = order.paymentStatus;
            return acc;
        }, {} as Record<string, string>)
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    const openModal = (orderId: string) => {
        setSelectedOrderId(orderId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrderId(null);
    };

    const handleStatusChange = async (orderId: string, status: string) => {
        // Optimistically update UI
        setOrderStatus((prevState) => ({
            ...prevState,
            [orderId]: status,
        }));

        try {
            await fetch(`/api/update-payment-status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, status }),
            });

            // Optionally handle server response if needed
        } catch (error) {
            console.error('Error updating payment status:', error);
            // Revert the state if there's an error
            setOrderStatus((prevState) => ({
                ...prevState,
                [orderId]: prevState[orderId], // Keep previous status on error
            }));
        }
    };

    return (
        <>
            <section className="bg-primary-50 dark:bg-zinc-800 bg-dotted-pattern bg-cover bg-center flex py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center">Orders</h3>
            </section>

            <section className="mt-8 px-8">
                <Search placeholder="Search buyer name..." />
            </section>

            <section className="overflow-x-auto py-8 px-8">
                <table className="w-full border-collapse border-t">
                    <thead>
                        <tr className="p-medium-14 border-b text-grey-500">
                            <th className="min-w-[250px] py-3 text-left">Order ID</th>
                            <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Event Title</th>
                            <th className="min-w-[150px] py-3 text-left">Buyer</th>
                            <th className="min-w-[150px] py-3 text-left">Username</th>
                            <th className="min-w-[150px] py-3 text-left">Email</th>
                            <th className="min-w-[100px] py-3 text-left">Created</th>
                            <th className="min-w-[100px] py-3 text-right">Amount</th>
                            <th className="min-w-[100px] py-3 text-right">Payment Status</th>
                            <th className="min-w-[150px] py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr className="border-b">
                                <td colSpan={9} className="py-4 text-center text-gray-500">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((row: any) => (
                                <tr key={row._id} className="w-full p-regular-14 lg:p-regular-16 border-b">
                                    <td className="min-w-[250px] py-4 text-primary-500">{row._id}</td>
                                    <td className="min-w-[200px] flex-1 py-4 pr-4">{row.eventTitle}</td>
                                    <td className="min-w-[150px] py-4">{row.buyerFirstName} {row.buyerLastName}</td>
                                    <td className="min-w-[150px] py-4">{row.buyerUsername}</td>
                                    <td className="min-w-[150px] py-4 pr-4">{row.buyerEmail}</td>
                                    <td className="min-w-[100px] py-4">
                                        {formatDateTime(row.createdAt).dateTime}
                                    </td>
                                    <td className="min-w-[100px] py-4 text-right ">
                                        {formatPrice(row.price)}
                                    </td>
                                    <td className="min-w-[150px] py-8 pr-4 mr-5 flex justify-end items-center">
                                        {orderStatus[row._id]}
                                    </td>
                                    <td className="min-w-[150px] py-4 pr-4">
                                        {row.paymentScreenshot && (
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button className="text-primary-500 hover:underline">
                                                        View Screenshot
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent className="bg-black">
                                                    <DialogTitle>Payment Screenshot</DialogTitle>
                                                    <DialogDescription>
                                                        <Image src={row.paymentScreenshot} alt="Payment Screenshot" width={100} height={100} />
                                                        <div className="mt-4">
                                                            <div>
                                                                <label>
                                                                    <input
                                                                        type="radio"
                                                                        name={`status-${row._id}`}
                                                                        value="pending"
                                                                        checked={orderStatus[row._id] === 'pending'}
                                                                        onChange={() => handleStatusChange(row._id, 'pending')}
                                                                    />
                                                                    Pending
                                                                </label>
                                                                <label>
                                                                    <input
                                                                        type="radio"
                                                                        name={`status-${row._id}`}
                                                                        value="approved"
                                                                        checked={orderStatus[row._id] === 'approved'}
                                                                        onChange={() => handleStatusChange(row._id, 'approved')}
                                                                    />
                                                                    Approved
                                                                </label>
                                                                <label>
                                                                    <input
                                                                        type="radio"
                                                                        name={`status-${row._id}`}
                                                                        value="rejected"
                                                                        checked={orderStatus[row._id] === 'rejected'}
                                                                        onChange={() => handleStatusChange(row._id, 'rejected')}
                                                                    />
                                                                    Rejected
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </DialogDescription>
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default Orders;
