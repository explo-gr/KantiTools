import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useThemes } from '../../../context/ThemeContext'
import { useTranslations } from '../../../context/LanguageContext';

const Box = ({ title, highlighted, current }) => {
    const { defaultThemedStyles, colors, theme } = useThemes();
    const containerStyle = highlighted
        ?   {
                backgroundColor: colors.blue
            }
        :   {
                borderWidth: 2,
                borderColor: colors.blue 
            }

    return (
        <TouchableOpacity style={[containerStyle, styles.box]}>
            <Text style={{
                textAlignVertical: 'center',
                fontSize: 18,
                fontWeight: current ? 'bold' : 'bolder',
                color: highlighted ? colors.generic : colors.blue
            }}>{title}</Text>
        </TouchableOpacity>
    );
}

const Weekdays = () => {
    const { defaultThemedStyles, colors, theme } = useThemes();
    const { t } = useTranslations();

    const weekday_raw = new Date().getDay();
    const weekday = !weekday_raw ? 6 : weekday_raw - 1; // i hate trump

    const weekdays = [ 'MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU' ];

    return (
        <View style={styles.container}>
            {weekdays.map((key, index) => (
                <Box
                    title={t(key)}
                    highlighted={index <= weekday}
                    current={index == weekday}
                    key={key}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        margin: 1,
        borderRadius: 16,

        width: 44,
        height: 44
    }
});

export default Weekdays;