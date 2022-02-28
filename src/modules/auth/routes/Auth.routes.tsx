import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { AuthState } from '../helpers/AuthHelper';
import { LoginSScreen } from '../screens/Login.screen';
import { RecoverScreen } from '../screens/Recover.screen';
import { SignupScreen } from '../screens/Signup.screen';
import { AuthRoutes } from './Auth.routes.types';

const Stack = createStackNavigator();

export const AuthNavigator: React.FC<{ state: AuthState }> = (props) => (
  <Stack.Navigator initialRouteName={AuthRoutes.Login}>
    <Stack.Group screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={AuthRoutes.Login}
        component={LoginSScreen}
        options={{
          animationTypeForReplace: props.state.isSignout ? 'pop' : 'push',
        }}
      />
      <Stack.Screen
        name={AuthRoutes.Signup}
        component={SignupScreen}
      />
      <Stack.Screen
        name={AuthRoutes.Recover}
        component={RecoverScreen}
      />
    </Stack.Group>
  </Stack.Navigator>
);
