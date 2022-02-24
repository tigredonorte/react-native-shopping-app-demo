import { Text } from 'react-native-paper';

export interface TTextInput {
    style?: any;
    children: any;
}

export const TText: React.FunctionComponent<TTextInput> = (props: TTextInput) => {
    return ( 
        <>
            {
                // @ts-expect-error
                <Text style={props.style}>{props.children}</Text>
            }
        </>
     );
}