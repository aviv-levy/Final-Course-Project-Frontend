import { useContext, useEffect, useState } from "react";
import Title from "../Components/Title";
import { Product } from "../Services/Interfaces";
import { getFavoriteProducts } from "../Services/ApiService";
import ProductItem from "../Components/ProductItem";
import { UserContext } from "../App";

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
        <>
            <Title title='Favorites' />

            <div className='container-fluid my-4'>
                <div className="row row-cols-1 row-cols-md-3 mx-4 g-4">
                    {
                        Products?.map(product =>
                            <ProductItem key={product._id} product={product} />
                        )
                    }
                </div>
            </div>


        </>
    );
}

export default FavoritesPage;