import { GenericReducer } from '~utils/reduxUtilities';

import {
    IAddProduct,
    IEditProduct,
    IFetchProduct,
    ProductActionType as Action,
    IRemoveProduct,
} from './products.action';
import { initialState, ProductsState } from './products.state';

export const ProductsReducer = GenericReducer<ProductsState, any>(initialState, {
    [Action.Fetch]: (state, action: IFetchProduct) => ({
        ...state,
        availableProducts: action.payload,
        userProducts: action.payload.filter(product => product.ownerId === action.userId)
    }),
    [Action.Add]: (state, action: IAddProduct) => ({
        ...state,
        userProducts: [
            { ...action.payload },
            ...state.userProducts,
        ],
        availableProducts: [
            { ...action.payload },
            ...state.availableProducts,
        ]
    }),
    [Action.Edit]: (state, action: IEditProduct) => {
        return {
            ...state,
            availableProducts: [ ...state.availableProducts.map(it => it.id === action.id ? { ...it, ...action.payload } : it) ],
            userProducts: [ ...state.userProducts.map(it => it.id === action.id ? { ...it, ...action.payload } : it) ]
        };
    },
    [Action.Remove]: (state, action: IRemoveProduct) => ({
        ...state,
        userProducts: [
            ...state.userProducts.filter(prod => prod.id !== action.id)
        ],
        availableProducts: [
            ...state.availableProducts.filter(prod => prod.id !== action.id)
        ]
    })
});
