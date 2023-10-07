import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import '../CSS/Product.css'
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Pages/CartPage";
import { changePrdouctCartAmount, likeProduct, removeFromCart } from "../Services/ApiService";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


function CartProduct() {

    const [isFavorite, setIsFavorite] = useState(false);

    const product = useContext(CartContext)?.product;
    const productSizeQuantity = useContext(CartContext)?.sizeQuantity;
    const userDetails = useContext(UserContext);


    async function handleRemoveCart() {

        await removeFromCart(product._id).then((user) => {
            userDetails?.setUserDetails(user);
            toast.success('Product removed from cart');
        }).catch((err) => {
            if (err)
                toast.error('Error accourd while removing')
        })
    }

    async function handleFavorite() {
        setIsFavorite(!isFavorite)
        await likeProduct(product._id)
            .then((user) => {
                userDetails?.setUserDetails(user)
            })
            .catch((err) => { if (err) return; })
    }
    async function handleQuantity(quantity: number) {

        await changePrdouctCartAmount(product._id, quantity).then((user) => {
            userDetails?.setUserDetails(user);
        }).catch(err => {
            if (err)
                return;
        })
    }

    useEffect(() => {
        userDetails?.userDetails?.favoriteProducts?.forEach((favoriteProductId) => {
            if (favoriteProductId === product._id) {
                setIsFavorite(true);
                return;
            }
        })
    }, [userDetails?.userDetails?.favoriteProducts])

    return (
        <>
            <div className="container-fluid">
                <div className="row align-items-center mx-3">
                    <div className="col-md-3 icon-color fs-6 ">
                        <FontAwesomeIcon onClick={handleRemoveCart} icon={faX} className="me-4 cursor-pointer" />
                        <FontAwesomeIcon onClick={handleFavorite} icon={faHeart} className={`me-2 cursor-pointer ${isFavorite ? 'text-danger' : ''}`} />
                        <Link to={`/product/${product._id}`}>
                            <img src={product.img} alt="" className="img-fluid img-size" />
                        </Link>
                    </div>
                    <div className="col-5">
                        <div className="mb-1">
                            {product.title}
                        </div>
                        <div>
                            {product.subtitle}
                        </div>
                    </div>
                    <div className="col">
                        <div>Size: {productSizeQuantity.size} </div>
                        <select value={productSizeQuantity.quantity} onChange={(e) => handleQuantity(+e.target.value)}>
                            {
                                Array.from(Array(10)).map((e, i) => <option value={i + 1} key={i + 1}>{i + 1}</option>)
                            }
                        </select>
                    </div>
                    <div className="col">
                        <strong>{product.price * productSizeQuantity.quantity}<span className='fs-5'>₪</span></strong>
                    </div>
                </div>

            </div>
            <hr />
        </>
    );
}

export default CartProduct;