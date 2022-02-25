import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const InputType: { [s: string]: { [s: string]: any} } = {
    text: {},
    textArea: {
        multiline: true,
        numberOfLines: 8
    },
    decimal: {
        keyboardType: "decimal-pad"
    }
};

export interface FormItemType {
    key: string;
    title: string;
    value?: any;
    label?: string;
    valid: boolean;
    editable: boolean;
    formType: keyof typeof InputType;
    validationFn: (value: any) => boolean;
}

export const creatFormBase = (options: Partial<FormItemType>) => ({ 
    valid: true, 
    editable: true,
    validationFn: (value: any) => true,
    ...options
}) as FormItemType;

export const FormItem = (props: {
    formItem: FormItemType;
    isEditing: boolean;
    updateFormItem: (value: any) => void;
}) => {
    const [fieldValue, setFieldValue] = useState<any>(props.formItem.value);
    const [field, setField] = useState<FormItemType>(props.formItem);

    const checkValidity = (value: any) => {
        if (props.formItem.validationFn(value)) {
            return true;
        }
        console.warn('invalid');
        return false;
    };
    const extraParams = InputType[props.formItem.formType];
    return (
        (!props.isEditing || (props.isEditing && props.formItem.editable))
            ? <View style={Styles.formItem}>
                <TextInput
                    mode='outlined'
                    autoComplete={false}
                    value={fieldValue}
                    placeholder={props.formItem.title}
                    label={props.formItem.label || props.formItem.title}
                    error={!props.formItem.valid}
                    onChangeText={(data) => {
                        setFieldValue(data);
                        setField(v => ({
                            ...v,
                            value: data,
                            valid: checkValidity(data)
                        }));
                    }}
                    onEndEditing={() => {
                        if (!field.valid) {
                            return;
                        }
                        props.updateFormItem(field);
                    }}
                    {...extraParams}
                />
            </View>
        : <></>
    );
}

const Styles = StyleSheet.create({
    formItem: {
        marginVertical: 10
    }
});
