import { useState, FormEvent } from "react";

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
                <div >{size}</div>
                <button onClick={handleDecrease} className="btn btn-dark">-</button>

                <input type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(+e.target.value)} />

                <button onClick={handleIncrease} className="btn btn-dark">+</button>
            </div>
        </div>
    );
}

export default CountButton;