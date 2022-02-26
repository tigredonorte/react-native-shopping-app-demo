import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TText } from '~components/UI';
import { theme } from '~styles/theme';

interface FormErrorInput {
    errorMessage?: string;
} 

export const FormErrorComponent: React.FunctionComponent<FormErrorInput> = (props: FormErrorInput) => {
    return (
        <TText style={Styles.errorText}>
            {props.errorMessage}
        </TText>
    );
};

const Styles = StyleSheet.create({
    errorText: {
        color: theme.colors.error,
        fontSize: 16
    }
});
