import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Styles = StyleSheet.create({
    stateContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export interface FetchStateLoadingInput {}

export const FetchStateLoading = (props: FetchStateLoadingInput) => (
    <View style={Styles.stateContainer}>
        <ActivityIndicator size="large" />
    </View>
);
