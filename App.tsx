import React from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider as ReduxProvider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { env } from '~environments';
import { CartReducer } from '~modules/shop/store/cart/cart.reducer';
import { CartStateName } from '~modules/shop/store/cart/cart.state';
import { OrdersReducer } from '~modules/shop/store/orders/orders.reducer';
import { OrdersStateName } from '~modules/shop/store/orders/orders.state';
import { ProductsReducer } from '~modules/shop/store/products/products.reducer';
import { productStateName } from '~modules/shop/store/products/products.state';
import { Routes } from '~routes/routes';
import { theme } from '~styles/theme';
import { ThemeInitilizer } from '~styles/themeInitializer';

const reducers = combineReducers({
  [productStateName]: ProductsReducer,
  [CartStateName]: CartReducer,
  [OrdersStateName]: OrdersReducer,
});

const store = createStore(reducers, !env.production? composeWithDevTools(): undefined);

/**
 * It's important on huge app to improve performance
 */
enableScreens();

export default function App() {
  return (
    <ThemeInitilizer theme={theme}>
       <ReduxProvider store={store}>
         <Routes />
       </ReduxProvider>
    </ThemeInitilizer>
  );
}
