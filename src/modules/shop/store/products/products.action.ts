import { mapObjIndexed, values } from 'ramda';
import { ThunkDispatch } from 'redux-thunk';
import env from '~environments';
import { ProductsState } from './products.state';
import { ProductModel } from './product.model';

export enum ProductActionType {
    Fetch = 'FetchProduct',
    Remove = 'RemoveProduct',
    Add = 'AddProduct',
    Edit = 'EditProduct',
}

export interface IFetchProduct { type: ProductActionType.Fetch; payload: ProductModel[]; userId: string; }
export const FetchProductAction = () => {
    return async(dispatch: ThunkDispatch<ProductsState, any, IFetchProduct>, getState: () => any): Promise<void> => {
        try {
            const userId = getState()?.Auth?.user?.id;
            const token = getState()?.Auth?.token;
            const resp = await fetch(`${env.serviceUrl}/products.json?auth=${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if(!resp.ok) {
                throw new Error('Error retrieving products');
            }
    
            const resData = await resp.json();
            const payload = values(mapObjIndexed((product: ProductModel, id: string) => ({ ...product, id }), resData));
    
            dispatch({ type: ProductActionType.Fetch, payload, userId });
        } catch (error) {
            throw error;
        }
    };
}

export interface IAddProduct { type: ProductActionType.Add; payload: ProductModel; }
export const AddProductAction = (product: ProductModel) => {
    return async(dispatch: ThunkDispatch<ProductsState, any, IAddProduct>, getState: () => any): Promise<void> => {
        try {
            const token = getState()?.Auth?.token;
            const userId = getState()?.Auth?.user?.id;
            product.ownerId = userId;
            const resp = await fetch(`${env.serviceUrl}/products.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            
            const resData = await resp.json();
            if(!resp.ok) {
                throw new Error('Error adding product');
            }
    
            dispatch({ type: ProductActionType.Add, payload: { ...product, id: resData.name } });
    
        } catch (error) {
            throw error;
        }
    }
}

export interface IEditProduct { type: ProductActionType.Edit, payload: ProductModel, id: string; }
export const EditProductAction = (id: string, product: ProductModel) => {
    return async(dispatch: ThunkDispatch<ProductsState, any, IEditProduct>, getState: () => any): Promise<void> => {
        try {
            const token = getState()?.Auth?.token;
            const resp = await fetch(`${env.serviceUrl}/products/${id}.json?auth=${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
        
            if(!resp.ok) {
                throw new Error('Error editing product');
            }
    
            const resData = await resp.json();
        
            dispatch({ type: ProductActionType.Edit, payload: { ...resData, id }, id });
        } catch (error) {
            throw error;
        }
    };
}

export interface IRemoveProduct { type: ProductActionType.Remove, id: string; }
export const RemoveProductAction = (id: string) => {
    return async(dispatch: ThunkDispatch<ProductsState, any, IRemoveProduct>, getState: () => any): Promise<void> => {
        try {
            const token = getState()?.Auth?.token;
            const resp = await fetch(`${env.serviceUrl}/products/${id}.json?auth=${token}`, {
                method: 'DELETE'
            });

            if(!resp.ok) {
                throw new Error(`Error removing product with id ${id}`);
            }

            dispatch({ type: ProductActionType.Remove, id });
        } catch (error) {
            throw error;
        }
    };;
}
