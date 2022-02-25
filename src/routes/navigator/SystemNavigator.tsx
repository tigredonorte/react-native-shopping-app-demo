import { createDrawerNavigator } from '@react-navigation/drawer';
import { IconButton } from 'react-native-paper';
import { OrdersNavigator, ProductRoutes, ProductsNavigator } from '~modules/shop/routes';
import { AdminNavigator } from '~modules/user/routes';

import { CustomDrawerContent } from '../defaults/CustomDrawer';
import { SystemRoutes } from './SystemNavigator.types';

const Drawer = createDrawerNavigator();

const getDrawerOptions = (title: string, icon: string) => ({
  title,
  drawerIcon: ({ size, color }: any): React.ReactNode => (<IconButton icon={icon} size={size} color={color} />)
});

export const SystemNavigator = () => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false }}
    drawerContent={(props): React.ReactElement => <CustomDrawerContent {...props} />}
    initialRouteName={ProductRoutes.Home}
  >
    <Drawer.Screen
      name={SystemRoutes.Products}
      component={ProductsNavigator}
      options={() => getDrawerOptions('Products', 'basket')}
    />
    <Drawer.Screen
      name={SystemRoutes.Orders}
      component={OrdersNavigator}
      options={() => getDrawerOptions('Orders', 'cart')}
    />
    <Drawer.Screen
      name={SystemRoutes.Admin}
      component={AdminNavigator}
      options={() => getDrawerOptions('Manage Product', 'cog-outline')}
    />
  </Drawer.Navigator>
);