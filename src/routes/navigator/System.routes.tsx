import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { OrdersNavigator } from '~modules/shop/routes/OrdersNavigator';
import { ProductsNavigator } from '~modules/shop/routes/ProductsNavigator';
import { ProductRoutes } from '~modules/shop/routes/ProductsNavigator.types';
import { AdminNavigator } from '~modules/user/routes';
import { defaultNavigatorOptions, drawerIconOptions } from '../defaults/ScreenOptions';
import { CustomDrawerContent } from '../defaults/CustomDrawer';
import { SystemRoutes } from './System.routes.types';
import { HeaderButton } from '~components/UI/src/HeaderButton.component';

const Drawer = createDrawerNavigator();

const getDrawerOptions = (title: string, icon: string) => ({
  title,
  drawerIcon: ({ size, color }: any): React.ReactNode => (<IconButton icon={icon} size={size} color={color} />),
});

export const SystemNavigator = () => (
  <Drawer.Navigator
    useLegacyImplementation={false}
    screenOptions={{ headerShown: false }}
    drawerContent={(props): React.ReactElement => <CustomDrawerContent {...props} />}
    initialRouteName={ProductRoutes.Home}
  >
    <Drawer.Screen
      name={SystemRoutes.Products}
      
      options={() => getDrawerOptions('Products', 'basket')}
    >
      { 
         data => <ProductsNavigator { ...data }
          HeaderButton={HeaderButton}
          defaultNavigatorOptions={defaultNavigatorOptions}
          drawerIconOptions={drawerIconOptions}
        />
      }
    </Drawer.Screen>
    <Drawer.Screen
      name={SystemRoutes.Orders}
      options={() => getDrawerOptions('Orders', 'cart')}
    >
      { 
         data => <OrdersNavigator { ...data }
          HeaderButton={HeaderButton}
          defaultNavigatorOptions={defaultNavigatorOptions}
          drawerIconOptions={drawerIconOptions}
        />
      }
    </Drawer.Screen>
    <Drawer.Screen
      name={SystemRoutes.Admin}
      options={() => getDrawerOptions('Manage Product', 'cog-outline')}
    >
      { 
         data => <AdminNavigator { ...data }
          HeaderButton={HeaderButton}
          defaultNavigatorOptions={defaultNavigatorOptions}
          drawerIconOptions={drawerIconOptions}
        />
      }
    </Drawer.Screen>
  </Drawer.Navigator>
);
