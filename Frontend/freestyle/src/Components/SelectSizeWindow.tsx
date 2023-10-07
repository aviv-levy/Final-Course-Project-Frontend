import Modal from 'react-modal';
import { Product } from '../Services/Interfaces';


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

            <div className="container">
                <div className="row">
                    <div className='col-md-5'>
                        <img src={product.img} alt={product.imageAlt} className='img-thumbnail' />
                    </div>
                    <div className='col-md'>
                        
                    </div>
                </div>

            </div>
        </Modal>
    );
}

export default SelectSizeWindow;