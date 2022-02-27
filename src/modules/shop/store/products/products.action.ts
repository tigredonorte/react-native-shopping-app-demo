import { mapObjIndexed, values } from 'ramda';
import { ThunkDispatch } from 'redux-thunk';
import env from '~environments';
import { ProductsState } from '.';
import { ProductModel } from './product.model';

export enum ProductActionType {
    Fetch = 'FetchProduct',
    Remove = 'RemoveProduct',
    Add = 'AddProduct',
    Edit = 'EditProduct',
}

interface Action<PayloadType> { 
    type: ProductActionType, 
    payload: PayloadType
};

type DispatchType<PayloadType> = ThunkDispatch<ProductsState, void, Action<PayloadType>>;

export interface FetchProductActionType extends Action<ProductModel[]> { }
export const FetchProductAction = () => async(dispatch: DispatchType<ProductModel[]>): Promise<void> => {
    try {
        const resp = await fetch(`${env.serviceUrl}/products.json`, {
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

        dispatch({ type: ProductActionType.Fetch, payload });
    } catch (error) {
        throw error;
    }
}

export interface AddProductActionType extends Action<ProductModel> { }
export const AddProductAction = (product: ProductModel) => async(dispatch: DispatchType<ProductModel>): Promise<void> => {
    try {
        const resp = await fetch(`${env.serviceUrl}/products.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        
        if(!resp.ok) {
            throw new Error('Error adding product' + JSON.stringify(product));
        }

        const resData = await resp.json();
        dispatch({ type: ProductActionType.Add, payload: { ...product, id: resData.name, ownerId: 'u1' } });

    } catch (error) {
        throw error;
    }
}

export interface EditProductActionType extends Action<ProductModel> { id: string; }
export const EditProductAction = (id: string, product: ProductModel) => async(dispatch: DispatchType<EditProductActionType>): Promise<void> => {
    try {
        const resp = await fetch(`${env.serviceUrl}/products/${id}.json`, {
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

export interface RemoveProductActionType extends Action<string> {}
export const RemoveProductAction = (id: string) => async(dispatch: DispatchType<string>): Promise<void> => {
    try {
        const resp = await fetch(`${env.serviceUrl}/products/${id}.json`, {
            method: 'DELETE'
        });

    
        if(!resp.ok) {
            throw new Error(`Error removing product with id ${id}`);
        }

        dispatch({ type: ProductActionType.Remove, payload: id });
    } catch (error) {
        throw error;
    }
};
