import { initialState, ProductsState } from './products.state';

const ProductsReducers: {[s: string]: (state: ProductsState, action: any) => ProductsState } = {
    
};

export const ProductsReducer = (state: ProductsState = initialState, action: any): ProductsState => {
    if (ProductsReducers[action.type]) {
        try {
            const newState = ProductsReducers[action.type](state, action);
            return newState ?? state;
        } catch (error) {
            console.error({ action, error });
        }
    }
    return state;
}
