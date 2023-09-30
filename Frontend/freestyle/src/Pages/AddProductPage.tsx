import { FormEvent, createContext, useState, useEffect } from "react";
import '../CSS/AddProduct.css'
import CountButton from "../Components/CountButton";
import { fileToBase64 } from "../Utils/fileToString";
import { Product, SizeQuantity } from "../Services/Interfaces";
import StyledInput from "../Components/StyledInput";
import { addNewProduct } from "../Services/ApiService";
import CropperBox from "../Components/CropperBox";
import { sortSizeQuantity } from "../Utils/sorts";
import { toast } from "react-toastify";

interface SizesBtns {
    size: string;
    isDisabled: boolean;
}

interface AddSizeContext {
    sizes: Array<SizesBtns>,
    setSizes: Function,
    sizesQuantity: Array<SizeQuantity>,
    setSizesQuantity: Function,
}

// eslint-disable-next-line
export const AddSizeContext = createContext<AddSizeContext | null>(null);

function AddProductPage() {


    const [product, setProduct] = useState<Product>();
    const [sizes, setSizes] = useState<Array<SizesBtns>>([{ size: "XS", isDisabled: false }, { size: "S", isDisabled: false }, { size: "M", isDisabled: false }, { size: "L", isDisabled: false }, { size: "XL", isDisabled: false }, { size: "XXL", isDisabled: false }])
    const [showCropper, setShowCropper] = useState(false);
    const [uploadedImg, setUploadedImg] = useState('');
    const [sizesQuantity, setSizesQuantity] = useState<Array<SizeQuantity>>([]);
    const [showAddSize, SetShowAddSize] = useState(false);

    async function fileRecieved(file: File) {
        setUploadedImg(await fileToBase64(file))
        setShowCropper(true);
    }

    async function handleAddProduct(e: FormEvent) {
        e.preventDefault();

        await addNewProduct(product).then(() => {
            toast.success('Product added');
        }).catch((err) => {
            toast.error('An error accourd');

        })
    }

    function handleSize(newSize: string) {
        sizes.forEach(size => size.size === newSize && (size.isDisabled = true));
        setSizesQuantity(prevState => [...prevState, { size: newSize, quantity: 1 }]);
    }

    useEffect(() => {
        sortSizeQuantity(sizesQuantity)
        setProduct({ ...product, sizeQuantity: sizesQuantity } as Product);
        // eslint-disable-next-line
    }, [sizesQuantity])

    useEffect(() => {
        setProduct({ ...product, img: uploadedImg } as Product);
        // eslint-disable-next-line
    }, [uploadedImg])

    return (
        <>
            {showCropper &&
                <CropperBox uploadingImage={uploadedImg} setShowCropper={setShowCropper} setCroppedImage={setUploadedImg} />

            }
            <div className="container my-5">
                <div className="row d-flex">
                    <div className="col-1"></div>
                    <div className="col-xl-4  text-center mb-3">
                        {
                            uploadedImg === '' ?
                                <>
                                    <input type="file" id='myfile' accept="image/*" className='file-upload' onChange={(e: any) => fileRecieved(e.target.files[0])} />
                                    <label htmlFor="myfile" className='image-upload'>
                                        <div>+</div>
                                        <div className='fs-4'>Upload Image</div>
                                    </label>
                                </>
                                :
                                <>
                                    <img src={uploadedImg} alt="" className='img-thumbnail' />
                                    <div className="w-100 text-center mt-4">
                                        <button onClick={() => setUploadedImg('')} className='btn btn-dark px-4 me-1'>Clear</button>
                                    </div>
                                </>
                        }
                    </div>

                    <div className="col-xl-3 ">
                        {
                            !showAddSize ?
                                <div onClick={() => SetShowAddSize(true)} className="add-newSize fs-5 p-2 d-flex align-items-center"><div className="add-newSizePlus badge fs-5 p-1 pt-0 mx-2">+</div>Add New Size</div>
                                :
                                <div>
                                    <div className="text-center">
                                        {
                                            sizes?.map((size, index) =>
                                                !size.isDisabled &&
                                                <button key={index} onClick={() => handleSize(size.size)} className="btn btn-outline-dark me-2" >{size.size}</button>
                                            )
                                        }
                                    </div>
                                    <button onClick={() => SetShowAddSize(false)} className="btn btn-dark w-100 my-3">Done</button>
                                </div>

                        }
                        <AddSizeContext.Provider value={{ sizes, setSizes, sizesQuantity, setSizesQuantity }}>
                            <div>
                                {
                                    sizesQuantity.map((newSize, index) =>
                                        <CountButton key={index} size={newSize.size} removeButton />)
                                }
                            </div>
                        </AddSizeContext.Provider>
                    </div>

                    <div className="col-xl-3 mb-3">
                        <form>

                            <StyledInput inputParam="title" placeholder="Title" setValueFunc={setProduct} type="text" />
                            <StyledInput inputParam="subtitle" placeholder="SubTitle" setValueFunc={setProduct} type="text" />
                            <StyledInput inputParam="description" placeholder="Description" setValueFunc={setProduct} type="textArea" />

                            <span>Brand: </span>
                            <select name="brand"
                                className='form-select border-black'
                                onChange={(e) => setProduct((prevState: any) => ({ ...prevState, brand: e.target.value }))}>
                                <option value={undefined}></option>
                                <option value="Nike">Nike</option>
                                <option value="GAP">GAP</option>
                                <option value="Adidas">Adidas</option>
                                <option value="American Eagle">American Eagle</option>
                                <option value="BillaBong">BillaBong</option>
                                <option value="JACK&JONES">JACK&JONES</option>
                                <option value="GANT">GANT</option>
                                <option value="Terminal X">Terminal X</option>
                            </select>

                            <span>Category: </span>
                            <select name="category"
                                className='form-select border-black'
                                onChange={(e) => setProduct((prevState: any) => ({ ...prevState, category: e.target.value }))}>
                                <option value={undefined}></option>
                                <option value="Shirts">Shirts</option>
                                <option value="Shoes">Shoes</option>
                                <option value="Pants">Pants</option>
                                <option value="Dresses">Dresses</option>
                                <option value="Tops">Tops</option>
                                <option value="Underwear">Underwear</option>
                            </select>


                            <label className='w-100'>Gender:</label>
                            <div className="d-flex">
                                <StyledInput inputParam="gender" placeholder="Male" setValueFunc={setProduct} type="radio" id="male" />
                                <StyledInput inputParam="gender" placeholder="Female" setValueFunc={setProduct} type="radio" id="female" />
                                <StyledInput inputParam="gender" placeholder="Unisex" setValueFunc={setProduct} type="radio" id="unisex" />
                            </div>

                            <div className="d-flex mt-4">
                                <StyledInput inputParam="price" placeholder="Price" setValueFunc={setProduct} type="number" /> <span className='fs-3'>₪</span>
                            </div>

                            <div className="w-100 mt-4">
                                <button onClick={handleAddProduct} className="btn btn-dark w-100">Add Product</button>
                            </div>
                        </form>


                    </div>
                </div>
            </div >

        </>
    );
}

export default AddProductPage;