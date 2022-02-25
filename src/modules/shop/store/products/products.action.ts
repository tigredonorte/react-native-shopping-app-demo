import { ProductModel } from ".";

export enum ProductActionType {
    Remove = 'RemoveProduct',
    Add = 'AddProduct',
    Edit = 'EditProduct',
}

export const RemoveProductAction = (id: string) => ({ type: ProductActionType.Remove, id });
export const AddProductAction = (product: ProductModel) => ({ type: ProductActionType.Remove, product });
export const EditProductAction = (id: string, product: ProductModel) => ({ type: ProductActionType.Remove, id, product });
