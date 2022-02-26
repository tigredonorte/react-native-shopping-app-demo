import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { FormErrorComponent } from './ErrorComponent';
import { FormItemType, FormState, InputType } from '../model/FormFieldModel';
import { checkValidity, initField } from '../model/FormItemFunctions';

interface FormItemInput {
    formItem: FormItemType;
    isEditing: boolean;
    updateFormItem: (value: FormItemType) => void;
}

export const FormItem = (props: FormItemInput) => {
    
    const [ field, setField ] = useState<{value: any, validityState: FormState}>(initField(props.formItem));
    const onChangeText = (data: any) => setField({
        value: data,
        validityState: checkValidity(props.formItem.validationFn, data)
    });

    const onEndEditing = () => {
        props.updateFormItem({ 
            ...props.formItem, 
            valid: field.validityState.valid,
            value: field.value
        });
    }

    const extraParams = { ...InputType[props.formItem.formType], ...props.formItem?.extraParams };
    return (
        (!props.isEditing || (props.isEditing && props.formItem.editable))
            ? <>
                <View style={Styles.formItem}>
                    <TextInput
                        mode='outlined'
                        autoComplete={false}
                        value={field.value}
                        placeholder={props.formItem.title}
                        label={props.formItem.label || props.formItem.title}
                        error={!field.validityState.valid}
                        onChangeText={onChangeText}
                        onEndEditing={onEndEditing}
                        {...extraParams}
                    />
                    {
                        !field.validityState.valid && <FormErrorComponent errorMessage={field.validityState.errorMessage} />
                    }
                </View>
            </>
        : <></>
    );
}

const Styles = StyleSheet.create({
    formItem: {
        marginVertical: 10
    },
});
