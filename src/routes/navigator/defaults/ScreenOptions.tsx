import { TText } from '~components/TText/TText.component';
import { i18n } from '~i18n';
import { theme } from '~styles/theme';

export const defaultScreenOptions = {
    headerStyle: {
        backgroundColor: theme.colors.primary,
    },
    headerTintColor: theme.colors.white,
    headerTitle: (data: any) => {
        let title = i18n.t(`${data.children}.HeaderTitle`);
        console.log (`${data.children}.HeaderTitle`);
        if (title === `${data.children}.HeaderTitle`) {
            title = data.children;
        }
        return (
            <TText style={{color: 'white'}}> {title}</TText>
        )
    },
};