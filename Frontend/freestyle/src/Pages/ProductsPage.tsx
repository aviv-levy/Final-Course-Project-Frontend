import { useEffect, useState } from "react";
import ProductItem from "../Components/ProductItem";
import { Product } from "../Services/Interfaces";

function ProductsPage() {

    const [Products, setProducts] = useState<Array<Product>>();

    useEffect(()=>{
        
    },[])

    return (
        <div className='d-flex justify-content-center mb-4'>
            <div className="row row-cols-1 row-cols-md-4 container-fluid g-4">
                {
                    Products?.map(product =>
                        <ProductItem title={product.title} subtitle={product.subtitle} price={product.price} img={product.imageUrl} />
                    )
                }
                <ProductItem title="Test" subtitle="subTest" price={169} img="https://media.terminalx.com/pub/media/banners/2023July26500/MEN_DESK_260723_P1.jpg" />
                <ProductItem title="Test" subtitle="subTest" price={169} img="https://cdn.pixabay.com/photo/2023/07/24/01/31/plane-8145957_1280.jpg" />
            </div>
        </div>
    );
}

export default ProductsPage;