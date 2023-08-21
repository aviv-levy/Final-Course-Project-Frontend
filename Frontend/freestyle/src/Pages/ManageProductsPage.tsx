import { useState } from "react";
import '../CSS/ManageProducts.css'
import CountButton from "../Components/CountButton";
import { fileToBase64 } from "../Utils/fileToString";
import { Product, SizeQuantity } from "../Services/Interfaces";


function ManageProductsPage() {


    const [product, setProduct] = useState<Product>();
    const [uploadedImg, setUploadedImg] = useState('');
    const [sizesQuantity, setSizesQuantity] = useState<Array<SizeQuantity>>();
    const [showAddSize, SetShowAddSize] = useState(false);

    async function fileRecieved(file: File) {
        setUploadedImg(await fileToBase64(file))
    }

    function handleClick() {

    }

    function handleClear() {
        setUploadedImg('');
    }

    return (
        <div className="container my-5">
            <div className="row d-flex">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
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
                            <img src={uploadedImg} alt="" className='img-thumbnail' />
                    }
                    <div className="w-100 text-center mt-4">
                        <button onClick={handleClear} className='btn btn-dark px-4 me-1'>Clear</button>
                        <button onClick={handleClick} className='btn btn-dark px-4 ms-1'>Upload</button>
                    </div>
                </div>

                <div className="col-3">
                    <form>

                        <span>Brand: </span>
                        <select name="brand" className='form-select border-black'>
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
                        <select name="category" className='form-select border-black'>
                            <option value="Shirts">Shirts</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Pants">Pants</option>
                            <option value="Dresses">Dresses</option>
                            <option value="Tops">Tops</option>
                            <option value="Underwear">Underwear</option>
                        </select>


                        <label className='w-100'>Gender:</label>
                        <input type="radio" name='gender' id='male' className="form-check-input border-dark-subtle" />
                        <label className="form-check-label me-3" htmlFor="male">Male</label>

                        <input type="radio" name='gender' id='female' className="form-check-input border-dark-subtle" />
                        <label className="form-check-label me-3" htmlFor="female">Female</label>

                        <input type="radio" name='gender' id='unisex' className="form-check-input border-dark-subtle" />
                        <label className="form-check-label" htmlFor="unisex">Unisex</label>

                        <label className='w-100'>Title:</label>
                        <input type="text" className="form-control border-dark" />

                        <label className='w-100'>SubTitle:</label>
                        <input type="text" className="form-control border-dark" />

                        <label className='w-100'>Description:</label>
                        <textarea className="form-control border-dark" aria-label="With textarea"></textarea>


                        <label className='w-100'>Price:</label>
                        <div className="d-flex">
                            <input type="number" className="form-control border-dark" /> <span className='fs-3'>₪</span>
                        </div>

                        <div className="w-100 mt-4">
                            <button className="btn btn-dark w-100">Add Product</button>
                        </div>
                    </form>


                </div>
                <div className="col-3 mt-3">
                    <CountButton size="L" />
                    {
                        !showAddSize ?
                            <div onClick={() => SetShowAddSize(true)} className="add-newSize fs-5 p-2 d-flex align-items-center"><div className="add-newSizePlus badge fs-5 p-1 pt-0 mx-2">+</div>Add New Size</div>
                            :
                            <div>
                                {
                                    sizesQuantity?.map(newSize =>
                                        <CountButton size={newSize.size} />)
                                }
                                <button className="btn btn-outline-dark me-2" >XS</button>
                                <button className="btn btn-outline-dark me-2">S</button>
                                <button className="btn btn-outline-dark me-2">M</button>
                                <button className="btn btn-outline-dark me-2">L</button>
                                <button className="btn btn-outline-dark me-2">XL</button>
                                <button className="btn btn-outline-dark me-2">XXL</button>
                            </div>

                    }
                </div>
            </div>
        </div>
    );
}

export default ManageProductsPage;