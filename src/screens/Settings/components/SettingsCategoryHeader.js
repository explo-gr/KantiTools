import { useThemes } from '../../../context/ThemeContext';
import { useTranslations } from '../../../context/LanguageContext';
import { StyleSheet, View, Text } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Divider from '../../../components/common/Divider';

const SettingsCategoryHeader = ({ children, icon }) => {
    const { colors } = useThemes();
    const { t } = useTranslations();

    if (typeof children !== 'string') {
        console.warn('Title must be of type string');
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Feather name={icon || 'edit-2'} size={24} color={colors.blue} />
                <Text style={[{
                        color: colors.blue
                    }, styles.text]}
                >
                    { t(children) }
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        margin: 2,
        width: '100%',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 2,
        justifyContent: 'center'
    },
    textContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 28,
        marginLeft: 10,
        transform: [{translateY: -3}]
    }
});

export default SettingsCategoryHeader;