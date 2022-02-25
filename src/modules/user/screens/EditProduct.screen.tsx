import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creatFormBase, FormContainerComponent, FormParameters } from '~components/Form';
import { ProductRoutes, ProductStackType } from '~modules/shop/routes/ProductsNavigator.types';
import { AddProductAction, EditProductAction, getUserProductById } from '~modules/shop/store/products';

import { UserRoutes, UserStackType } from '../routes';

interface EditProductInput extends NativeStackScreenProps<UserStackType & ProductStackType, UserRoutes.EditProduct> { }

export const EditProductScreen: FunctionComponent<EditProductInput> = (props) => {

    const isEditing = !!props.route.params?.id;
    const userProduct = useSelector(getUserProductById(props.route.params?.id));
    const dispatch = useDispatch();
    useEffect(() => {
        props.navigation.setOptions({ title: isEditing ? `Edit ${props.route.params.title}` : 'Add Product' });
    }, []);

    const formParameters: FormParameters = [
        creatFormBase({
            key: 'title',
            value: userProduct?.title || '',
            formType: 'text',
            title: "Title"
        }),
        creatFormBase({
            key: 'imageUrl',
            value: userProduct?.imageUrl || '',
            formType: 'text',
            title: "Image"
        }),
        creatFormBase({
            key: 'price',
            value: userProduct?.price,
            editable: false,
            formType: 'decimal',
            title: "Price"
        }),
        creatFormBase({
            key: 'description',
            value: userProduct?.description || '',
            formType: 'textArea',
            title: "Description"
        }),
    ];

    const onSave = (data: any) => {
        const id = Math.floor(Math.random() * 1000000);
        isEditing
            ? dispatch(EditProductAction(props.route.params?.id, data))
            : dispatch(AddProductAction({ ...data, id }));
            
        props.navigation.navigate(ProductRoutes.ProductDetails, { 
            product: { 
                id: props.route.params?.id ?? id, 
                title: data.title
            } 
        });
    }

    return <FormContainerComponent isEditing={isEditing} onSave={onSave} formParameters={formParameters}/>;
};
