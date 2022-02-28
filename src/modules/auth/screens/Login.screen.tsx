import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface LoginInput extends NativeStackScreenProps<any> { } 

export const LoginSScreen: React.FunctionComponent<LoginInput> = (props) => {
    return (
        <View style={Styles.container}>
            <Text>LoginS works!</Text>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});
