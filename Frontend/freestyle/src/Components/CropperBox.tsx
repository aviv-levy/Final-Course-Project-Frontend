import { useState, useCallback, FormEvent, useContext } from 'react'
import '../CSS/Cropper.css'
import Cropper, { Area, Point } from 'react-easy-crop'
import getCroppedImg from '../Utils/cropImage';
import { Croppercontext } from '../Pages/AddProductPage';

function CropperBox() {

    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1.1);
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

    const showCropper = useContext(Croppercontext);
    const setCroppedImage = useContext(Croppercontext);

    const onCropComplete = useCallback(
        (croppedArea: Area, croppedAreaPixels: Area) => {
            setCroppedAreaPixels(croppedAreaPixels)
            console.log(croppedArea, croppedAreaPixels);
        },
        []
    );


    function handleCrop(e: FormEvent) {
        e.preventDefault();

        showCropper?.setShowCropper(false)
        showCroppedImage();
    }

    const showCroppedImage = useCallback(async () => {
        try {
            if (showCropper?.uploadedImg) {
                const croppedImage = await getCroppedImg(
                    showCropper?.uploadedImg,
                    croppedAreaPixels,
                    rotation
                )
                // console.log('donee', { croppedImage })
                setCroppedImage?.setUploadedImg(croppedImage)
            }
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels, rotation])


    return (
        <div className="App">
            <div className="crop-container">
                <Cropper
                    image={showCropper?.uploadedImg}
                    crop={crop}
                    zoom={zoom}
                    aspect={1 / 1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
            <div className="controls">
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
                    className="zoom-range"
                />
                <button onClick={handleCrop}>Crop</button>
            </div>
        </div>
    );
}

export default CropperBox;