import { StyleSheet, View } from 'react-native';
import Divider from '../../components/common/Divider';
import TranslatedText from '../../components/translations/TranslatedText';
import { useThemes } from '../../context/ThemeContext';
import { useTranslations } from '../../context/LanguageContext';
import icons from '../../config/navicons/icons';
import Feather from '@expo/vector-icons/Feather';

const Header = ({ title, showIcon = true }) => {
    const { colors } = useThemes();
    const { t } = useTranslations()

    return (
            <View>
                <View style={styles.container}>
                    {showIcon && (
                        <Feather name={icons[title] || 'alert-circle'} size={30} color={colors.accent} style={styles.icon}/>
                    )}
                    <TranslatedText style={[{
                        color: colors.accent,
                    }, styles.text]}>
                        {t(title)}
                    </TranslatedText>
                </View>
                <Divider/>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        paddingTop: 7.5,
        flexDirection: 'row'
    },
    icon: {
        margin: 5
    },
    text: {
        fontWeight: 'bold',
        fontSize: 28,
        textAlignVertical: 'center'
    }
});

export default Header;