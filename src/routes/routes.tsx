import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SystemNavigator } from './navigator/SystemNavigator';

export const Routes = () => (
    <NavigationContainer>
        <SystemNavigator />
    </NavigationContainer>
);
