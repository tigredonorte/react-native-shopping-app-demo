import { DefaultTheme } from 'react-native-paper';

export const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: "#f7287b",
        primaryContrast: 'white',
        secondary: "#c717fc",
        secondaryContrast: 'white',
        transparent: 'transparent',
        transparentContrast: '#d1d1d1',
        border: '#d1d1d1',
        variation_grey: '#ddd',
        variation_light_grey: '#C3C6C6',
        very_light_grey: '#dedede',
        extra_light_grey: 'rgb(247, 247, 247)',
        medium_grey_divider: '#cacbcc',
        medium_grey: '#868e8e',
        dark_grey: '#555b5b',
        dark_greyOpacity: 'rgba(85, 91, 91, 0.14)',
        extra_dark_grey: '#2D2D2D',
        white: '#fff',
        black: '#2d2d2d',
        light_grey: '#f1f1f1',
    },
};