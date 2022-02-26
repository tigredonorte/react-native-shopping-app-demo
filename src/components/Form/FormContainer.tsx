import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

import { FormItemType } from './model/FormFieldModel';
import { FormItem } from './components/FormItemComponent';
import { FormErrorComponent } from './components/ErrorComponent';

export type FormParameters = FormItemType[];

interface FormContainerInput {
    isEditing: boolean;
    formParameters: FormParameters;
    onSave: (data: { [s: string]: any }) => void;
}

interface FormItemBasic {
    value: any; 
    valid: boolean;
}
function getInitialFormStatus (form: FormParameters) {
    const status: {[s: string]: FormItemBasic} = {};
    for (const formItem of form) {
        status[formItem.key] = {
            value: formItem.value,
            valid: formItem.valid
        }
    }
    return status;
}

export const FormContainerComponent: FunctionComponent<FormContainerInput> = (props) => {

    const [valid, setValid] = useState(false);
    const [formItemStatus, setItemStatus] = useState<{[s: string]: FormItemBasic}>(
        getInitialFormStatus(props.formParameters)
    );

    const save = () => {
        if (!valid) {
            return;
        }
        const out: { [s: string]: any } = {};
        for (const key in formItemStatus) {
            const formItem = formItemStatus[key];
            out[key] = formItem.value;
        }
        setValid(true);
        props.onSave(out);
    }

    const updateFormItem = (item: FormItemType) => {
        setItemStatus((current: {[s: string]: FormItemBasic}) => {
            const newItem = {
                ...current,
                [item.key]: {
                    value: item.value,
                    valid: item.valid
                }
            }
            formIsvalid(newItem);
            return newItem;
        });
    };

    const formIsvalid = (newItem: {[s: string]: FormItemBasic}) => {
        let isValid = true;
        for (const key in newItem) {
            if (!newItem[key].valid) {
                isValid = false;
            }
        }

        if (valid !== isValid) {
            setValid(isValid);
        }
    }

    return (
        <ScrollView contentContainerStyle={Styles.container}>
            {
                props.formParameters.map((formItem) => (
                    <FormItem
                        key={formItem.key}
                        isEditing={props.isEditing}
                        formItem={formItem}
                        updateFormItem={updateFormItem}
                    />
                ))
            }
            <Button 
                onPress={save}
                labelStyle={{ fontSize: 24 }}
                mode="contained"
                disabled={!valid}
                icon={`content-save${props.isEditing ? '-edit' : ''}-outline`}
            > Save </Button>
            { 
                !valid &&
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <FormErrorComponent errorMessage='You have errors on your form'/> 
                </View>
            }
        </ScrollView>
    );
};

const Styles = StyleSheet.create({
    container: {
        padding: 10,
        marginHorizontal: 10
    }
});
