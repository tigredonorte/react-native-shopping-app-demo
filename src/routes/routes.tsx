import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ShopNavigator } from './navigator/ShopNavigator';

export const Routes = () => (
    <NavigationContainer>
        <ShopNavigator />
    </NavigationContainer>
);
