import React from 'react';
import { useObservable } from '@ngneat/react-rxjs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { getStyle, ScreenData } from '~styles/responsiveness';

interface EditProductInput extends NativeStackScreenProps<any> { } 

export const EditProductScreen: React.FunctionComponent<EditProductInput> = (props: EditProductInput) => {
    const [ Styles ] = useObservable(getStyle(EditProductStyles));
    return (
        <View style={Styles.container}>
            <Text>EditProduct works!</Text>
        </View>
    );
};


const EditProductStyles = (screenData: ScreenData) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});
