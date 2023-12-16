import { OrderHistory } from "../Services/Interfaces";

export function totalBilled(order: OrderHistory): number {

    let sum: number = 0;

    order.products.map(product => {
        sum += product.product.price * product.sizeQuantity.quantity;
    })

    return sum;
}