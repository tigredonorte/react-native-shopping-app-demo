import { ProductMocks } from './data/dummy-data';
import { ProductModel } from './model/product.model';

export interface ProductsState {
    availableProducts: ProductModel[];
    userProducts: ProductModel[];
};

export const initialState: ProductsState = {
    availableProducts: ProductMocks,
    userProducts: ProductMocks.filter(prod => prod.ownerId === 'u1')
}
