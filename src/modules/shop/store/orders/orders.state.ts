import { OrdersItemModel } from './orders.model';

export const OrdersStateName = 'Orders';

export interface OrdersState {
    orders: OrdersItemModel[];
};

export interface OrdersFullState {
    [OrdersStateName]: OrdersState;
}

export const initialState: OrdersState = {
    orders: []
}
