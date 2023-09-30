import { RotatingLines } from "react-loader-spinner";
import Modal from 'react-modal';


interface Prpos {
    isLoading: boolean
}

function Loading({ isLoading }: Prpos) {
    return (
        <Modal
            isOpen={isLoading}
            ariaHideApp={false}
            style={{ content: { background: 'rgba(255, 255, 255, 0.75)', border: 0, top: 0, bottom: 0, left: 0, right: 0 } }}
        >
            <div className="d-flex justify-content-center align-items-center h-100">
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </div>
        </Modal>

    );
}

export default Loading;