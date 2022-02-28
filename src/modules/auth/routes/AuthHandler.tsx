import React, { useEffect, useMemo, useReducer } from 'react';
import { SplashScreen } from '~styles/themeInitializer';

import { AuthContext, AuthControlState, AuthInitialState, AuthUser } from '../helpers/AuthHelper';
import { AuthNavigator } from './Auth.routes';

export const AuthHandler: React.FunctionComponent<{}> = (props) => {
  const [ state, dispatch ] = useReducer(AuthControlState, AuthInitialState);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async() => {
      let userToken = '';

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(() => ({
    login: async(data: AuthUser) => {
      // In a production app, we need to send some data (usually username, password) to server and get a token
      // We will also need to handle errors if sign in failed
      // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
      // In the example, we'll use a dummy token

      dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    },
    logout: () => dispatch({ type: 'SIGN_OUT', token: '' }),
    signup: async(data: AuthUser) => {
      // In a production app, we need to send user data to server and get a token
      // We will also need to handle errors if sign up failed
      // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
      // In the example, we'll use a dummy token

      dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    },
  }), []);

  if (state.isLoading) {
    return (<SplashScreen />);
  }

  return (
    <AuthContext.Provider value={authContext}>
      {!state.userToken ? <AuthNavigator state={state} /> : props.children}
    </AuthContext.Provider>
  );
}