import { useState, FormEvent } from "react";
import '../CSS/inputs.css'

interface Props {
    size: number|string;
}


function CountButton({ size }: Props) {

    const [quantity, setQuantity] = useState(1)

    function handleIncrease(e: FormEvent) {
        e.preventDefault();
        setQuantity(quantity + 1)
    }

    function handleDecrease(e: FormEvent) {
        e.preventDefault();
        if (quantity >1)
            setQuantity(quantity - 1)
    }

    return (
        <div>
            <span className="fs-6">Size: {size}</span>
            <div className="d-flex">
                <div className="btnwidth">
                    <button onClick={handleDecrease} className="btn btn-dark roundbtn w-100">-</button>
                </div>

                <input type="number"
                    className="countinput border-0 p-0 fs-6"
                    value={quantity}
                    onChange={(e) => setQuantity(+e.target.value)} />
                <div className="btnwidth">
                    <button onClick={handleIncrease} className="btn btn-dark roundbtn">+</button>
                </div>
            </div>
        </div>
    );
}

export default CountButton;