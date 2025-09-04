import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import TranslatedText from '../../../../components/translations/TranslatedText';
import { useThemes } from '../../../../context/ThemeContext';

const CreateTodoButton = ({ onPress }) => {
    const { colors, defaultThemedStyles } = useThemes();

    return (
        <TouchableOpacity onPress={onPress} style={styles.fab}>
            <View
                style={[
                    {
                        borderColor: colors.accent,
                        backgroundColor: colors.generic,
                    },
                    styles.content,
                    defaultThemedStyles.boxshadow,
                ]}
            >
                <Feather name='plus' size={24} color={colors.hardContrast} />
                <TranslatedText style={[{ color: colors.hardContrast }, defaultThemedStyles.text]}>
                    re_create
                </TranslatedText>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        padding: 5,
        bottom: 100,
        right: '1%',
    },
    content: {
        borderWidth: 2.5,
        borderRadius: 25,
        padding: 10,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 3,
    }
});

export default CreateTodoButton;