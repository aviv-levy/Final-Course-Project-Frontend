import { useState, useCallback, FormEvent, useContext, useEffect } from 'react'
import '../CSS/Cropper.css'
import Cropper, { Area, Point } from 'react-easy-crop'
import getCroppedImg from '../Utils/cropImage';

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