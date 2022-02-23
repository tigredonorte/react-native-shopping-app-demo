import { Image } from 'react-native';

interface LogoImageInput {
    
}

export function LogoImage(props: LogoImageInput) {
    return (
        <Image
            style={{ width: 50, height: 50 }}
            source={require('~assets/logo.png')}
        />
    );
}
