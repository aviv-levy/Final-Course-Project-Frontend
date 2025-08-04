import { useEffect, useState } from "react";
import ProductItem from "../Components/ProductItem";
import { Product } from "../Services/Interfaces";
import { getProductByCategory } from "../Services/ApiService";
import { useLocation } from "react-router-dom";
import ProductsLayout from "../Components/ProductsLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function ProductsPage() {

    const [Products, setProducts] = useState<Array<Product>>([]);
    const [filteredProducts, setFilteredProducts] = useState<Array<Product>>();
    const [search, setSearch] = useState('');

    const location = useLocation().pathname.split('/');

    const gender = location[1]
    const category = location[2]

    // Api request for products
    useEffect(() => {
        const getProducts = async () => {
            const products = await getProductByCategory(gender, category);
            setFilteredProducts(products);
            setProducts(products);
        }

        getProducts().catch((err) => {
            if (err) {
                return;
            }
        });
        // eslint-disable-next-line
    }, [])

    //Search Hook when to filter cards when user write in search input.
    useEffect(() => {
        const copyProducts = [...Products];
        const filter = copyProducts.filter(product =>
            product.title.toLocaleLowerCase().includes(search))
        search === '' ? setFilteredProducts(copyProducts) : setFilteredProducts(filter)
        // eslint-disable-next-line
    }, [search])

    return (
        <>
            <div className="ms-5 form-group has-search  mt-4">
                <span className="fa fa-search form-control-feedback"><FontAwesomeIcon icon={faSearch} /></span>
                <input
                    type="text"
                    className="form-control w-75"
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)} />
            </div >
            <ProductsLayout>
                {
                    filteredProducts?.map(product =>
                        <ProductItem key={product._id} product={product} />
                    )
                }
            </ProductsLayout>
        </>
    );
}

export default ProductsPage;