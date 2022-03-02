import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { TText } from '~components/UI';

import { Styles } from './FetchState.style';

export interface FetchStateEmptyInput {
    onEmptyData?: () => void; 
    emptyText?: string;
    emptyBtnText?: string;
}

export const FetchStateEmpty: FunctionComponent<FetchStateEmptyInput> = (props) => (
    <View style={Styles.stateContainer}>
        { 
            props.emptyText &&
            <TText style={Styles.emptyText}> 
                {props.emptyText} 
            </TText>
        }
        { 
            props.emptyBtnText &&
            <Button mode="outlined" onPress={props.onEmptyData}>
                {props.emptyBtnText}
            </Button>
        }
    </View>
);
