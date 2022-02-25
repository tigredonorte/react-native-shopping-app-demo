import { createDrawerNavigator } from '@react-navigation/drawer';
import { IconButton } from 'react-native-paper';

import { CustomDrawerContent } from './CustomDrawer';
import { OrdersNavigator } from './OrdersNavigator';
import { ProductsNavigator } from './ProductsNavigator';
import { ProductRoutes } from './ProductsNavigator.route.types';
import { ShopRoutes } from './ShopNavigator.route.types';

const Drawer = createDrawerNavigator();

const getDrawerOptions = (title: string, icon: string) => ({
  title,
  drawerIcon: ({ size, color }: any): React.ReactNode => (<IconButton icon={icon} size={size} color={color}/>)
});

export const ShopNavigator = () => (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props): React.ReactElement => <CustomDrawerContent {...props} />}
      initialRouteName={ProductRoutes.Home}
    >
      <Drawer.Screen
        name={ShopRoutes.ProductsNavigator}
        component={ProductsNavigator}
        options={() => getDrawerOptions('Products', 'basket')}
      />
      <Drawer.Screen
        name={ShopRoutes.OrdersNavigator}
        component={OrdersNavigator}
        options={() => getDrawerOptions('Orders', 'cart')}
      />
    </Drawer.Navigator>
  );
  