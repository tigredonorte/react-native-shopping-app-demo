import { GenericReducer } from '~utils/reduxUtilities';

import {
    AddProductActionType,
    EditProductActionType,
    FetchProductActionType,
    ProductActionType as Action,
    RemoveProductActionType,
} from './products.action';
import { initialState, ProductsState } from './products.state';

export const ProductsReducer = GenericReducer<ProductsState, any>(initialState, {
    [Action.Fetch]: (state, action: FetchProductActionType) => ({
        ...state,
        availableProducts: action.payload,
        userProducts: action.payload.filter(product => product.ownerId === 'u1')
    }),
    [Action.Add]: (state, action: AddProductActionType) => ({
        ...state,
        userProducts: [
            { ...action.payload, ownerId: 'u1' },
            ...state.userProducts,
        ],
        availableProducts: [
            { ...action.payload, ownerId: 'u1' },
            ...state.availableProducts,
        ]
    }),
    [Action.Edit]: (state, action: EditProductActionType) => {
        return {
            ...state,
            availableProducts: [ ...state.availableProducts.map(it => it.id === action.id ? { ...it, ...action.payload } : it) ],
            userProducts: [ ...state.userProducts.map(it => it.id === action.id ? { ...it, ...action.payload } : it) ]
        };
    },
    [Action.Remove]: (state, action: RemoveProductActionType) => ({
        ...state,
        userProducts: [
            ...state.userProducts.filter(prod => prod.id !== action.payload)
        ],
        availableProducts: [
            ...state.availableProducts.filter(prod => prod.id !== action.payload)
        ]
    })
});
