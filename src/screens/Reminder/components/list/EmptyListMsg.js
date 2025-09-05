import { StyleSheet, View } from 'react-native';

import TranslatedText from '../../../../components/translations/TranslatedText';
import { useThemes } from '../../../../context/ThemeContext';

const EmptyListMsg = () => {
    const { colors } = useThemes();

    return (
        <View style={styles.container}>
            <TranslatedText style={[{ color: colors.gray }, styles.text]}>
                re_empty
            </TranslatedText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        fontFamily: 'Inter-Italic'
    },
});

export default EmptyListMsg;
