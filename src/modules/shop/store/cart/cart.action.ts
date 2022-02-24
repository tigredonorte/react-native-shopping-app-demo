import { ProductModel } from "../products/product.model";

export enum CartActionType {
    AddToCart = 'AddToCart',
}

export const AddToCartAction = (product: ProductModel) => ({ type: CartActionType.AddToCart, product });