import { OrdersFullState, OrdersStateName } from "./auth.state";

export const getOrdersState = (state: OrdersFullState) => state[OrdersStateName];
export const getOrdersItems = (state: OrdersFullState) => getOrdersState(state)?.orders;