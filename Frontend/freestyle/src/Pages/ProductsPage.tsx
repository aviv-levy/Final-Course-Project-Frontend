import Product from "../Components/Product";

function ProductsPage() {
    return (

        <div className='d-flex justify-content-center mb-4'>
            <div className="row row-cols-1 row-cols-md-4 container-fluid g-4">
                <Product title="Test" subtitle="subTest" price={169} img="https://media.terminalx.com/pub/media/banners/2023July26500/MEN_DESK_260723_P1.jpg" />
                <Product title="Test" subtitle="subTest" price={169} img="https://cdn.pixabay.com/photo/2023/07/24/01/31/plane-8145957_1280.jpg" />
            </div>
        </div>
    );
}

export default ProductsPage;