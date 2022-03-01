import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';

import { OrdersScreen } from '../screens/OrdersScreen';
import { OrdersRoutes } from './OrdersNavigator.types';

const Stack = createStackNavigator();

export const OrdersNavigator: React.FC<{ 
  defaultNavigatorOptions: StackNavigationOptions,
  drawerIconOptions: (data: any) => any,
  HeaderButton: React.FC<any>
}> = (props) => (
  <Stack.Navigator
    screenOptions={props.defaultNavigatorOptions}
    initialRouteName={OrdersRoutes.Orders}
  >
    <Stack.Screen
      name={OrdersRoutes.Orders}
      component={OrdersScreen}
      options={props.drawerIconOptions(() => ({}))}
    />
  </Stack.Navigator>
);
