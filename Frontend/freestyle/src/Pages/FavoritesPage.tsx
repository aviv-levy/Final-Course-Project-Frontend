import { useContext, useEffect, useState } from "react";
import { Product } from "../Services/Interfaces";
import { getFavoriteProducts } from "../Services/ApiService";
import ProductItem from "../Components/ProductItem";
import { UserContext } from "../App";
import ProductsLayout from "../Components/ProductsLayout";

function FavoritesPage() {


    const [Products, setProducts] = useState<Array<Product>>();
    const userDetails = useContext(UserContext);

    useEffect(() => {
        const getProducts = async () => {
            const products = await getFavoriteProducts();
            setProducts(products)
        }

        getProducts().catch((err) => {
            if (err) {
                return;
            }
        });
        // eslint-disable-next-line
    }, [userDetails?.userDetails?.favoriteProducts])

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

export default FavoritesPage;