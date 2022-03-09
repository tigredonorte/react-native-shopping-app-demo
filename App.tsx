import React from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider as ReduxProvider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import env from '~environments';
import { AuthReducer } from '~modules/auth/store/auth.reducer';
import { AuthStateName } from '~modules/auth/store/auth.state';
import { CartReducer } from '~modules/shop/store/cart/cart.reducer';
import { CartStateName } from '~modules/shop/store/cart/cart.state';
import { OrdersReducer } from '~modules/shop/store/orders/orders.reducer';
import { OrdersStateName } from '~modules/shop/store/orders/orders.state';
import { ProductsReducer } from '~modules/shop/store/products/products.reducer';
import { productStateName } from '~modules/shop/store/products/products.state';
import { Routes } from '~routes/routes';
import { theme } from '~styles/theme';
import { ThemeInitilizer } from '~styles/themeInitializer';
import { NotificationService } from '~utils/notification.service';

const reducers = combineReducers({
  [productStateName]: ProductsReducer,
  [CartStateName]: CartReducer,
  [OrdersStateName]: OrdersReducer,
  [AuthStateName]: AuthReducer,
});

const store = createStore(reducers, env.production
  ? applyMiddleware(ReduxThunk)
  : composeWithDevTools(applyMiddleware(ReduxThunk))
);

/**
 * It's important on huge app to improve performance
 */
enableScreens();
NotificationService.enableOnForeground();

export default function App() {
  return (
    <ThemeInitilizer theme={theme}>
       <ReduxProvider store={store}>
          <Routes />
       </ReduxProvider>
    </ThemeInitilizer>
  );
}
