import { useState, FormEvent } from "react";
import '../CSS/inputs.css'

interface Props {
    size: string;
}


function CountButton({ size }: Props) {

    const [quantity, setQuantity] = useState(0)

    function handleIncrease(e: FormEvent) {
        e.preventDefault();
        setQuantity(quantity + 1)
    }

    function handleDecrease(e: FormEvent) {
        e.preventDefault();
        if (quantity !== 0)
            setQuantity(quantity - 1)
    }

    return (
        <div>
            <div className="text-center">
                <span className="fs-5">{size}</span>
                <div className="d-flex justify-content-center">
                    <div className="btnwidth">
                        <button onClick={handleDecrease} className="btn btn-dark roundbtn w-100">-</button>
                    </div>

                    <input type="number"
                        className="countinput border-0 p-0 fs-5"
                        value={quantity}
                        onChange={(e) => setQuantity(+e.target.value)} />
                    <div className="btnwidth">
                        <button onClick={handleIncrease} className="btn btn-dark roundbtn">+</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CountButton;