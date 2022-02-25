import { GenericReducer } from '~utils/reduxUtilities';
import { ProductActionType, RemoveProductAction } from '../products';

import { AddToCartAction, CartActionType, ClearCartAction, RemoveFromCartAction } from './cart.action';
import { CartState as State, initialState } from './cart.state';

export const CartReducer = GenericReducer<State, any>(initialState, {
    [CartActionType.AddToCart]: (state, action: ReturnType<typeof AddToCartAction>) => {
        const getItem = () => (state.items[action.product.id]) ? {
            ...state.items[action.product.id],
            amount: state.items[action.product.id].amount + 1,
            sum: (state.items[action.product.id].sum + action.product.price)
        } : {
            id: action.product.id,
            title: action.product.title,
            price: action.product.price,
            amount: 1,
            sum: action.product.price
        }

        return {
            ...state,
            items: {
                ...state.items,
                [action.product.id]: getItem()
            },
            sum: state.sum + action.product.price
        };
    },
    [CartActionType.ClearCart]: (state, action: ReturnType<typeof ClearCartAction>) => {
        return initialState;
    },
    [CartActionType.RemoveFromCart]: (state, action: ReturnType<typeof RemoveFromCartAction>) => {
        const items = { ...state.items };
        const id = action.item.id;
        if (items[id].amount > 1) {
            return {
                ...state,
                items: {
                    ...items,
                    [id]: {
                        ...items[id],
                        amount: items[id].amount - 1,
                        sum: (items[id].sum - action.item.price)
                    }
                },
                sum: state.sum - action.item.price
            }
        }

        delete items[id];
        return {
            ...state, 
            items: {...items},
            sum: state.sum - action.item.price
        };
    },

    [ProductActionType.Remove]: (state, action: ReturnType<typeof RemoveProductAction>) => {
        if (!state.items[action.id]) {
            return state;
        }
        const items = { ...state.items };
        const sum = items[action.id].sum;
        delete items[action.id];
        return {
            ...state, 
            items: {...items},
            sum: state.sum - sum
        };
    }
});
