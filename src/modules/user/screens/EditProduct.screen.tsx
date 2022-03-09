import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { creatFormBase, FormContainerComponent, FormParameters, ValidateMaxLength, ValidateMaxValue, ValidateMinLength, ValidateMinValue, ValidateRequired, ValidateUrl } from '~components/Form';
import { AddProductAction, EditProductAction, getUserProductById } from '~modules/shop/store/products';
import { NotificationService } from '~utils/notification.service';

import { UserRoutes, UserStackType } from '../routes';

interface EditProductInput extends NativeStackScreenProps<UserStackType, UserRoutes.EditProduct> { }

export const EditProductScreen: FunctionComponent<EditProductInput> = (props) => {

    const [ isSaving, setIsSaving ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState<string>();
    const isEditing = !!props.route.params?.id;
    const userProduct = useSelector(getUserProductById(props.route.params?.id ?? ''));
    const dispatch = useDispatch();
    useEffect(() => {
        const init = async() => {
            if (!await NotificationService.askForPermission()) {
                Alert.alert(
                    'Push notifications error', 
                    "If you not allow us to perform push notifications, you'll never know when someone buy your products", 
                    [{ text: 'ok' }]
                );
            }
        }
        init();
        props.navigation.setOptions({ title: isEditing ? `Edit ${props.route.params?.title ?? ''}` : 'Add Product' });
    }, []);

    useEffect(() => {
        if (errorMessage) {
            Alert.alert('An error ocurred!', errorMessage, [{ text: 'ok' }]);
        }
    }, [ errorMessage ]);

    const onSave = useCallback(async(data: any) => {
        try {
            console.log('@@##', { data });
            setErrorMessage(undefined);
            setIsSaving(true);
            isEditing
                ? await dispatch(EditProductAction(props?.route?.params?.id ?? '', data))
                : await dispatch(AddProductAction(data));
            props.navigation.goBack();
        } catch (error: any) {
            setErrorMessage(error.message);
        }
        setIsSaving(false);
    }, [ setIsSaving, setErrorMessage ]);

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
                ValidateMinLength(40),
            ],
        }),
    ];

    return (
        <FormContainerComponent
            isEditing={isEditing}
            onSave={onSave}
            formParameters={formParameters}
            isSaving={isSaving}
            buttonText="Save"
        />
    );
};
