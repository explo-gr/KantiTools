import { ActivityIndicator, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { useThemes } from '../../context/ThemeContext';

const LoadingIndicator = ({ status='loading' }) => {
    const { colors, defaultThemedStyles, theme } = useThemes();

    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color={theme === 'dark' ? colors.blue : colors.lightblue}/>
            {status && (
                <Text style={defaultThemedStyles.text}>{status}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 5,
        gap: 5,
        flex: 1
    }
});

export default LoadingIndicator;