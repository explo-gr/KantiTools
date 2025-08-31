import { useTranslations } from '../../../context/LanguageContext';
import { useThemes } from '../../../context/ThemeContext';
import { View, Text, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const Greeting = () => {
    const { t } = useTranslations();
    const { colors, } = useThemes();

    const getJSX = (icon, greeting, color='#426d9e') => {
        return (
            <View style={styles.container}>
                <Feather name={icon} size={32} color={color} />
                <Text style={[{
                    color: colors.accent
                }, styles.text]}>{greeting}</Text>
            </View>
        );
    };

    const date = new Date();
    const hour = Number(date.getHours());

    const getGreeting = () => {
        const greetingRanges = [
            { condition: (h) => h <= 4 || h >= 21, icon: 'moon', key: 'hm_gr_night', color: colors.lightblue },
            { condition: (h) => h <= 8, icon: 'sunrise', key: 'hm_gr_morning', color: colors.orange },
            { condition: (h) => h <= 11, icon: 'sun', key: 'hm_gr_forenoon', color: colors.orange },
            { condition: (h) => h <= 12, icon: 'sun', key: 'hm_gr_midday', color: colors.yellow },
            { condition: (h) => h <= 17, icon: 'sun', key: 'hm_gr_afternoon', color: colors.yellow },
            { condition: (h) => h <= 20, icon: 'moon', key: 'hm_gr_evening', color: colors.lightblue },
        ];

        for (const { condition, icon, key, color } of greetingRanges) {
            if (condition(hour)) {
                return getJSX(icon, t(key), color);
            }
        }

        return <></>;
    };

    return getGreeting();
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        margin: 10
    },
    text: {
        fontWeight: 'bold',
        fontSize: 26,
        textAlignVertical: 'center',
    }
});

export default Greeting;

/*
    Morgen 05:00 bis 09:00
    Vormittag 09:00 bis 12:00
    Mittag 12:00 bis 13:00
    Nachmittag 13:00 bis 18:00
    Abend 18:00 bis 21:00
    Nacht 21:00 bis 05:00
*/