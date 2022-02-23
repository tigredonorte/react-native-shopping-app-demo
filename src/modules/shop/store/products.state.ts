import { ProductMocks } from './data/dummy-data';
import { ProductModel } from './model/product.model';

export const productStateName = 'Products';

export interface ProductsState {
    availableProducts: ProductModel[];
    userProducts: ProductModel[];
};

export interface ProductsFullState {
    [productStateName]: ProductsState;
}

export const initialState: ProductsState = {
    availableProducts: ProductMocks,
    userProducts: ProductMocks.filter(prod => prod.ownerId === 'u1')
}
