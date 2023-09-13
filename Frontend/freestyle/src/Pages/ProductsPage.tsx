import { useEffect, useState } from "react";
import ProductItem from "../Components/ProductItem";
import { Product } from "../Services/Interfaces";
import { getProductByCategory } from "../Services/ApiService";
import { useLocation } from "react-router-dom";

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
        <div className='container-fluid my-4'>
            <div className="row row-cols-1 row-cols-md-4 mx-4 g-4">
                {
                    Products?.map(product =>
                        <ProductItem key={product._id} id={product._id} title={product.title} subtitle={product.subtitle} price={product.price} img={product.img} />
                    )
                }
            </div>
        </div>
    );
}

export default ProductsPage;