import { CartItemModel } from "../cart/cart.model";

export interface OrdersItemModel {
    id: string;
    date: string;
    cartItems: CartItemModel[];
    total: number;
}
