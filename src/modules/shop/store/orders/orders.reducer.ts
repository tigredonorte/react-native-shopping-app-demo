import { AddOrderAction, OrderActionType } from './orders.action';
import { OrdersState, initialState } from './orders.state';
import moment from 'moment';
import { GenericReducer } from '~utils/reduxUtilities';


export const OrdersReducer = GenericReducer<OrdersState, any>(initialState, {
    [OrderActionType.AddOrder]: (state, action: ReturnType<typeof AddOrderAction>) => ({
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
    })
});
