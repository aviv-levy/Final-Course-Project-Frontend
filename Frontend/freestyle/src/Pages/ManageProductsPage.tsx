import { useEffect, useState } from "react";
import ProductItem from "../Components/ProductItem";
import { Product } from "../Services/Interfaces";
import { getMyProducts } from "../Services/ApiService";

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
        <div className='container-fluid my-4'>
            <div className="row row-cols-1 row-cols-md-3 mx-4 g-4">
                <ProductItem product={{} as Product} addProduct={true} />
                {
                    Products?.map(product =>
                        <ProductItem key={product._id} product={product} />
                    )
                }
            </div>
        </div>
    );
}

export default ManageProductsPage;