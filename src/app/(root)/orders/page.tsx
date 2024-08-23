import Orders from "@/components/shared/Orders";
import { getOrdersByEvent } from "@/lib/actions/order.action";
import { SearchParamProps } from "@/types";


const OrdersPage = async ({ searchParams }: SearchParamProps) => {
    const eventId = (searchParams?.eventId as string) || '';
    const searchText = (searchParams?.query as string) || '';

    const orders = await getOrdersByEvent({ eventId, searchString: searchText });
    return <Orders orders={orders} />;
}

export default OrdersPage;
