import { createStackNavigator } from '@react-navigation/stack';
import { defaultNavigatorOptions, drawerIconOptions } from '~/routes/defaults/ScreenOptions';
import { OrdersScreen } from '~modules/shop/screens/OrdersScreen';

import { OrdersRoutes } from './OrdersNavigator.types';

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
