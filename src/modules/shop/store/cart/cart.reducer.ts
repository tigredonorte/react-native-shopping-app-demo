import { AddToCartAction, CartActionType } from './cart.action';
import { CartItemModel } from './cart.model';
import { CartState, initialState } from './cart.state';

const getStateWithTotal = (state: CartState): CartState => ({
    ...state,
    sum: Object.values(state.items).reduce((acc: number, cartItem: CartItemModel) => acc + cartItem.sum, 0)
})

const CartReducers: {[s: string]: (state: CartState, action: any) => CartState} = {
    [CartActionType.AddToCart]: (state, action: ReturnType<typeof AddToCartAction>): CartState => {

        const getItem = () => (state.items[action.product.id]) ?{
            ...state.items[action.product.id],
            amount: state.items[action.product.id].amount + 1,
            sum: (state.items[action.product.id].amount + 1) * state.items[action.product.id].price
        } : {
            id: action.product.id,
            title: action.product.title,
            price: action.product.price,
            amount: 1,
            sum: action.product.price
        }

        return getStateWithTotal({
            ...state,
            items: {
                ...state.items,
                [action.product.id]: getItem()
            }
        });
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
