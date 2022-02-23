import React from 'react';
import { useObservable } from '@ngneat/react-rxjs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { getStyle, ScreenData } from '~styles/responsiveness';

interface UserProductsInput extends NativeStackScreenProps<any> { } 

export const UserProductsScreen: React.FunctionComponent<UserProductsInput> = (props: UserProductsInput) => {
    const [ Styles ] = useObservable(getStyle(UserProductsStyles));
    return (
        <View style={Styles.container}>
            <Text>UserProducts works!</Text>
        </View>
    );
};


const UserProductsStyles = (screenData: ScreenData) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});
