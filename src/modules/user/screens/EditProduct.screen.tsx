import { useObservable } from '@ngneat/react-rxjs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getStyle, ScreenData } from '~styles/responsiveness';

import { UserRoutes, UserStackType } from '../routes';

interface EditProductInput extends NativeStackScreenProps<UserStackType, UserRoutes.EditProduct> { } 

export const EditProductScreen: React.FunctionComponent<EditProductInput> = (props) => {
    const [ Styles ] = useObservable(getStyle(EditProductStyles));

    useEffect(() => {
        const title = props.route.params?.title ? `Edit ${props.route.params.title}` : 'Add Product';
        props.navigation.setOptions({ title });
    }, []);

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
