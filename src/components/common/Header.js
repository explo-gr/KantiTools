import { View } from 'react-native';
import Divider from '../../components/common/Divider';
import TranslatedText from '../../components/translations/TranslatedText';
import { useThemes } from '../../context/ThemeContext';
import { useTranslations } from '../../context/LanguageContext';

const Header = ({ title }) => {
    const { colors } = useThemes();
    const { t } = useTranslations()

    return (
            <View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 5,
                    paddingTop: 7.5,
                }}>
                    <TranslatedText style={{
                        fontWeight: 'bold',
                        fontSize: 28,
                        color: colors.blue
                    }}>
                        {t(title)}
                    </TranslatedText>
                </View>
                <Divider/>
            </View>
    );
};

export default Header;