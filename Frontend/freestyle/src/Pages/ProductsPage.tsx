import { useEffect, useState } from "react";
import ProductItem from "../Components/ProductItem";
import { Product } from "../Services/Interfaces";
import { getProductByCategory } from "../Services/ApiService";
import { useLocation } from "react-router-dom";
import ProductsLayout from "../Components/ProductsLayout";

function ProductsPage() {

    const [Products, setProducts] = useState<Array<Product>>();

    const location = useLocation().pathname.split('/');

    const gender = location[1]
    const category = location[2]

    useEffect(() => {
        const getProducts = async () => {
            const products = await getProductByCategory(gender, category);
            setProducts(products)
        }

        getProducts().catch((err) => {
            if (err) {
                return;
            }
        });
        // eslint-disable-next-line
    }, [])

    return (
        <ProductsLayout>
            {
                Products?.map(product =>
                    <ProductItem key={product._id} product={product} />
                )
            }
        </ProductsLayout>
    );
}

export default ProductsPage;