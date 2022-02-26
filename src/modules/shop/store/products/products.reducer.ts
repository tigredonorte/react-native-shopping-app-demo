import { GenericReducer } from '~utils/reduxUtilities';
import { ProductActionTypes } from '.';
import { ProductActionType as Action, RemoveProductAction, AddProductAction, EditProductAction } from './products.action';
import { initialState, ProductsState } from './products.state';

export const ProductsReducer = GenericReducer<ProductsState, ProductActionTypes>(initialState, {
    [Action.Add]: (state, action: ReturnType<typeof AddProductAction>) => {
        const id = Math.floor(Math.random() * 1000000).toString();
        return {
            ...state,
            userProducts: [
                { ...action.product, ownerId: 'u1', id },
                ...state.userProducts,
            ],
            availableProducts: [
                { ...action.product, ownerId: 'u1', id },
                ...state.availableProducts,
            ]
        };
    },
    [Action.Edit]: (state, action: ReturnType<typeof EditProductAction>) => {
        return {
            ...state,
            availableProducts: [ ...state.availableProducts.map(it => it.id === action.id ? { ...it, ...action.product } : it) ],
            userProducts: [ ...state.userProducts.map(it => it.id === action.id ? { ...it, ...action.product } : it) ]
        };
    },
    [Action.Remove]: (state, action: ReturnType<typeof RemoveProductAction>) => ({
        ...state,
        userProducts: [
            ...state.userProducts.filter(prod => prod.id !== action.id)
        ],
        availableProducts: [
            ...state.availableProducts.filter(prod => prod.id !== action.id)
        ]
    })
});
