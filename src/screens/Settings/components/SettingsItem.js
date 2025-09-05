import { StyleSheet, Text, View } from 'react-native';

import { useTranslations } from '../../../context/LanguageContext';
import { useThemes } from '../../../context/ThemeContext';

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
        marginHorizontal: 3,
        marginVertical: 5
    },
    text: {
        fontSize: 15,
        maxWidth: '85%'
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