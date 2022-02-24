import { CartItemModel } from './cart.model';

export const CartStateName = 'Cart';

export interface CartState {
    items: {[s: string]: CartItemModel};
    sum: number;
};

export interface CartFullState {
    [CartStateName]: CartState;
}

export const initialState: CartState = {
    items: {},
    sum: 0
}
