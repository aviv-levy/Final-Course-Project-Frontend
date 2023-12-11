import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

function OrdersLayout({ children }: Props) {
    return (
        <div>
            <>
                <div className="d-flex justify-content-between px-5">
                    <span>Date</span>
                    <span>Order Number:</span>
                </div>
                {children}
                <div className="ms-5">
                    <hr />
                    <div className="d-flex justify-content-between pe-5">
                        <span><strong>Total Billed</strong></span>
                        <span>Price</span>
                    </div>
                </div>
            </>
        </div>
    );
}

export default OrdersLayout;