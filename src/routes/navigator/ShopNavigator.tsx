import { createStackNavigator } from '@react-navigation/stack';
import { CartScreen } from '~modules/shop/screens/Cart.screen';
import { ProductDetailsScreen } from '~modules/shop/screens/ProductDetails.screen';
import { ProductOverviewScreen } from '~modules/shop/screens/ProductOverview.screen';

import { defaultScreenOptions } from './defaults/ScreenOptions';
import { ShopRoutes } from './ShopNavigator.route.types';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();
export const ShopNavigator = () => (
  <Stack.Navigator
    screenOptions={defaultScreenOptions}
    initialRouteName={ShopRoutes.Home}
  >
    <Stack.Screen
      name={ShopRoutes.Home}
      component={ProductOverviewScreen}
    />
    <Stack.Screen
      name={ShopRoutes.ProductDetails}
      component={ProductDetailsScreen}
    />
    <Stack.Screen
      name={ShopRoutes.Chart}
      component={CartScreen}
    />
  </Stack.Navigator>
);