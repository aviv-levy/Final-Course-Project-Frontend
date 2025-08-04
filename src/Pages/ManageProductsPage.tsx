import { useEffect, useState } from "react";
import ProductItem from "../Components/ProductItem";
import { Product } from "../Services/Interfaces";
import { getMyProducts } from "../Services/ApiService";
import ProductsLayout from "../Components/ProductsLayout";

function ManageProductsPage() {

    const [Products, setProducts] = useState<Array<Product>>();

    useEffect(() => {
        const getProducts = async () => {
            const products = await getMyProducts();
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
            <ProductItem product={{} as Product} addProduct={true} />
            {
                Products?.map(product =>
                    <ProductItem key={product._id} product={product} />
                )
            }
        </ProductsLayout>
    );
}

export default ManageProductsPage;