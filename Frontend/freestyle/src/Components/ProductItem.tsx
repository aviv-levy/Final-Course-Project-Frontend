import '../CSS/Product.css'
import { faEdit, faHeart, faTrash, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addToCart, likeProduct } from '../Services/ApiService';
import { UserContext } from '../App';


interface Props {
    id?: string;
    title: string;
    subtitle: string;
    img?: string;
    alt_img?: string;
    price: number,
    addProduct?: boolean
}

function ProductItem({ id, title, subtitle, img, alt_img, price, addProduct }: Props) {

    const [like, setLike] = useState(false);
    const [cart, setCart] = useState(false);
    const navigate = useNavigate();

    const userDetails = useContext(UserContext);


    //Like or dislike handle button.
    async function handleLike() {
        setLike(!like)
        await likeProduct(id)
            .then((user) => {
                userDetails?.setUserDetails(user)
            })
            .catch((err) => { if (err) return; })
    }

    //Add or remove products from cart.
    async function handleCart() {
        setCart(!cart);
        await addToCart(id)
            .then((user) => {
                userDetails?.setUserDetails(user)
            })
            .catch((err) => { if (err) return; })
    }

    //Delete card handle button.
    async function handleDelete() {
        // await deleteCard(cardId)
        //     .then(() => {
        //         setIsDeleted(true)
        //         MySwal.fire({
        //             title: <strong>Good job!</strong>,
        //             html: <i>Your card has been Deleted</i>,
        //             icon: 'success'
        //         })
        //     })
    }

    //Edit card handle button
    function handleEdit() {
        navigate(`/editCard/`)
    }

    useEffect(() => {
        userDetails?.userDetails?.favoriteProducts?.forEach((product) => {
            if (product === id)
                setLike(true);
        })
        userDetails?.userDetails?.cartProducts?.forEach((product) => {
            if (product === id)
                setCart(true);
        })
        // eslint-disable-next-line
    }, [])


    return (
        <div className="col">
            <div className="card h-100">
                {
                    !addProduct ?
                        <>
                            <div className='product-top position-relative text-center h-100'>
                                <Link to={`/product/${id}`}>
                                    <img src={img} className="card-img-top h-100" alt={alt_img} />
                                </Link>

                                {
                                    //Sizes of product view
                                }
                                <div className="size-position h-100">
                                    <div className="product-sizes w-100 d-flex flex-column justify-content-center">
                                        <div className='sizeview'>
                                            XS
                                        </div>
                                        <div className='sizeview'>
                                            M
                                        </div>
                                        <div className='sizeview'>
                                            L
                                        </div>
                                        <div className='sizeview'>
                                            XL
                                        </div>
                                        <div className='sizeview'>
                                            XXL
                                        </div>
                                    </div>
                                </div>


                                {
                                    //Bottom button options
                                }
                                <div className="w-100 d-flex justify-content-center">
                                    <div className="product-options d-flex justify-content-evenly pt-1">
                                        <button onClick={handleCart} className='btn border-0 text-white d-flex flex-column align-items-center p-1'>
                                            <FontAwesomeIcon icon={faCartShopping} className={'text-white'} />
                                            <span className='product-options-color'>{!cart ? 'Add to Cart' : 'Remove'}</span>
                                        </button>
                                        <button onClick={handleLike} className='btn border-0 text-white d-flex flex-column align-items-center p-1'>

                                            <FontAwesomeIcon icon={faHeart} className={like ? 'text-danger' : 'text-white'} />
                                            <span className='product-options-color'>My List</span>
                                        </button>
                                    </div>
                                </div>
                            </div>


                            <div className="card-body px-1">
                                <div className="d-flex justify-content-between">
                                    <span className="card-title">{title}</span>
                                    <span className="text-end"><strong>{price} ₪</strong></span>
                                </div>
                                <span className="card-text">{subtitle}</span>

                            </div>
                        </>
                        :
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <Link to='addProduct' className='btn fs-1 p-5 h-100 w-100 d-flex flex-column justify-content-center new-card '>+ <h3>Add New</h3></Link>
                        </div>
                }



            </div>
        </div >
    );
}

export default ProductItem;


