import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { CommonActions, DrawerActions } from '@react-navigation/native';
import React from 'react';
import { Drawer } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { logoutAction } from '~modules/auth/store/auth.action';

/**
 * Drawer component.
 * @param props
 */
export function CustomDrawerContent(props: DrawerContentComponentProps): React.ReactElement {

  const dispatch = useDispatch();
  const doLogout = () => dispatch(logoutAction());
  const click = ((routName: string, active: boolean) => {
    if (active) {
      return;
    }
    DrawerActions.closeDrawer();
    props.navigation.dispatch({
      ...(CommonActions.navigate(routName)),
      target: props.state.key,
    })
  });

  return (
      <DrawerContentScrollView>
        <Drawer.Section>
          {
            props.state.routes.map((route: any, i: number) => (
              <DrawerItem
                key={route.key}
                active={i === props.state.index}
                label={
                  props.descriptors[route.key].options.drawerLabel ??
                  props.descriptors[route.key].options.title ??
                  route.name
                }
                drawerIcon={props.descriptors[route.key].options.drawerIcon}
                click={() => click(route.name, i === props.state.index)}
              />
            ))
          }
        </Drawer.Section>
        <Drawer.Section>
          <DrawerItem
                active={false}
                label="Logout"
                drawerIcon=""
                click={doLogout}
            />
        </Drawer.Section>
      </DrawerContentScrollView>
  );
}

const DrawerItem = (props: {
  active: boolean;
  label: string;
  drawerIcon: any;
  click: () => void;
}) => {
  return (
    <Drawer.Item
      label={props.label}
      active={props.active}
      icon={props.drawerIcon}
      onPress={props.click}
    />
  );
}