import { useTranslations } from "../../../context/LanguageContext";
import { useThemes } from "../../../context/ThemeContext";

const Greeting = () => {
    const { t } = useTranslations();
    const { colors } = useThemes();

    const getJSX = (icon, greeting) => {
        return (
            <><Text style={styles.title}>{greeting}<Feather name={icon} size={24} color="#426d9e" /></Text></>
        )
    };

    const date = new Date();
    const hour = Number(date.getHours());

    const getGreeting = () => {
        switch (true) {
            case (hour <= 4 || hour >= 21):
                // night
                return getJSX();
            case (hour <= 9):
                // morning
                return getJSX();
            case (hour <= 12):
                // forenoon
                return getJSX();
            case (hour <= 13):
                // midday
                return getJSX();
            case (hour <= 18):
                // afternoon
                return getJSX();
            case (hour <= 20):
                // evening
                return getJSX();
        }
    }

    return (
        <></>
    );
};

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