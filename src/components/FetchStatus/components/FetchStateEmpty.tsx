import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { TText } from '~components/UI';

import { Styles } from './FetchState.style';

export interface FetchStateEmptyInput {
    onEmptyData?: () => void; 
    emptyText?: string;
    emptyBtnText?: string;
}

export const FetchStateEmpty = (props: FetchStateEmptyInput) => (
    <View style={Styles.stateContainer}>
        { 
            props.emptyText && 
            <TText style={Styles.emptyText}> 
                {props.emptyText} 
            </TText>
        }
        { 
            !props.emptyBtnText && 
            <Button mode="contained" onPress={props.onEmptyData}>
                {props.emptyBtnText}
            </Button>
        }
    </View>
);
