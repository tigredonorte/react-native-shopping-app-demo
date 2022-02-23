import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Provider as PaperProvider } from 'react-native-paper';
import { enableScreens } from 'react-native-screens';
import { Provider as ReduxProvider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { env } from '~environments';
import { ProductsReducer } from '~modules/shop/store/products.reducer';
import { productStateName } from '~modules/shop/store/products.state';
import { Routes } from '~routes/routes';
import { initStyle, loadFonts } from '~styles/style';
import { theme } from '~styles/theme';

const reducers = combineReducers({
  [productStateName]: ProductsReducer
});

const store = createStore(reducers, !env.production? composeWithDevTools(): undefined);

/**
 * It's important on huge app to improve performance
 */
enableScreens();

export default function App() {

  const [ appLoaded ] = loadFonts();
  if (!appLoaded) {
    return (
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      </PaperProvider>
    );
  }
  initStyle();

  return (
    <PaperProvider theme={theme}>
      <ReduxProvider store={store}>
        <Routes />
      </ReduxProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});