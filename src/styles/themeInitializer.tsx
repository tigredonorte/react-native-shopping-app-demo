import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Provider as PaperProvider } from 'react-native-paper';
import { initStyle, loadFonts } from "./style";

export const ThemeInitilizer = (props: { theme: any; children: any; }) => {
    const [ appLoaded ] = loadFonts();

    if (!appLoaded) {
        return (
            <PaperProvider theme={props.theme}>
                <View style={styles.container}>
                    <ActivityIndicator size="large" />
                </View>
            </PaperProvider>
        );
    }
    initStyle();
    return (
        <PaperProvider theme={props.theme}>
            {props.children}
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