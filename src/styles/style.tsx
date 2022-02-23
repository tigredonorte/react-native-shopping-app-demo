import {
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    useFonts,
} from '@expo-google-fonts/lato';
import { setCustomText } from 'react-native-global-props';

import { fontSizer } from './responsiveness';
import { AppTheme } from './fonts';

export const loadFonts = () => {
    return useFonts({
        Lato_400Regular,
        Lato_700Bold,
        Lato_700Bold_Italic,
        Lato_400Regular_Italic,
    });
}

export const initStyle = () => {
    setCustomText({ 
        style: { 
          fontFamily: AppTheme.defaultFont,
          fontSize: fontSizer()
        }
    });
}
