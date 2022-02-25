import { CartItemModel } from '../cart/cart.model';

export enum OrderActionType {
    AddOrder = 'AddOrder'
}

export const AddOrderAction = (items: CartItemModel[]) => ({ type: OrderActionType.AddOrder, items });