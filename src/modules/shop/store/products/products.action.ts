import { ProductModel } from './product.model';

export enum ProductActionType {
    Remove = 'RemoveProduct'
}

export class RemoveProductAction {
    public type = ProductActionType.Remove;
    constructor(public id: string) {}
}