import { ReactNode } from "react";
import { OrderHistory } from "../Services/Interfaces";
import { convertDateToString } from "../Utils/dateConvert";
import { totalBilled } from "../Utils/calculates";

interface Props {
    order: OrderHistory,
    children: ReactNode;
}


function OrdersLayout({ order, children }: Props) {

    return (
        <div className="my-5">
            <>
                <div className="d-flex justify-content-between px-5">
                    <span>{convertDateToString(order.paypalPayment.create_time)}</span>
                    <span>Order Number: {order.orderNumber}</span>
                </div>
                <div className="ms-5">
                    <hr />
                </div>
                {children}
                <div className="ms-5">
                    <hr />
                    <div className="d-flex justify-content-between pe-5">
                        <span><strong>Total Billed</strong></span>
                        <span>{totalBilled(order)}₪</span>
                    </div>
                </div>
            </>
        </div>
    );
}

export default OrdersLayout;