import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SplashScreen } from '~styles/themeInitializer';

import { SetTokenAction } from '../store/auth.action';
import { getAuthStatus, getAuthToken } from '../store/auth.selectors';
import { AuthNavigator } from './Auth.routes';

export const AuthHandler: React.FC<any> = (props) => {

  const state = useSelector(getAuthStatus);
  const token = useSelector(getAuthToken);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async() => {
      try {
        if (!token) {
          await dispatch(SetTokenAction());
        }
      } catch (e) {
        console.log('catch error!');
        // Restoring token failed
      }
    };
    bootstrapAsync();
  }, [ token ]);

  if (state.isLoading) {
    return (<SplashScreen />);
  }

  return (!token) 
    ? <AuthNavigator isSignout={state.isSignout} />
    : props.children
}