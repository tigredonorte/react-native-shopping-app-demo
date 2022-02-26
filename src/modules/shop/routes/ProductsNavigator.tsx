import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HeaderButton } from '~components/UI/src/HeaderButton.component';
import { CartScreen } from '~modules/shop/screens/Cart.screen';
import { ProductDetailsScreen } from '~modules/shop/screens/ProductDetails.screen';
import { ProductOverviewScreen } from '~modules/shop/screens/ProductOverview.screen';
import { defaultNavigatorOptions, drawerIconOptions } from '~routes/defaults/ScreenOptions';

import { ProductRoutes } from './ProductsNavigator.types';

const Stack = createStackNavigator();

const cartMenuIconOption = (props: any) => ({
  headerRight: () => (<HeaderButton icon='cart' onPress={() => props.navigation.navigate(ProductRoutes.Cart)}/>),
  headerLeft: () => <HeaderButton icon='arrow-left' onPress={() => props.navigation.goBack()}/>
})

export const ProductsNavigator = () => (
  <Stack.Navigator
    screenOptions={defaultNavigatorOptions}
    initialRouteName={ProductRoutes.Home}
  >
    <Stack.Screen
      name={ProductRoutes.Home}
      component={ProductOverviewScreen}
      options={drawerIconOptions((props) => ({
        headerRight: () => (<HeaderButton icon='cart' onPress={() => props.navigation.navigate(ProductRoutes.Cart)}/>)
      }))}
    />
    <Stack.Screen
      name={ProductRoutes.ProductDetails}
      component={ProductDetailsScreen}
      options={cartMenuIconOption}
    />
    <Stack.Screen
      name={ProductRoutes.Cart}
      component={CartScreen}
    />
  </Stack.Navigator>
);
