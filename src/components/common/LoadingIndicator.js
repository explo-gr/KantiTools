import { ActivityIndicator } from 'react-native';
import { View, Text } from 'react-native';
import { useThemes } from '../../context/ThemeContext';

const LoadingIndicator = ({ status='' }) => {
    const { defaultThemedStyles } = useThemes();

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5
        }}>
            <ActivityIndicator size='large' />
            {status && (<Text style={defaultThemedStyles.text}>{status}</Text>)}
        </View>
    );
}

export default LoadingIndicator;