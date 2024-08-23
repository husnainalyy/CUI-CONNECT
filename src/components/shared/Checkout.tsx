import React from 'react';
import { Button } from '../ui/button';
import { IEvent } from '@/lib/dataBase/event.model';
import { useRouter } from 'next/navigation';
import querystring from 'querystring';

const Checkout = ({ event, userId }: { event: IEvent, userId: string }) => {
    const router = useRouter();

    // Function to handle form submission and redirection
    const onCheckout = async (e: React.FormEvent) => {
        e.preventDefault();

        
        // Redirect to registration page with event data
        router.push(`/checkout?${querystring.stringify({
            eventId: event._id,
            buyerId: userId,
            eventTitle: event.title,
            price: event.price,
            isFree: event.isFree,
        })}`);
    };

    return (
        <form onSubmit={onCheckout}>
            <Button type="submit" size="lg" className="button sm:w-fit">
                {event.isFree ? 'Get Ticket' : 'Register'}
            </Button>
        </form>
    );
};

export default Checkout;
