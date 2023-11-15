import { useState, FormEvent, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import '../CSS/inputs.css'
import { AddSizeContext } from "../Pages/AddProductPage";

interface Props {
    size: number | string;
    amount?: number;
    removeButton?: boolean;
}


function CountButton({ size, amount, removeButton }: Props) {

    const sizesContext = useContext(AddSizeContext);
    const [quantity, setQuantity] = useState(amount || 1)

    //Set new size and quantity to a product
    function setSize(newQuantity: number) {
        sizesContext?.sizesQuantity.forEach(item => item.size === size && (item.quantity = newQuantity));
        setQuantity(newQuantity);
        sizesContext?.setSizesQuantity(sizesContext?.sizesQuantity)
    }
    //Handle Increase button
    function handleIncrease(e: FormEvent) {
        e.preventDefault();
        setSize(quantity + 1)
    }
    //Handle Decrease button
    function handleDecrease(e: FormEvent) {
        e.preventDefault();
        if (quantity > 1)
            setSize(quantity - 1)
    }

    //Handle Remove count button
    function handleRemove() {
        sizesContext?.setRefreshSort(false);
        sizesContext?.sizes.forEach(disabledSize => disabledSize.size === size && (disabledSize.isDisabled = false));
        sizesContext?.setSizes(sizesContext?.sizes);
        sizesContext?.setSizesQuantity(sizesContext?.sizesQuantity.filter(item => item.size !== size))
    }

    return (
        <div className="mt-2">
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
                {
                    removeButton &&
                    <div className="w-100 text-end">
                        <button onClick={handleRemove} className="btn btn-danger roundbtn"><FontAwesomeIcon icon={faTrash} className="icon-size me-1" /><span className="fs-6">Remove</span></button>
                    </div>
                }
            </div>
        </div>
    );
}

export default CountButton;