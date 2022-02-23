import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { TText } from '~components/TText/TText.component';

import { Styles } from './FetchState.style';

export interface FetchStateEmptyInput {
    isEmpty?: boolean;
    onEmptyData?: () => void; 
    emptyText?: string;
    emptyBtnText?: string;
}
export const FetchStateEmpty = (props: FetchStateEmptyInput = { isEmpty: true }) => {
    return props.isEmpty ? (
        <View style={Styles.stateContainer}>
            { 
                props.emptyText ? 
                    <TText style={Styles.emptyText}> 
                        {props.emptyText} 
                    </TText> : null
            }
            { 
                props.emptyBtnText ?
                    <Button mode="contained" onPress={() => props.onEmptyData ? props.onEmptyData() : null }>
                        {props.emptyBtnText}
                    </Button>: null 
            }
        </View>
    ) : null;
}
