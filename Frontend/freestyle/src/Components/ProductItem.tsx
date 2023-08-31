import '../CSS/Product.css'
import { faEdit, faHeart, faTrash, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";


interface Props {
    title: string;
    subtitle: string;
    img?: string;
    alt_img?: string;
    price: number
}

function ProductItem({ title, subtitle, img, alt_img, price }: Props) {


    const navigate = useNavigate();


    //Like or dislike handle button
    async function handleLike() {
        // if (removeLike && like)
        //     removeLike(cardId);
        // setLike(!like)
        // await likeCard(cardId)
        //     .then((user) => {
        //         userDetails?.setUserDetails(user)
        //     })
        //     .catch((err) => { if (err) return; })
    }

    //Delete card handle button
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

    return (
        <div className="col">
            <div className="card h-100 border-0">
                <>
                    <div className='product-top position-relative text-center'>
                        <Link to='product'>
                            <img src={img} className="card-img-top" alt={alt_img} />
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
                                <button onClick={handleLike} className='btn border-0 text-white d-flex flex-column align-items-center p-1'>
                                    <FontAwesomeIcon icon={faCartShopping} className={'text-white'} />
                                    <span className='product-options-color'>Add to Cart</span>
                                </button>
                                <button onClick={handleLike} className='btn border-0 text-white d-flex flex-column align-items-center p-1'>

                                    <FontAwesomeIcon icon={faHeart} className={'text-white'} />
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



            </div>
        </div >
    );
}

export default ProductItem;


