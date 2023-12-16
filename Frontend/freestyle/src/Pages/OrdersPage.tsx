import { useEffect, useState } from "react";
import OrderProductItem from "../Components/OrderProductItem";
import OrdersLayout from "../Components/OrdersLayout";
import Title from "../Components/Title";
import { OrderHistory } from "../Services/Interfaces";
import { getOrdersHistory } from "../Services/ApiService";

function OrdersPage() {
    const [ordersHistory, setOrdersHistory] = useState<Array<OrderHistory>>();

    useEffect(() => {
        const getOrders = async () => {
            const orders = await getOrdersHistory();
            setOrdersHistory(orders)
        }

        getOrders().catch((err) => {
            if (err) {
                return;
            }
        });
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <>
                <Title title="My orders" />
                {
                    ordersHistory?.map(order =>
                        <OrdersLayout key={order._id} order={order}>
                            {order.products.map((orderProduct,index) =>
                                <OrderProductItem key={index} orderProduct={orderProduct} />
                            )}
                        </OrdersLayout>
                    )
                }
            </>
        </div>
    );
}

export default OrdersPage;