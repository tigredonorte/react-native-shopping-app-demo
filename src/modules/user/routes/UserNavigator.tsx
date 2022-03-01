import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { HeaderButton } from '~components/UI/src/HeaderButton.component';

import { EditProductScreen } from '../screens/EditProduct.screen';
import { UserProductsScreen } from '../screens/UserProducts.screen';
import { UserRoutes } from './UserNavigator.types';

const Stack = createStackNavigator();

const cartMenuIconOption = (title: string, Element: React.FC<any>) => (props: any) => ({
  title,
  headerRight: () => (<Element icon='plus-circle-outline' onPress={() => props.navigation.navigate(UserRoutes.EditProduct)}/>)
})

export const AdminNavigator: React.FC<{ 
  defaultNavigatorOptions: StackNavigationOptions,
  drawerIconOptions: (data: any) => any,
  HeaderButton: React.FC<any>
}> = (props) => (
  <Stack.Navigator
    screenOptions={props.defaultNavigatorOptions}
    initialRouteName={UserRoutes.ListProducts}
  >
    <Stack.Screen
      name={UserRoutes.ListProducts}
      component={UserProductsScreen}
      options={props.drawerIconOptions(cartMenuIconOption('My Products', HeaderButton))}
    />
    <Stack.Screen
      name={UserRoutes.EditProduct}
      component={EditProductScreen}
    />
  </Stack.Navigator>
);
