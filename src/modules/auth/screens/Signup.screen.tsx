import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SignupInput extends NativeStackScreenProps<any> { } 

export const SignupScreen: React.FunctionComponent<SignupInput> = (props: SignupInput) => {
    return (
        <View style={Styles.container}>
            <Text>Signup Screen works!</Text>
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
