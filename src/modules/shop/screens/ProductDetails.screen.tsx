import React from 'react';
import { useObservable } from '@ngneat/react-rxjs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { getStyle, ScreenData } from '~styles/responsiveness';

interface ProductDetailsInput extends NativeStackScreenProps<any> { } 

export const ProductDetailsScreen: React.FunctionComponent<ProductDetailsInput> = (props: ProductDetailsInput) => {
    const [ Styles ] = useObservable(getStyle(ProductDetailsStyles));
    return (
        <View style={Styles.container}>
            <Text>ProductDetails works!</Text>
        </View>
    );
};


const ProductDetailsStyles = (screenData: ScreenData) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});
