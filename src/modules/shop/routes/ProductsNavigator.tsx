import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';

import { CartScreen } from '../screens/Cart.screen';
import { ProductDetailsScreen } from '../screens/ProductDetails.screen';
import { ProductOverviewScreen } from '../screens/ProductOverview.screen';
import { ProductRoutes } from './ProductsNavigator.types';

const Stack = createStackNavigator();

const cartMenuIconOption = (Element: React.FC<any>) => (props: any) => ({
  headerRight: () => (<Element icon='cart' onPress={() => props.navigation.navigate(ProductRoutes.Cart)}/>),
  headerLeft: () => <Element icon='arrow-left' onPress={() => props.navigation.goBack()}/>
})

export const ProductsNavigator: React.FC<{ 
  defaultNavigatorOptions: StackNavigationOptions,
  drawerIconOptions: (data: any) => any,
  HeaderButton: React.FC<any>
}> = (props) => (
  <Stack.Navigator
    screenOptions={props.defaultNavigatorOptions}
    initialRouteName={ProductRoutes.Home}
  >
    <Stack.Screen
      name={ProductRoutes.Home}
      component={ProductOverviewScreen}
      options={props.drawerIconOptions((data: any) => ({
        headerRight: () => (<props.HeaderButton icon='cart' onPress={() => data.navigation.navigate(ProductRoutes.Cart)}/>)
      }))}
    />
    <Stack.Screen
      name={ProductRoutes.ProductDetails}
      component={ProductDetailsScreen}
      options={cartMenuIconOption(props.HeaderButton)}
    />
    <Stack.Screen
      name={ProductRoutes.Cart}
      component={CartScreen}
    />
  </Stack.Navigator>
);
