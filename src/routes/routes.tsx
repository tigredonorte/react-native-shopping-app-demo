import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ShopNavigator } from './navigator/shop/ShopNavigator';

export const Routes = () => (
    <NavigationContainer>
        <ShopNavigator />
    </NavigationContainer>
);
