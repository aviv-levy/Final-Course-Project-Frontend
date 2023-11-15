import '../CSS/Product.css'
import { faEdit, faHeart, faTrash, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { addToCart, deleteProduct, likeProduct, removeFromCart } from '../Services/ApiService';
import { UserContext } from '../App';
import { Product, SizeQuantity } from '../Services/Interfaces';
import SelectSizeWindow from './SelectSizeWindow';


interface Props {
    product: Product,
    addProduct?: boolean
}

function ProductItem({ product, addProduct }: Props) {
    const [like, setLike] = useState(false);
    const [cart, setCart] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [showSelectSize, setShowSelectSize] = useState(false);
    const [sizeQuantity, setSizeQuantity] = useState<SizeQuantity>();

    const navigate = useNavigate();

    const userDetails = useContext(UserContext);


    //Like or dislike handle button.
    async function handleLike() {
        setLike(!like)
        await likeProduct(product._id)
            .then((user) => {
                userDetails?.setUserDetails(user)
            })
            .catch((err) => { if (err) return; })
    }

    //Add product from cart.
    async function handleAddCart() {
        setCart(!cart);
        await addToCart(product._id, sizeQuantity)
            .then((user) => {
                userDetails?.setUserDetails(user)
            })
            .catch((err) => { if (err) return; })
    }

    //Remove product from cart.
    async function handleRemoveCart() {
        setCart(!cart);
        await removeFromCart(product._id).then((user) => {
            userDetails?.setUserDetails(user)
        })
            .catch((err) => { if (err) return; })
    }

    //Delete card handle button.
    async function handleDelete() {
        await deleteProduct(product._id)
            .then(() => {
                setIsDeleted(true)
            }).catch((err) => { if (err) return; })
    }

    useEffect(() => {
        userDetails?.userDetails?.favoriteProducts?.forEach((item) => {
            if (item === product._id)
                setLike(true);
        })
        userDetails?.userDetails?.cartProducts?.forEach((item) => {
            if (item.productId === product._id)
                setCart(true);
        })
        // eslint-disable-next-line
    }, [])


    return (
        <>
            {
                !isDeleted &&
                <div className="col">
                    <div className="card h-100">
                        {
                            !addProduct ?
                                <>
                                    {
                                        showSelectSize ?
                                            <SelectSizeWindow product={product} setShowSelectSize={setShowSelectSize} />
                                            :
                                            <div className='product-top position-relative text-center h-100'>
                                                <Link to={`/product/${product._id}`}>
                                                    <img src={product.img} className="card-img-top h-100" alt={product.imageAlt} />
                                                </Link>


                                                {
                                                    //Sizes of product view
                                                }
                                                <div className="size-position h-100">
                                                    <div className="product-sizes w-100 d-flex flex-column justify-content-center">
                                                        {product.sizeQuantity.map((sizequantity, index) =>
                                                            <div key={index} className='sizeview'>
                                                                <span className={`sizess ${sizequantity.quantity < 1 ? 'not-avilable' : ''}`}>{sizequantity.size} </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>


                                                {
                                                    //Bottom button options
                                                }
                                                <div className="w-100 d-flex justify-content-center">
                                                    <div className="product-options d-flex justify-content-evenly pt-1">
                                                        <button onClick={!cart ? () => setShowSelectSize(true) : handleRemoveCart} className='btn border-0 text-white d-flex flex-column align-items-center p-1'>
                                                            <FontAwesomeIcon icon={faCartShopping} className={'text-white'} />
                                                            <span className='product-options-color'>{!cart ? 'Add to Cart' : 'Remove'}</span>
                                                        </button>
                                                        <button onClick={handleLike} className='btn border-0 text-white d-flex flex-column align-items-center p-1'>

                                                            <FontAwesomeIcon icon={faHeart} className={like ? 'text-danger' : 'text-white'} />
                                                            <span className='product-options-color'>My List</span>
                                                        </button>
                                                        {
                                                            userDetails?.isLoggedIn && (userDetails.userDetails?._id === product.userId || userDetails.userDetails?.isAdmin) &&
                                                            <>
                                                                <button onClick={() => navigate(`/editProduct/${product._id}`)} className='btn border-0 text-white d-flex flex-column align-items-center p-1'>
                                                                    <FontAwesomeIcon icon={faEdit} className='text-white' />
                                                                    <span className='product-options-color'>Edit</span>
                                                                </button>
                                                                <button onClick={handleDelete} className='btn border-0 text-white d-flex flex-column align-items-center p-1'>

                                                                    <FontAwesomeIcon icon={faTrash} className='text-white' />
                                                                    <span className='product-options-color'>Delete</span>
                                                                </button>
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                    }


                                    <div className="card-body px-1">
                                        <div className="d-flex justify-content-between">
                                            <span className="card-title">{product.title}</span>
                                            <span className="text-end"><strong>{product.price} ₪</strong></span>
                                        </div>
                                        <span className="card-text">{product.subtitle}</span>

                                    </div>
                                </>
                                :
                                <div className="d-flex justify-content-center align-items-center h-100">
                                    <Link to='addProduct' className='btn fs-1 p-5 h-100 w-100 d-flex flex-column justify-content-center new-card '>+ <h3>Add New</h3></Link>
                                </div>
                        }



                    </div>
                </div >
            }
        </>
    );
}

export default ProductItem;


