import { useThemes } from '../../../context/ThemeContext';
import { useTranslations } from '../../../context/LanguageContext';
import { View, Text, StyleSheet } from 'react-native'

const SettingsItem = ({ children, title, ...props }) => {
    const { defaultThemedStyles } = useThemes();
    const { t } = useTranslations();

    if (typeof title !== 'string') {
        console.warn('Title must be of type string');
        return null
    }

    return (
        <View style={styles.container} { ...props } >
            <View style={styles.leftview}>
                <Text style={[defaultThemedStyles.text, styles.text]}>{ t(title) }</Text>
            </View>
            <View style={styles.rightview}>
                { children }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
        margin: 4
    },
    text: {
        fontSize: 16
    },
    leftview: {
        flex: 4,
        alignContent: 'center',
        justifyContent: 'flex-start'
    },
    rightview: {
        flex: 2,
        alignContent: 'center',
        alignItems: 'flex-end'
    }
});

export default SettingsItem;