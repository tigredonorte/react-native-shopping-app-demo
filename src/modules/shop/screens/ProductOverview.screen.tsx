import React from 'react';
import { useObservable } from '@ngneat/react-rxjs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { getStyle, ScreenData } from '~styles/responsiveness';

interface ProductOverviewInput extends NativeStackScreenProps<any> { } 

export const ProductOverviewScreen: React.FunctionComponent<ProductOverviewInput> = (props: ProductOverviewInput) => {
    const [ Styles ] = useObservable(getStyle(ProductOverviewStyles));
    return (
        <View style={Styles.container}>
            <Text>ProductOverview works!</Text>
        </View>
    );
};


const ProductOverviewStyles = (screenData: ScreenData) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});
