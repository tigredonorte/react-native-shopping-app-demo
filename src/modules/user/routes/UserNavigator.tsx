import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HeaderButton } from '~components/UI/src/HeaderButton.component';
import { EditProductScreen } from '~modules/user/screens/EditProduct.screen';
import { UserProductsScreen } from '~modules/user/screens/UserProducts.screen';
import { defaultNavigatorOptions, drawerIconOptions } from '~routes/defaults/ScreenOptions';

import { UserRoutes } from './UserNavigator.types';

const Stack = createStackNavigator();

const cartMenuIconOption = (title: string) => (props: any) => ({
  title,
  headerRight: () => (<HeaderButton icon='plus-circle-outline' onPress={() => props.navigation.navigate(UserRoutes.EditProduct)}/>)
})

export const AdminNavigator = () => (
  <Stack.Navigator
    screenOptions={defaultNavigatorOptions}
    initialRouteName={UserRoutes.ListProducts}
  >
    <Stack.Screen
      name={UserRoutes.ListProducts}
      component={UserProductsScreen}
      options={drawerIconOptions(cartMenuIconOption('My Products'))}
    />
    <Stack.Screen
      name={UserRoutes.EditProduct}
      component={EditProductScreen}
    />
  </Stack.Navigator>
);
