import { AddOrderAction, OrderActionType } from './orders.action';
import { OrdersState, initialState } from './orders.state';
import moment from 'moment';

const OrdersReducers: {[s: string]: (state: OrdersState, action: any) => OrdersState} = {
    [OrderActionType.AddOrder]: (state, action: ReturnType<typeof AddOrderAction>): OrdersState => {
        return {
            ...state,
            orders: [
                ...state.orders,
                {
                    id: moment.utc().toString(),
                    date: moment.utc().format('YYYY-MM-DD'),
                    cartItems: action.items,
                    total: action.items.reduce((acc, it) => acc + it.amount * it.price, 0)
                }
            ]
        }
    }
}

export const OrdersReducer = (state: OrdersState = initialState, action: any): OrdersState => {
    if (OrdersReducers[action.type]) {
        try {
            const newState = OrdersReducers[action.type](state, action);
            return newState ?? state;
        } catch (error) {
            console.error({ action, error });
        }
    }
    return state;
}
