import { Text, StyleSheet } from 'react-native';
import { useThemes } from '../../../../context/ThemeContext';
import TranslatedText from '../../../../components/translations/TranslatedText';

const TodoDescription = ({ description }) => {
    const { colors } = useThemes();

    if (description) {
        return (
            <Text style={[{ color: colors.hardContrast }, styles.descr]}>
                {description}
            </Text>
        );
    }

    return (
        <TranslatedText style={[{ color: colors.gray }, styles.noDescr]}>
            re_no_descr
        </TranslatedText>
    );
};

const styles = StyleSheet.create({
    descr: {
        fontSize: 14.5,
    },
    noDescr: {
        fontStyle: 'italic',
    },
});

export default TodoDescription;
