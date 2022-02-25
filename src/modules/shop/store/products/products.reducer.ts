import { GenericReducer } from '~utils/reduxUtilities';
import { AddProductAction, EditProductAction } from '.';
import { ProductActionType, RemoveProductAction } from './products.action';
import { initialState, ProductsState } from './products.state';

export const ProductsReducer = GenericReducer<ProductsState, any>(initialState, {
    [ProductActionType.Add]: (state, action: ReturnType<typeof AddProductAction>) => {
        const state2 = {
            ...state,
            userProducts: [
                ...state.userProducts,
                {
                    ...action.product,
                }
            ],
            availableProducts: [
                ...state.availableProducts,
                {
                    ...action.product
                }
            ]
        };
        console.log({ state2 });
        return state2;
    },
    [ProductActionType.Edit]: (state, action: ReturnType<typeof EditProductAction>) => {
        const cloneState = {...state};
        const id1 = cloneState.availableProducts.findIndex((prod) => prod.id === action.id);
        if (id1) {
            cloneState.availableProducts[id1] = action.product;
        }
        
        const id2 = cloneState.userProducts.findIndex((prod) => prod.id === action.id);
        if (id2) {
            cloneState.userProducts[id2] = action.product;
        }
        return cloneState;
    },
    [ProductActionType.Remove]: (state, action: ReturnType<typeof RemoveProductAction>) => ({
        ...state,
        userProducts: [
            ...state.userProducts.filter(prod => prod.id !== action.id)
        ],
        availableProducts: [
            ...state.availableProducts.filter(prod => prod.id !== action.id)
        ]
    })
});
