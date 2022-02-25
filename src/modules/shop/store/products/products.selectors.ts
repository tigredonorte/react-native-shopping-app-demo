import { ProductsFullState } from "./Products.state";

export const getProductsState = (state: ProductsFullState) => state?.Products;
export const getProducts = (state: ProductsFullState) => getProductsState(state)?.availableProducts;
export const getProductById = (id: string) => (state: ProductsFullState) => getProductsState(state)?.availableProducts?.find(it => it.id === id);
export const getUserProduct = (state: ProductsFullState) => getProductsState(state)?.userProducts;