import { ProductModel } from './product.model';

export const productStateName = 'Products';

export interface ProductsState {
    availableProducts: ProductModel[];
    userProducts: ProductModel[];
};

export interface ProductsFullState {
    [productStateName]: ProductsState;
}

export const initialState: ProductsState = {
    availableProducts: [],
    userProducts: []
}
