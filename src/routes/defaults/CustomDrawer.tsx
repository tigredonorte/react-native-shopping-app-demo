import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { CommonActions, DrawerActions } from '@react-navigation/native';
import React from 'react';
import { Drawer } from 'react-native-paper';

/**
 * Drawer component.
 * @param props
 */
export function CustomDrawerContent(props: DrawerContentComponentProps): React.ReactElement {
  const click = ((routName: string, active: boolean) => props.navigation.dispatch({
    ...(active
      ? DrawerActions.closeDrawer()
      : CommonActions.navigate(routName)
    ),
    target: props.state.key,
  }))

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