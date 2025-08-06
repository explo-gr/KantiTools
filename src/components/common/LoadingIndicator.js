import { ActivityIndicator } from 'react-native';
import { View, Text } from 'react-native';
import { useThemes } from '../../context/ThemeContext';

const LoadingIndicator = ({ status='' }) => {
    const { colors, defaultThemedStyles, theme } = useThemes();

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5
        }}>
            <ActivityIndicator size='large' color={theme === 'dark' ? colors.blue : colors.lightblue}/>
            {status && (<Text style={defaultThemedStyles.text}>{status}</Text>)}
        </View>
    );
}

export default LoadingIndicator;