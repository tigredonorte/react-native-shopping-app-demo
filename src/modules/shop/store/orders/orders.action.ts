import moment from 'moment';
import { mapObjIndexed, values } from 'ramda';
import { ThunkDispatch } from 'redux-thunk';
import env from '~environments';

import { CartItemModel } from '../cart/cart.model';
import { OrdersItemModel } from './orders.model';
import { OrdersState } from './orders.state';

const url = `${env.serviceUrl}/orders`;
const user = 'u1';
export enum OrderActionType {
    Add = 'AddOrder',
    Fetch = 'FetchOrder',
}

export interface IFetchOrder { 
    type: OrderActionType.Fetch,
    payload: OrdersItemModel[]
}
export const FetchOrderAction = () => {
    return async(dispatch: ThunkDispatch<OrdersState, any, IFetchOrder>): Promise<void> => {
        try {
            const resp = await fetch(`${url}/${user}.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if(!resp.ok) {
                throw new Error('Error retrieving orders');
            }

            const resData = await resp.json();
            const payload = values(mapObjIndexed((order: OrdersItemModel, id: string) => ({ ...order, id }), resData));

            dispatch({ type: OrderActionType.Fetch, payload });
        } catch (error) {
            throw error;
        }
    }
}

export interface IAddOrder { 
    type: OrderActionType.Add, 
    order: OrdersItemModel
}
export const AddOrderAction = (items: CartItemModel[]) => {
    return async(dispatch: ThunkDispatch<OrdersState, any, IAddOrder>): Promise<void> => {
        try {
            const order = {
                date: moment.utc().format('YYYY-MM-DD'),
                cartItems: items,
                total: items.reduce((acc, it) => acc + it.amount * it.price, 0)
            };
            const resp = await fetch(`${url}/${user}.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
            
            if(!resp.ok) {
                throw new Error('Error saving order!');
            }
    
            const resData = await resp.json();
    
            dispatch({ 
                type: OrderActionType.Add, 
                order: { ...order, id: resData.name } 
            });
    
        } catch (error) {
            throw error;
        }
    };
}
