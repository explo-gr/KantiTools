import { useTranslations } from '../../../context/LanguageContext';
import { useThemes } from '../../../context/ThemeContext';
import { View, Text, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const Greeting = () => {
    const { t } = useTranslations();
    const { colors, defaultThemedStyles } = useThemes();

    const getJSX = (icon, greeting, color='#426d9e') => {
        return (
            <View style={styles.container}>
                <Text style={[{
                    color: colors.blue
                }, styles.text]}>{greeting}</Text>
                <Feather name={icon} size={28} color={color} />
            </View>
        );
    };

    const date = new Date();
    const hour = Number(date.getHours());

    const getGreeting = () => {
        const greetingRanges = [
            { condition: (h) => h <= 4 || h >= 21, icon: 'moon', key: 'hm_gr_night', color: colors.blue },
            { condition: (h) => h <= 8, icon: 'sunrise', key: 'hm_gr_morning', color: colors.orange },
            { condition: (h) => h <= 11, icon: 'sun', key: 'hm_gr_forenoon', color: colors.orange },
            { condition: (h) => h <= 12, icon: 'sun', key: 'hm_gr_midday', color: colors.yellow },
            { condition: (h) => h <= 17, icon: 'sun', key: 'hm_gr_afternoon', color: colors.yellow },
            { condition: (h) => h <= 20, icon: 'moon', key: 'hm_gr_evening', color: colors.blue },
        ];

        for (const { condition, icon, key, color } of greetingRanges) {
            console.log(`[GREETING] Checking condition for ${key}`);
            if (condition(hour)) {
                console.log(`[GREETING] Condition passed for hour: ${hour}`)
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
        gap: 8
    },
    text: {
        fontWeight: 'bold',
        fontSize: 26,
        textAlignVertical: 'center'
    }
});

export default Greeting;

// Morgen 05:00 bis 09:00
// Vormittag 09:00 bis 12:00
// Mittag 12:00 bis 13:00
// Nachmittag 13:00 bis 18:00
// Abend 18:00 bis 21:00
// Nacht 21:00 bis 05:00

// morning, morning, afternoon, evening, night

/* 
German | English | Italian | French | Spanish
Guten Morgen | Good morning | Buongiorno | Bonjour | Buenos días
Guten Vormittag | Good morning | Buongiorno | Bonjour | Buenos días
Guten Mittag | Good afternoon | Buon pomeriggio¹ | Bon après-midi¹ | Buenas tardes
Guten Nachmittag | Good afternoon | Buon pomeriggio | Bon après-midi | Buenas tardes
Guten Abend | Good evening | Buonasera | Bonsoir | Buenas noches²
Gute Nacht | Good night | Buonanotte | Bonne nuit | Buenas noches */