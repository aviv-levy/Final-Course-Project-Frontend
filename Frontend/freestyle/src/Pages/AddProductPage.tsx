import { FormEvent, createContext, useState, useEffect } from "react";
import '../CSS/AddProduct.css'
import CountButton from "../Components/CountButton";
import { fileToBase64 } from "../Utils/fileToString";
import { Product, SizeQuantity } from "../Services/Interfaces";
import StyledInput from "../Components/StyledInput";
import { addNewProduct, updateProduct } from "../Services/ApiService";
import CropperBox from "../Components/CropperBox";
import { sortSizeQuantity } from "../Utils/sorts";
import { toast } from "react-toastify";
import { productValidation } from "../Services/Validations";
import Error from "../Components/Error";

interface SizesBtns {
    size: string;
    isDisabled: boolean;
}

interface AddSizeContext {
    sizes: Array<SizesBtns>,
    setSizes: Function,
    sizesQuantity: Array<SizeQuantity>,
    setSizesQuantity: Function,
    setRefreshSort: Function
}

interface Props {
    editProduct?: Product;
}

const Brands = ['Nike', 'GAP', 'Adidas', 'American Eagle', 'BillaBong', 'JACK&JONES', 'GANT', 'Terminal X'];
const Categories = [{ category: 'Shirts', type: 'Letters' }, { category: 'Shoes', type: 'Number' }, { category: 'Pants', type: 'Number' }, { category: 'Dresses', type: 'Letters' }, { category: 'Tops', type: 'Letters' }, { category: 'Underwear', type: 'Letters' }];

// eslint-disable-next-line
export const AddSizeContext = createContext<AddSizeContext | null>(null);

function AddProductPage({ editProduct }: Props) {

    const [product, setProduct] = useState<Product>({} as Product);
    const [sizes, setSizes] = useState<Array<SizesBtns>>([{ size: "XS", isDisabled: false }, { size: "S", isDisabled: false }, { size: "M", isDisabled: false }, { size: "L", isDisabled: false }, { size: "XL", isDisabled: false }, { size: "XXL", isDisabled: false }])
    const [sizeType, setSizeType] = useState('Letters');
    const [showCropper, setShowCropper] = useState(false);
    const [uploadedImg, setUploadedImg] = useState('');
    const [sizesQuantity, setSizesQuantity] = useState<Array<SizeQuantity>>([]);
    const [sizeQuantity, setSizeQuantity] = useState<SizeQuantity>({} as SizeQuantity);
    const [errorSize, setErrorSize] = useState('');
    const [showAddSize, SetShowAddSize] = useState(false);
    const [refreshSort, setRefreshSort] = useState(true);
    const [errors, setError] = useState<string[]>([]);

    //Convert image file to base 64
    async function fileRecieved(file: File) {
        setUploadedImg(await fileToBase64(file))
        setShowCropper(true);
    }

    //Handle add product
    async function handleAddProduct(e: FormEvent) {
        e.preventDefault();

        if (!productValidation(product, setError))
            return;

        await addNewProduct(product).then(() => {
            toast.success('Product added');
        }).catch((err) => {
            toast.error('An error accourd');

        })
    }
    //Handle edit product
    async function handleEditProduct(e: FormEvent) {
        e.preventDefault();

        if (!productValidation(product, setError))
            return;

        await updateProduct(product).then(() => {
            toast.success('Product has been updated');
        }).catch((err) => {
            toast.error('An error accourd');
        })
    }

    function handleSize(newSize: string | number) {
        if (!isSizeSet(newSize)) {
            setRefreshSort(false);
            setErrorSize('')
            sizes.forEach(size => size.size === newSize && (size.isDisabled = true));
            setSizesQuantity(prevState => [...prevState, { size: newSize, quantity: 1 }]);
        }
        else
            setErrorSize('This size exist in the list')
    }

    function isSizeSet(newSize: string | number): boolean {
        let flag = false;
        sizesQuantity.forEach((size) => {
            if (size.size === newSize) {
                flag = true;
                return;
            }
        })

        return flag
    }

    useEffect(() => {
        setRefreshSort(true);
        sortSizeQuantity(sizesQuantity);
        setProduct({ ...product, sizeQuantity: sizesQuantity } as Product);
        // eslint-disable-next-line
    }, [sizesQuantity])

    useEffect(() => {
        if (!editProduct) {
            setSizesQuantity([]);
            sizes.map(btnSize => btnSize.isDisabled = false)
        }
        Categories.map((category) => {
            if (category.category === product.category)
                setSizeType(category.type)
        })
        // eslint-disable-next-line
    }, [product.category])

    useEffect(() => {
        setProduct({ ...product, img: uploadedImg } as Product);
        // eslint-disable-next-line
    }, [uploadedImg])

    useEffect(() => {
        if (editProduct) {
            setProduct(editProduct);
            if (editProduct.img)
                setUploadedImg(editProduct.img)
            setSizesQuantity(editProduct.sizeQuantity)

            editProduct.sizeQuantity.forEach(sizequantityy => {
                sizes.forEach((size) => {
                    if (size.size === sizequantityy.size)
                        size.isDisabled = true;
                })
            })
        }
        // eslint-disable-next-line
    }, [])

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

                        <div className="col-xl-3 mb-3 ">
                            {
                                !showAddSize ?
                                    <div onClick={() => SetShowAddSize(true)} className="add-newSize fs-5 p-2 d-flex align-items-center"><div className="add-newSizePlus badge fs-5 p-1 pt-0 mx-2">+</div>Add New Size</div>
                                    :
                                    <div>
                                        {
                                            sizeType === 'Letters' ?
                                                <div className="text-center">
                                                    {
                                                        sizes?.map((size, index) =>
                                                            !size.isDisabled &&
                                                            <button key={index} onClick={() => handleSize(size.size)} className="btn btn-outline-dark me-2" >{size.size}</button>
                                                        )
                                                    }
                                                </div>
                                                :
                                                <div className="d-flex align-items-center">
                                                    <StyledInput inputParam="size" placeholder="Size" setValueFunc={setSizeQuantity} type="number" errorText={errorSize} />
                                                    <button onClick={() => handleSize(sizeQuantity?.size)} className="btn btn-dark ms-2 mb-3">Add</button>
                                                </div>
                                        }
                                        <button onClick={() => SetShowAddSize(false)} className="btn btn-dark w-100 my-3">Done</button>
                                    </div>

                            }
                            <AddSizeContext.Provider value={{ sizes, setSizes, sizesQuantity, setSizesQuantity, setRefreshSort }}>
                                {
                                    refreshSort &&
                                    <div>
                                        {
                                            sizesQuantity.map((newSize, index) =>
                                                <CountButton key={index} size={newSize.size} amount={newSize.quantity} removeButton />)
                                        }
                                    </div>
                                }
                            </AddSizeContext.Provider>
                            <Error errorText={errors[7]} />
                        </div>

                        <div className="col-xl-3 mb-3">
                            <form>

                                <StyledInput inputParam="title" inputValue={editProduct?.title} placeholder="Title" setValueFunc={setProduct} type="text" errorText={errors[0]}/>
                                <StyledInput inputParam="subtitle" inputValue={editProduct?.subtitle} placeholder="SubTitle" setValueFunc={setProduct} type="text" errorText={errors[1]} />
                                <StyledInput inputParam="description" inputValue={editProduct?.description} placeholder="Description" setValueFunc={setProduct} type="textArea" errorText={errors[2]} />

                                <span>Brand: </span>
                                <select name="brand"
                                    className='form-select border-black'
                                    onChange={(e) => setProduct((prevState: any) => ({ ...prevState, brand: e.target.value }))}>
                                    {
                                        !product.brand &&
                                        <option value={undefined}></option>
                                    }
                                    {
                                        Brands.map((brand, index) =>
                                            <option key={index} value={brand}>{brand}</option>
                                        )
                                    }
                                </select>
                                <Error errorText={errors[3]} />

                                <span>Category: </span>
                                <select name="category"
                                    className='form-select border-black'
                                    onChange={(e) => setProduct((prevState: any) => ({ ...prevState, category: e.target.value }))}>
                                    {
                                        !product.category &&
                                        <option value={undefined}></option>
                                    }
                                    {
                                        Categories.map((category, index) =>
                                            <option key={index} value={category.category}>{category.category}</option>
                                        )
                                    }
                                </select>
                                <Error errorText={errors[4]} />

                                <label className='w-100'>Gender:</label>
                                <div className="d-flex">
                                    <StyledInput inputParam="gender" placeholder="Male" setValueFunc={setProduct} type="radio" id="male"/>
                                    <StyledInput inputParam="gender" placeholder="Female" setValueFunc={setProduct} type="radio" id="female" />
                                    <StyledInput inputParam="gender" placeholder="Unisex" setValueFunc={setProduct} type="radio" id="unisex"/>
                                </div>
                                <Error errorText={errors[5]} />

                                <div className="d-flex mt-4">
                                    <StyledInput inputParam="price" inputValue={editProduct?.price} placeholder="Price" setValueFunc={setProduct} type="number" errorText={errors[6]} /> <span className='fs-3'>₪</span>
                                </div>

                                <div className="w-100 mt-4">
                                    {
                                        editProduct ?
                                            <button onClick={handleEditProduct} className="btn btn-dark w-100">Update Product</button>
                                            :
                                            <button onClick={handleAddProduct} className="btn btn-dark w-100">Add Product</button>
                                    }
                                </div>
                            </form>


                        </div>
                    </div>
                </div >
        </>
    );
}

export default AddProductPage;