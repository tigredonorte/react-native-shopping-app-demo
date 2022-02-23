import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider, ActivityIndicator } from 'react-native-paper';
import { enableScreens } from 'react-native-screens';
// import { Routes } from '~routes/routes';
import { theme } from '~styles/theme';
import { initStyle, loadFonts } from '~styles/style';
import { Provider as ReduxProvider } from 'react-redux';
import { TText } from '~components/TText/TText.component';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers } from 'redux';
import { env } from '~environments';
import { ProductsReducer } from '~store/products.reducer';

const reducers = combineReducers({
  products: ProductsReducer
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
        <View style={styles.container}>
          <TText>Hello World</TText>
        </View>
        {/* <Routes></Routes> */}
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