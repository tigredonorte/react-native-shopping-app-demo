import { CartFullState, CartStateName } from "./cart.state";

export const getCartState = (state: CartFullState) => state[CartStateName];
export const getCartItems = (state: CartFullState) => getCartState(state)?.items;
export const getCartItemByProductId = (id: string) => (state: CartFullState) => getCartState(state)?.items?.[id];
export const getCartTotal = (state: CartFullState) => getCartState(state)?.sum;