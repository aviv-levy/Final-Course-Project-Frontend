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
            <div className="row row-cols-1 row-cols-md-4 mx-4 g-4">
                {
                    Products?.map(product =>
                        <ProductItem key={product._id} title={product.title} subtitle={product.subtitle} price={product.price} img={product.img} />
                    )
                }
                <ProductItem title="" subtitle="" price={0} addProduct={true} />
            </div>
        </div>
    );
}

export default ManageProductsPage;