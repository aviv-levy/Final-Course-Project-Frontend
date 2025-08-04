import { createContext, useContext, useEffect, useState } from "react";
import CartProduct from "../Components/CartProduct";
import Title from "../Components/Title";
import { UserContext } from "../App";
import { Address, OrderProduct, PaypalDetails } from "../Services/Interfaces";
import { getCartProducts } from "../Services/ApiService";
import PaypalCheckoutButton from "../Components/PaypalCheckoutButton";
import StyledInput from "../Components/StyledInput";
import { addressValidation } from "../Services/Validations";
import { toast } from "react-toastify";


export const CartContext = createContext<OrderProduct>({} as OrderProduct);
export const PaypalAddressContext = createContext<PaypalDetails>({} as PaypalDetails);


function CartPage() {
    const [orderProducts, setOrderProducts] = useState<Array<OrderProduct>>();
    const [totalPrice, setTotalPrice] = useState(0);
    const [showCheckout, setShowCheckout] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [errors, setError] = useState<string[]>([]);
    const [stockErrors, setStockError] = useState<string[]>([]);

    const userDetails = useContext(UserContext);
    const cartProducts = useContext(UserContext)?.userDetails?.cartProducts;
    const [address, setAddress] = useState<Address>(userDetails?.userDetails?.address || {} as Address);

    function handleShowPayment() {
        if (!addressValidation(setError, address))
            return;
        
        setShowPayment(true);
    }

    useEffect(() => {
        const getProducts = async () => {
            const products = await getCartProducts();
            const filteredProducts: Array<OrderProduct> = [];
            let TotalPrice = 0;
            if (cartProducts?.length)
                for (let i = 0; i < products.length; i++) {
                    for (let j = 0; j < cartProducts?.length; j++) {
                        if (products[i]._id === cartProducts[j].productId)
                            filteredProducts.push({ product: products[i], sizeQuantity: cartProducts[j].sizeQuantity })

                    }
                    TotalPrice += filteredProducts[i].product.price * filteredProducts[i].sizeQuantity.quantity
                }
            setTotalPrice(TotalPrice);
            setOrderProducts(filteredProducts)
        }

        setStockError([])


        getProducts().catch((err) => {
            if (err) {
                return;
            }
        });
        // eslint-disable-next-line
    }, [userDetails?.userDetails?.cartProducts])

    function handleCheckout() {
        const stockErrorsArr: string[] = [];
        let isInStock = true;
        orderProducts?.forEach((orderProduct,index) => {
            orderProduct.product.sizeQuantity.forEach((productSizes) => {
                if (orderProduct.sizeQuantity.quantity > productSizes.quantity && orderProduct.sizeQuantity.size === productSizes.size) {
                    toast.error("Not enough in stock");
                    stockErrorsArr[index] = "Not enough in stock";
                    isInStock = false;
                }
            })
        })
        setStockError(stockErrorsArr);
        if (isInStock)
            setShowCheckout(true);
    }

    return (
        <>
            {
                !showCheckout ?
                    <div className="mb-5">
                        <Title title='Cart' />
                        {

                            orderProducts?.map((product, index) =>
                                <CartContext.Provider key={product.product._id} value={product}>
                                    <CartProduct key={index} stockErr={stockErrors[index]}/>
                                </CartContext.Provider>
                            )
                        }

                        <div className="d-flex justify-content-between mx-4">
                            <span className="fs-4"><strong>Total: {totalPrice}₪</strong></span>
                            <button onClick={handleCheckout} className="btn btn-dark px-5" disabled={orderProducts?.length === 0}>Checkout</button>
                        </div>
                    </div>
                    :
                    <div className="container my-5">
                        <div className="row">
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <form className="mt-5">
                                    <StyledInput inputParam="city" inputValue={address?.city} placeholder="City" setValueFunc={setAddress} type="text" errorText={errors[0]} />
                                    <StyledInput inputParam="street" inputValue={address?.street} placeholder="Street" setValueFunc={setAddress} type="text" errorText={errors[1]} />
                                    <StyledInput inputParam="housenum" inputValue={address?.housenum} placeholder="Houser Number" setValueFunc={setAddress} type="number" errorText={errors[2]} />
                                </form>
                            </div>
                            <div className="col-md-3"></div> <div className="col-md-3"></div>
                        </div>
                        <div className="d-flex justify-content-center">
                            {
                                !showPayment ?
                                    <button onClick={handleShowPayment} className="btn btn-dark">Payement</button>
                                    :
                                    <PaypalAddressContext.Provider value={{ address, orderProducts, totalPrice }}>
                                        <PaypalCheckoutButton />
                                    </PaypalAddressContext.Provider>
                            }
                        </div>

                    </div>
            }
        </>
    );
}

export default CartPage;