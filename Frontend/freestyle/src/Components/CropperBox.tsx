import { useState, useCallback, FormEvent, useContext, useEffect } from 'react'
import '../CSS/Cropper.css'
import Cropper, { Area, Point } from 'react-easy-crop'
import getCroppedImg from '../Utils/cropImage';
import Modal from 'react-modal';
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface Props {
    uploadingImage: string,
    setShowCropper: Function,
    setCroppedImage: Function,
    updateImgServer?: Function
}

function CropperBox({ uploadingImage, setShowCropper, setCroppedImage, updateImgServer }: Props) {

    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1.1);
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
    const [isCropped, setIsCropped] = useState(false);

    const onCropComplete = useCallback(
        (croppedArea: Area, croppedAreaPixels: Area) => {
            setCroppedAreaPixels(croppedAreaPixels)
            console.log(croppedArea, croppedAreaPixels);
        },
        []
    );

    function closeModal() {
        setCroppedImage('')
        setShowCropper(false);
    }

    useEffect(() => {
        if (updateImgServer && isCropped) {
            updateImgServer();
            setShowCropper(false)
        }
    }, [isCropped])

    function handleCrop(e: FormEvent) {
        e.preventDefault();

        if (updateImgServer === undefined)
            setShowCropper(false)
        showCroppedImage();
    }

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                uploadingImage,
                croppedAreaPixels,
                rotation
            )
            // console.log('donee', { croppedImage })
            setCroppedImage(croppedImage)
            setIsCropped(true)

        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels, rotation])

    return (
        <Modal
            isOpen={true}
            onRequestClose={closeModal}
            contentLabel="Modal"
        >
            <div className="App">
                <div className="crop-container">
                    <Cropper
                        image={uploadingImage}
                        crop={crop}
                        zoom={zoom}
                        aspect={1 / 1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>
                <div className="controls d-flex justify-content-center">
                    <div className="d-flex align-items-center me-4">

                        <FontAwesomeIcon icon={faImage} className="me-2" />
                        <input
                            type="range"
                            value={zoom}
                            min={1.1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => {
                                setZoom(+e.target.value)
                            }}
                            style={{ accentColor: "#3f51b5" }}
                        />
                        <FontAwesomeIcon icon={faImage} className="ms-2 fs-4" />
                    </div>
                    <button className='btn px-4 me-2' style={{ backgroundColor: "#fff", color: '#6f6f6f', borderColor: "#8e8e8e" }} onClick={closeModal}>Cancel</button>
                    <button className='btn px-4' style={{ backgroundColor: "#3f51b5", color: 'white' }} onClick={handleCrop}>Crop</button>
                </div>
            </div>
        </Modal>
    );
}

export default CropperBox;