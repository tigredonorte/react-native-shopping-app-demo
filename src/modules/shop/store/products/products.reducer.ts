import { GenericReducer } from '~utils/reduxUtilities';
import { ProductActionType, RemoveProductAction } from './products.action';
import { initialState, ProductsState } from './products.state';

export const ProductsReducer = GenericReducer<ProductsState, any>(initialState, {
    [ProductActionType.Remove]: (state, action: RemoveProductAction) => ({
        ...state,
        userProducts: [
            ...state.userProducts.filter(prod => prod.id === action.id)
        ],
        availableProducts: [
            ...state.availableProducts.filter(prod => prod.id === action.id)
        ]
    })
});
