import { View, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import TranslatedText from '../../../components/translations/TranslatedText';
import { useThemes } from '../../../context/ThemeContext';

const CacheIndicator = () => {
    const { colors, defaultThemedStyles } = useThemes();

    return (
        <View style={styles.container}>
            <Feather name={'wifi-off'} size={22} color={colors.gray} />
            <TranslatedText
                style={[
                    defaultThemedStyles.text,
                    { color: colors.gray }
                ]}
            >
                gr_cache_indic
            </TranslatedText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 12,
        marginTop: 4,
        marginLeft: 2
    }
});

export default CacheIndicator;