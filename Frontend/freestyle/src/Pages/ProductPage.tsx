import { useContext, useEffect, useState } from "react";
import '../CSS/Product.css'
import { Product } from "../Services/Interfaces";
import { addToCart, getProductById, likeProduct } from "../Services/ApiService";
import { useParams } from "react-router-dom";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Accordion from "../Components/Accordion";
import { getBrandDetails, returns } from "../Utils/brandDetails";
import { UserContext } from "../App";


function ProductPage() {

    const [product, setProduct] = useState<Product>({} as Product);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState<number>();
    const [isFavorite, setIsFavorite] = useState(false);
    const { productId } = useParams();


    const userDetails = useContext(UserContext);

    //Get Product details when page initialize
    useEffect(() => {
        const getProduct = async () => {
            const Product = await getProductById(productId);
            setProduct(Product)
            setIsLoading(false);
        }

        getProduct().catch((err) => {
            if (err) {
                return;
            }
        });
        userDetails?.userDetails?.favoriteProducts?.find(favorite => favorite === productId)
            ? setIsFavorite(true) : setIsFavorite(false)
        // eslint-disable-next-line
    }, [])

    //Add the product to cart
    async function addCart() {
        await addToCart(product._id)
            .then((user) => {
                userDetails?.setUserDetails(user)
            })
            .catch((err) => { if (err) return; })
    }
    //Like or dislike handle button.
    async function handleLike() {
        setIsFavorite(!isFavorite)
        await likeProduct(product._id)
            .then((user) => {
                userDetails?.setUserDetails(user)
            })
            .catch((err) => { if (err) return; })
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
        <>
            {
                !isLoading &&
                <div className="container mt-5">
                    <div className="row">

                        <div className="col-5">
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
                                        <span key={index} className={`size me-3 ${selectedSize === index ? 'size-selected' : ''}`} onClick={() => setSelectedSize(index)}
                                        >{item.size}</span>
                                    )
                                }

                            </div>

                            <button onClick={addCart} className="btn m-0 w-100 fs-3 addcart">Add to cart</button>

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

                        <div className="col text-center">
                            <img src={product.img} alt={product.imageAlt} className="w-75" />
                        </div>

                    </div>
                </div>
            }
        </>
    );
}

export default ProductPage;