import CartProduct from "../Components/CartProduct";
import Title from "../Components/Title";

function CartPage() {
    return (
        <>
            <Title title='Cart' />

            <CartProduct title="Flower" subTitle="Amazing one!" price={450} img="https://cdn.pixabay.com/photo/2023/08/17/17/03/dahlia-8197027_1280.jpg"/>
            <CartProduct title="Flower" subTitle="Amazing one!" price={450}  img="https://cdn.pixabay.com/photo/2023/07/24/01/31/plane-8145957_1280.jpg"/>
        </>
    );
}

export default CartPage;