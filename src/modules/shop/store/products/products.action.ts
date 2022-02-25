export enum ProductActionType {
    Remove = 'RemoveProduct'
}

export const RemoveProductAction = (id: string) => ({ type: ProductActionType.Remove, id });
