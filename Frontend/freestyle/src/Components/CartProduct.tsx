import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import '../CSS/Product.css'
import CountButton from "./CountButton";


interface Props {
    img: string;
    title: string;
    subTitle: string;
    price: number;
}

function CartProduct({ img, title, subTitle, price }: Props) {
    return (
        <>
            <div className="container-fluid">
                <div className="row d-flex align-items-center">
                    <div className="col-1"></div>
                    <div className="col icon-color fs-5 ">
                        <FontAwesomeIcon icon={faX} className="me-4" />
                        <FontAwesomeIcon icon={faHeart} className="me-2 " />
                    </div>
                    <div className="col">
                        <img src={img} alt="" className="img-fluid img-size" />
                    </div>
                    <div className="col-3">
                        <div className="mb-1">
                            {title}
                        </div>
                        <div>
                           {subTitle}
                        </div>
                    </div>
                    <div className="col">
                        <CountButton size='large' />
                    </div>
                    <div className="col">
                      <strong>{price}<span className='fs-5'>₪</span></strong>
                    </div>
                </div>

            </div>
            <hr />
        </>
    );
}

export default CartProduct;