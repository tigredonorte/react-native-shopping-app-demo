import { ProductModel } from './product.model';

export enum ProductActionType {
    Remove = 'RemoveProduct',
    Add = 'AddProduct',
    Edit = 'EditProduct',
}

export const RemoveProductAction = (id: string) => ({ type: ProductActionType.Remove, id });
export const AddProductAction = (product: ProductModel) => ({ type: ProductActionType.Add, product });
export const EditProductAction = (id: string, product: ProductModel) => ({ type: ProductActionType.Edit, id, product });


export type ProductActionTypes = ReturnType<typeof RemoveProductAction> 
    | ReturnType<typeof AddProductAction> 
    | ReturnType<typeof EditProductAction>;
