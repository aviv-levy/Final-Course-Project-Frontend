import {useEffect, useState } from "react";
import '../CSS/Product.css'
import { Product } from "../Services/Interfaces";
import { getProductById } from "../Services/ApiService";
import { useParams } from "react-router-dom";
import ViewProduct from "../Components/ViewProduct";

function ProductPage() {

    const [product, setProduct] = useState<Product>({} as Product);
    const [isLoading, setIsLoading] = useState(true);
    const { productId } = useParams();

    //Get Product details when page initialize
    useEffect(() => {
        const getProduct = async () => {
            const Product = await getProductById(productId);
            setProduct(Product)
            setIsLoading(false);
        }

        getProduct().catch((err) => {
            if (err) {
                return;
            }
        });
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {
                !isLoading &&
                <ViewProduct product={product} />
            }
        </>
    );
}

export default ProductPage;