import { createStackNavigator } from "@react-navigation/stack";
import { defaultScreenOptions } from "./defaults/ScreenOptions";
import { ShopRoutes } from "./ShopNavigator.route.types";
import { ProductOverviewScreen } from "~modules/shop/screens/ProductOverview.screen";

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
    </Stack.Navigator>
);