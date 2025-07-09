import { View } from 'react-native';
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
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 5,
                    paddingTop: 7.5,
                    flexDirection: 'row'
                }}>
                    { showIcon && (
                        <Feather name={icons[title] || 'alert-circle'} size={30} color={colors.blue} style={{ margin: 5 }}/>
                    ) }
                    <TranslatedText style={{
                        fontWeight: 'bold',
                        fontSize: 28,
                        color: colors.blue,
                        textAlignVertical: 'center'
                    }}>
                        {t(title)}
                    </TranslatedText>
                </View>
                <Divider/>
            </View>
    );
};

export default Header;