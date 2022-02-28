import { IAddOrder, IFetchOrder, OrderActionType as Action } from './orders.action';
import { OrdersState, initialState } from './orders.state';
import { GenericReducer } from '~utils/reduxUtilities';

export const OrdersReducer = GenericReducer<OrdersState, any>(initialState, {
    [Action.Fetch]: (state, action: IFetchOrder) => ({
        ...state,
        orders: action.payload,
    }),
    [Action.Add]: (state, action: IAddOrder) => ({
        ...state,
        orders: state.orders.concat(action.order)
    })
});
