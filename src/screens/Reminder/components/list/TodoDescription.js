import { StyleSheet, Text } from 'react-native';

import TranslatedText from '../../../../components/translations/TranslatedText';
import { useThemes } from '../../../../context/ThemeContext';

const TodoDescription = ({ description }) => {
    const { colors, defaultThemedStyles } = useThemes();

    if (description) {
        return (
            <Text style={[defaultThemedStyles.text, styles.descr]}>
                {description}
            </Text>
        );
    }

    return (
        <TranslatedText style={[defaultThemedStyles.text, { color: colors.gray }, styles.noDescr]}>
            re_no_descr
        </TranslatedText>
    );
};

const styles = StyleSheet.create({
    descr: {
        fontSize: 14.5,
        lineHeight: 18.5,
        margin: 2
    },
    noDescr: {
        margin: 2,
        fontFamily: 'Inter-Italic'
    },
});

export default TodoDescription;
