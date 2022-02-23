import React from 'react';
import { useObservable } from '@ngneat/react-rxjs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { getStyle, ScreenData } from '~styles/responsiveness';

interface CartInput extends NativeStackScreenProps<any> { } 

export const CartScreen: React.FunctionComponent<CartInput> = (props: CartInput) => {
    const [ Styles ] = useObservable(getStyle(CartStyles));
    return (
        <View style={Styles.container}>
            <Text>Cart works!</Text>
        </View>
    );
};


const CartStyles = (screenData: ScreenData) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});
