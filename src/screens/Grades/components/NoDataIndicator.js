import { View, StyleSheet } from 'react-native';
import { useThemes } from '../../../context/ThemeContext';
import TranslatedText from '../../../components/translations/TranslatedText';

const NoDataIndicator = () => {
    const { colors, defaultThemedStyles } = useThemes();

    return (
        <View style={styles.container}>
            <TranslatedText
                style={[
                    defaultThemedStyles.text,
                    { color: colors.red }
                ]}
            >
                gr_data_err
            </TranslatedText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8
    }
});

export default NoDataIndicator;