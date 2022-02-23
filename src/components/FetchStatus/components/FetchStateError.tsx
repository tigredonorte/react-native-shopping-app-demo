import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { TText } from '~components/TText/TText.component';

import { Styles } from './FetchState.style';

export interface FetchStateErrorInput {
    hasError: boolean;
    fetchDataFn: () => void; 
    errorText: string;
    btnText?: string;
}
export const FetchStateError = (props: FetchStateErrorInput) => {
    return props.hasError ? (
        <View style={Styles.stateContainer}>
            <TText style={Styles.errorText}> {props.errorText} </TText>
            { 
            props.btnText ?
                <Button mode="contained" onPress={() => props.fetchDataFn() }>
                    {props.btnText}
                </Button>: null 
            }
        </View>
    ) : null;
}
