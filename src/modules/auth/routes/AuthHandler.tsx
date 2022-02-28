import React, { ReactElement, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SplashScreen } from '~styles/themeInitializer';

import { SetTokenAction } from '../store/auth.action';
import { getAuthStatus, getAuthToken } from '../store/auth.selectors';
import { AuthNavigator } from './Auth.routes';

export const AuthHandler: React.FC<{ children: ReactElement }> = (props) => {

  // const dispatch = useDispatch();
  const state = useSelector(getAuthStatus);
  const token = useSelector(getAuthToken);

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
      // dispatch(SetTokenAction());
    };

    bootstrapAsync();
  }, []);

  if (state.isLoading) {
    return (<SplashScreen />);
  }

  return (!token) 
    ? <AuthNavigator isSignout={state.isSignout} />
    : props.children
}