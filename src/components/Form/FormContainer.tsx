import { keys, mapObjIndexed } from 'ramda';
import React, { FunctionComponent, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

import { FormItem, FormItemType } from './components/FormField';

export type FormParameters = FormItemType[];

interface FormContainerInput {
    isEditing: boolean;
    formParameters: FormParameters;
    onSave: (data: { [s: string]: any }) => void;
}

export const FormContainerComponent: FunctionComponent<FormContainerInput> = (props) => {

    const [form, setForm] = useState<FormParameters>(props.formParameters);

    const save = () => {
        // TODO if form is invalid it shouldn't call onSave output
        const out: { [s: string]: any } = {};
        form.forEach((it) => {
            out[it.key] = it.value;
        });
        props.onSave(out);
    }

    const updateFormItem = (index: number, value: any) => setForm((current: any) => {
        const temp = [ ...current ];
        temp[index] = value;
        return temp;
    });

    return (
        <ScrollView contentContainerStyle={Styles.container}>
            {
                form.map((formItem, index) => (
                    <FormItem
                        key={formItem.key}
                        isEditing={props.isEditing}
                        formItem={formItem}
                        updateFormItem={(value) => updateFormItem(index, value)}
                    />
                ))
            }
            <Button 
                onPress={save}
                labelStyle={{ fontSize: 24 }}
                mode="contained"
                icon={`content-save${props.isEditing ? '-edit' : ''}-outline`}
            > Save </Button>
        </ScrollView>
    );
};

const Styles = StyleSheet.create({
    container: {
        padding: 10,
        marginHorizontal: 10
    }
});
