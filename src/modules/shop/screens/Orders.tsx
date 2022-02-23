import React from 'react';
import { useObservable } from '@ngneat/react-rxjs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { getStyle, ScreenData } from '~styles/responsiveness';

interface OrdersInput extends NativeStackScreenProps<any> { } 

export const OrdersScreen: React.FunctionComponent<OrdersInput> = (props: OrdersInput) => {
    const [ Styles ] = useObservable(getStyle(OrdersStyles));
    return (
        <View style={Styles.container}>
            <Text>Orders works!</Text>
        </View>
    );
};

const OrdersStyles = (screenData: ScreenData) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});
