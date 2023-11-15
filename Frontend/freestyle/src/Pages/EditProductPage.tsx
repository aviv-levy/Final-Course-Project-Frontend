import { useParams } from "react-router-dom";
import { Product } from "../Services/Interfaces";
import { useContext, useEffect, useState } from "react";
import { getProductById } from "../Services/ApiService";
import { LoadingContext } from "../App";
import AddProductPage from "./AddProductPage";

function EditProductPage() {

    const [product, setProduct] = useState<Product>();
    const loading = useContext(LoadingContext);

    const { productId } = useParams();

    //Get Product details when page initialize
    useEffect(() => {
        loading?.setIsLoading(true);
        const getProduct = async () => {
            const Product = await getProductById(productId);
            setProduct(Product)
            
            loading?.setIsLoading(false);
        }

        getProduct().catch((err) => {
            if (err) {
                return;
            }
        });
        // eslint-disable-next-line
    }, [])
    return (
        <div>
        {
            !loading?.isLoading &&
            <AddProductPage editProduct={product} />
        }
        </div>

    );
}

export default EditProductPage;