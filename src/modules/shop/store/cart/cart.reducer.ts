import { AddToCartAction, CartActionType, RemoveFromCartAction } from './cart.action';
import { CartItemModel } from './cart.model';
import { CartState, initialState } from './cart.state';

const getStateWithTotal = (state: CartState): CartState => ({
    ...state,
    sum: Object.values(state.items).reduce((acc: number, cartItem: CartItemModel) => acc + cartItem.sum, 0)
})

const CartReducers: {[s: string]: (state: CartState, action: any) => CartState} = {
    [CartActionType.AddToCart]: (state, action: ReturnType<typeof AddToCartAction>): CartState => {

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
                }
            }
        }

        delete items[id];
        return {
            ...state, 
            items: {...items},
            sum: state.sum - action.item.price
        };
    }
}

export const CartReducer = (state: CartState = initialState, action: any): CartState => {
    if (CartReducers[action.type]) {
        try {
            const newState = CartReducers[action.type](state, action);
            return newState ?? state;
        } catch (error) {
            console.error({ action, error });
        }
    }
    return state;
}
