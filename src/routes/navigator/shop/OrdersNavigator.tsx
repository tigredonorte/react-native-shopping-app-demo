import { createStackNavigator } from '@react-navigation/stack';
import { OrdersScreen } from '~modules/shop/screens/OrdersScreen';

import { defaultNavigatorOptions, drawerIconOptions } from '../defaults/ScreenOptions';
import { OrdersRoutes } from './OrdersNavigator.route.types';

const Stack = createStackNavigator();

export const OrdersNavigator = () => (
  <Stack.Navigator
    screenOptions={defaultNavigatorOptions}
    initialRouteName={OrdersRoutes.Orders}
  >
    <Stack.Screen
      name={OrdersRoutes.Orders}
      component={OrdersScreen}
      options={drawerIconOptions(() => ({}))}
    />
  </Stack.Navigator>
);
