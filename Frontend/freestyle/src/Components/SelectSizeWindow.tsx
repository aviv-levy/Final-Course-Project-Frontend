import Modal from 'react-modal';
import { Product } from '../Services/Interfaces';
import ViewProduct from './ViewProduct';


interface Props {
    product: Product,
    setShowSelectSize: Function
}

function SelectSizeWindow({ product, setShowSelectSize }: Props) {


    function closeModal() {
        setShowSelectSize(false);
    }

    return (
        <Modal
            isOpen={true}
            onRequestClose={closeModal}
            ariaHideApp={true}
            contentLabel="Modal"
        >
            <div className='text-end '>
                <button onClick={closeModal} className='bg-white border-0'>X</button>
            </div>

            <ViewProduct product={product} />
        </Modal>
    );
}

export default SelectSizeWindow;