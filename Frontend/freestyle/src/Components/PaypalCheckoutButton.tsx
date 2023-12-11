import { PayPalButtons } from "@paypal/react-paypal-js";
import { OrderResponseBody } from "@paypal/paypal-js";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { createOrder, removeAllFromCart } from "../Services/ApiService";
import { PaypalAddressContext } from "../Pages/CartPage";
import { UserContext } from "../App";


function PaypalCheckoutButton() {

    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState<any>('');

    const details = useContext(PaypalAddressContext);
    const userDetails = useContext(UserContext);

    async function handleApprove(order?: OrderResponseBody) {
        // Call backened function to fulfill order
        await createOrder(order, details.address, details.orderProducts).then(async () => {
            // if response is success
            toast.success('Thank you for your purchase');
            //Remove all cart from backend
            await removeAllFromCart().then(() => {
                setPaidFor(true);
                // Refresh user's account or subscription status
                userDetails?.setUserDetails({ ...userDetails.userDetails, cartProducts: [] });
            }).catch((err) => {
                if (err) {
                    toast.error('please contact us')
                }
            })

        }).catch((err) => {
            if (err) {
                toast.error('please contact us')
            }
        })


        //if the response is error
        // alert
    }
    if (paidFor) {
        // Display success message, modal or redirect use to succes page
        // toast.success('Thank you for your purchase');
    }

    if (error)
        toast.error(error);


    return (
        <>
            <PayPalButtons

                onClick={(data, actions) => {
                    // Validate on button click, client or server side.
                }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: details.totalPrice.toString(),
                                    //value: '2'
                                }
                            }
                        ]
                    })
                }}

                onApprove={async (data, actions) => {
                    const order = await actions.order?.capture();

                    await handleApprove(order);
                }}
                onCancel={() => {
                    //Display cancel message, modal or redirect to cancel page or back to cart.
                    toast("Order has been canceled")
                }}
                onError={(err) => {
                    setError(err);
                    console.error("Paypal Checkout onError", err);
                }} />
        </>
    );
}

export default PaypalCheckoutButton;