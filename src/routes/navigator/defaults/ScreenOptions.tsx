import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { HeaderButton } from '~components/UI/src/HeaderButton.component';
import { theme } from '~styles/theme';

export const defaultNavigatorOptions = {
  headerStyle: {
    backgroundColor: theme.colors.primary,
  },
  headerTintColor: theme.colors.white
};

export const drawerIconOptions = (extraParams: (dt: any) => any) => (data: any) => ({
  headerLeft: () => (
    <View style={{ flexDirection: 'row' }}>
      <IconButton icon='menu' color={theme.colors.light_grey} onPress={() => {
        data.navigation.toggleDrawer();
      }} />
    </View>
  ),
  ...extraParams(data)
});