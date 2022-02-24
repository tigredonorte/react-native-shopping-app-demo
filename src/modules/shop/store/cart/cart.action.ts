import { ProductModel } from "../products/product.model";
import { CartItemModel } from "./cart.model";

export enum CartActionType {
    AddToCart = 'AddToCart',
    RemoveFromCart = 'RemoveFromCart',
}

export const AddToCartAction = (product: ProductModel) => ({ type: CartActionType.AddToCart, product });
export const RemoveFromCartAction = (item: CartItemModel) => ({ type: CartActionType.RemoveFromCart, item });