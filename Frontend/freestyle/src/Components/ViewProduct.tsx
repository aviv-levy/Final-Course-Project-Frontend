import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Product } from "../Services/Interfaces";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { addToCart, likeProduct } from "../Services/ApiService";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import { getBrandDetails, returns } from "../Utils/brandDetails";
import Accordion from "./Accordion";

interface Props {
    product: Product;
}

interface SelectedSize {
    index: number;
    size: string | number;
}

function ViewProduct({ product }: Props) {

    const [outOfStock, setOutOfStock] = useState(false);
    const [selectedSize, setSelectedSize] = useState<SelectedSize>({} as SelectedSize);
    const [isFavorite, setIsFavorite] = useState(false);


    const userDetails = useContext(UserContext);

    //Get Product details when page initialize
    useEffect(() => {
        userDetails?.userDetails?.favoriteProducts?.find(favorite => favorite === product._id)
            ? setIsFavorite(true) : setIsFavorite(false)
        // eslint-disable-next-line
    }, [])

    function handleSelectedSize(selected: SelectedSize, itemQuantity: number) {
        setSelectedSize(selected)
        itemQuantity < 1 ? setOutOfStock(true) : setOutOfStock(false)
    }

    //Add the product to cart
    async function addCart() {
        if (userDetails?.isLoggedIn) {
            let flag = false
            userDetails?.userDetails?.cartProducts?.forEach((cartProduct) => {
                if (cartProduct.productId === product._id)
                    cartProduct.sizeQuantity.quantity < 10 ? flag = false : flag = true
            })
            if (outOfStock) {
                toast.error("Out of stock")
                return;
            }
            else if (selectedSize.size === undefined) {
                toast.error("Please select a size")
                return;
            }
            else if (flag)
                return;

            await addToCart(product._id, { size: selectedSize.size, quantity: 1 })
                .then((user) => {
                    userDetails?.setUserDetails(user)
                    toast.success("Item has been added to cart");

                })
                .catch((err) => { if (err) return; })
        }
        else
            toast.error("You must login");
    }
    //Like or dislike handle button.
    async function handleLike() {
        if (userDetails?.isLoggedIn) {
            setIsFavorite(!isFavorite)
            await likeProduct(product._id)
                .then((user) => {
                    userDetails?.setUserDetails(user)
                })
                .catch((err) => { if (err) return; })
        }
        else
            toast.error("You must login");
    }

    //Accordion titles and conent
    const accordionItems = [
        {
            title: 'Details',
            content: product.description,
        },
        {
            title: 'About Brand',
            content: getBrandDetails(product.brand),
        },
        {
            title: 'Delivery And Returns',
            content: returns,
        },
    ];


    return (
        <div>
            <>
                    <div className="container my-5">
                        <div className="row">
                            <div className="col-md text-center">
                                <img src={product.img} alt={product.imageAlt} className="w-75" />
                            </div>
                            <div className="col-md-5">
                                <hr />
                                <div className="mb-3">
                                    <span>{product.brand}</span>
                                    <h1 className="fs-5 m-0">{product.title}</h1>
                                </div>
                                <span className="fs-5"><strong>{product.price} <span className="fs-3">₪</span></strong></span>

                                <div className="my-3">

                                    <h2 className="fs-5">Size</h2>
                                    {
                                        product.sizeQuantity.map((item, index) =>
                                            <span key={index}
                                                className={`size me-3 ${selectedSize?.index === index ? 'size-selected' : ''}
                                                    ${item.quantity < 1 ? 'not-avilable' : ''}`}
                                                onClick={() => handleSelectedSize({ index: index, size: item.size }, item.quantity)}
                                            >{item.size}</span>
                                        )
                                    }

                                </div>
                                {
                                    !outOfStock ?
                                        <button onClick={addCart} className="btn m-0 w-100 fs-3 addcart">Add to cart</button>
                                        :
                                        <div className="w-100 d-flex justify-content-center">
                                            <div className="outOfStock text-center py-4 px-2">
                                                <span>OUT OF STOCK</span>
                                            </div>
                                        </div>
                                }

                                <hr />

                                <div className="d-flex justify-content-between">
                                    <div className="d-flex flex-column px-2 bg-dark" style={{ color: "#fefa03", fontSize: "14px" }}>
                                        <span>Order today</span>
                                        <span>Received the next business day</span>
                                    </div>
                                    <button onClick={handleLike} className={`btn border-0 ${isFavorite ? 'text-danger' : ''}`}>
                                        <FontAwesomeIcon icon={faHeart} className='me-1' />
                                        {isFavorite ? 'REMOVE' : 'MY LIST'}
                                    </button>

                                </div>

                                <Accordion items={accordionItems} />
                            </div>

                        </div>
                    </div>
            </>
        </div>
    );
}

export default ViewProduct;