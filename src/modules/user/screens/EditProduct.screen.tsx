import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creatFormBase, FormContainerComponent, FormParameters, ValidateMaxLength, ValidateMaxValue, ValidateMinLength, ValidateMinValue, ValidateRequired, ValidateUrl } from '~components/Form';
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
            title: "Title",
            validationFn: [
                ValidateRequired,
                ValidateMinLength(2),
                ValidateMaxLength(20),
            ],
            extraParams: {
                autoCapitalize: 'sentences',
                autoCorrect: true
            }
        }),
        creatFormBase({
            key: 'imageUrl',
            value: userProduct?.imageUrl || '',
            formType: 'url',
            title: "Image",
            validationFn: [
                ValidateRequired,
                ValidateUrl,
            ],
        }),
        creatFormBase({
            key: 'price',
            value: userProduct?.price,
            editable: false,
            formType: 'decimal',
            title: "Price",
            validationFn: [
                ValidateRequired,
                ValidateMinValue(0),
                ValidateMaxValue(100000)
            ],
        }),
        creatFormBase({
            key: 'description',
            value: userProduct?.description || '',
            formType: 'textArea',
            title: "Description",
            extraParams: {
                autoCorrect: true
            },
            validationFn: [
                ValidateRequired,
                ValidateMinLength(100),
            ],
        }),
    ];

    const onSave = useCallback((data: any) => {
        isEditing
            ? dispatch(EditProductAction(props.route.params.id, data))
            : dispatch(AddProductAction(data));
        props.navigation.goBack();
    }, []);

    return (<FormContainerComponent isEditing={isEditing} onSave={onSave} formParameters={formParameters} />);
};
