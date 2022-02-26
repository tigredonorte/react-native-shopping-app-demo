import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creatFormBase, FormContainerComponent, FormParameters } from '~components/Form';
import { AddProductAction, EditProductAction, getUserProductById } from '~modules/shop/store/products';

import { UserRoutes, UserStackType } from '../routes';

interface EditProductInput extends NativeStackScreenProps<UserStackType, UserRoutes.EditProduct> { }

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

    const onSave = useCallback((data: any) => {
        isEditing
            ? dispatch(EditProductAction(props.route.params.id, data))
            : dispatch(AddProductAction(data));
        props.navigation.goBack();
    }, []);

    return (<FormContainerComponent isEditing={isEditing} onSave={onSave} formParameters={formParameters}/>);
};
