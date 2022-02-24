import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { TText } from '~components/UI';

import { Styles } from './FetchState.style';

export interface FetchStateErrorInput {
    fetchDataFn: () => void; 
    errorText: string;
    btnText?: string;
}
export const FetchStateError = (props: FetchStateErrorInput) => (
    <View style={Styles.stateContainer}>
        <TText style={Styles.errorText}> {props.errorText} </TText>
        { 
        props.btnText ?
            <Button mode="contained" onPress={() => props.fetchDataFn()}>
                {props.btnText}
            </Button>: null 
        }
    </View>
);
