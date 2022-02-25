import { Image } from 'react-native';

interface LogoImageInput {}

export const LogoImage: React.FunctionComponent<LogoImageInput> = (props) => {
    return (
        <Image
            style={{ width: 50, height: 50 }}
            source={require('~assets/logo.png')}
        />
    );
}
