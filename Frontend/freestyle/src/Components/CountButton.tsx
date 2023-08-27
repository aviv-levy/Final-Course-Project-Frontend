import { useState, FormEvent, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import '../CSS/inputs.css'
import { AddSizeContext } from "../Pages/ManageProductsPage";

interface Props {
    size: number | string;
}


function CountButton({ size }: Props) {

    const sizesContext = useContext(AddSizeContext);
    const [quantity, setQuantity] = useState(1)

    function setSize(newQuantity: number) {
        sizesContext?.sizesQuantity.map((item) => {
            if (item.size === size)
                item.quantity = newQuantity
        })
        setQuantity(newQuantity);
        sizesContext?.setSizesQuantity(sizesContext?.sizesQuantity)
    }

    function handleIncrease(e: FormEvent) {
        e.preventDefault();
        setSize(quantity + 1)
    }

    function handleDecrease(e: FormEvent) {
        e.preventDefault();
        if (quantity > 1)
            setSize(quantity - 1)
    }

    //Handle Remove count button
    function handleRemove() {

        sizesContext?.sizes.map(disabledSize => {
            if (size === disabledSize.size)
                disabledSize.isDisabled = false
        })
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
                <div className="w-100 text-end">
                    <button onClick={handleRemove} className="btn btn-danger roundbtn"><FontAwesomeIcon icon={faTrash} className="icon-size me-1" /><span className="fs-6">Remove</span></button>
                </div>
            </div>
        </div>
    );
}

export default CountButton;