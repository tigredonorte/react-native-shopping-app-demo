import { IconButton } from 'react-native-paper';
import { fontSizer } from '~styles/responsiveness';
import { theme } from '~styles/theme';

export interface HeaderButtonInput {
    style?: any;
    icon: string;
    onPress: () => void;
}

export const HeaderButton: React.FunctionComponent<HeaderButtonInput> = (props: HeaderButtonInput) => {
    return (
        <IconButton
            icon={props.icon}
            style={props.style}
            color={theme.colors.primaryContrast}
            size={fontSizer('icon')}
            onPress={props.onPress}
        />
     );
}