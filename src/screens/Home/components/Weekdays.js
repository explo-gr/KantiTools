import { StyleSheet, View, Text, TouchableOpacity, Alert, useWindowDimensions } from 'react-native';
import { useThemes } from '../../../context/ThemeContext'
import { useTranslations } from '../../../context/LanguageContext';
import { useMemo, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { useShowAlert } from '../../../hooks/useShowAlert';

const Box = ({ title, highlighted, current, onPress = () => null }) => {
    const { colors } = useThemes();
    const { width } = useWindowDimensions();

    const containerStyle = highlighted
        ?   {
                backgroundColor: colors.accent
            }
        :   {
                borderWidth: 2,
                borderColor: colors.accent 
            }


    const boxDimensions = useMemo(() => ({
        width: width / 10,
        height: width / 10,
        borderRadius: width / 30
    }), [width]);

    return (
        <TouchableOpacity style={[{
            transform: [{ scale: current ? 1.2 : 1.0 }]
        }, containerStyle, boxDimensions, styles.box]} onPress={onPress}>
            <Text style={[{
                color: highlighted ? colors.generic : colors.accent
            }, styles.boxText]}>{title}</Text>
        </TouchableOpacity>
    );
}

const Weekdays = () => {
    const showAlert = useShowAlert();
    const { t, language } = useTranslations();

    const weekday_raw = new Date().getDay();
    const weekday = !weekday_raw ? 6 : weekday_raw - 1; // the world doesn't revolve around america
    
    const weekdays = useMemo(() => ([ t('monday'), t('tuesday'), t('wednesday'), t('thursday'), t('friday'), t('saturday'), t('sunday') ]), [language]);
    
    const [ pressedIndices, setPressedIndices ] = useState([]);
    const code = useMemo(() => ([0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 0]), []);

    const handlePress = (index) => {
        const updated = [ ...pressedIndices, index ];
        setPressedIndices(updated);
        
        if (updated.length === code.length) {
            if (updated.every((e, i) => e === code[i])) {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                showAlert({
                    title: 'Klopf Klopf',
                    message: '',
                    buttons: [{ text: 'Wer ist da?', style: 'cancel' }]
                });
            } else {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            }
            setPressedIndices([]);
        } else if (updated.length > code.length) {
            setPressedIndices([]);
        }

    }

    return (
        <View style={styles.container}>
            {weekdays.map((key, index) => {
                return (
                    <Box
                        title={t(key)}
                        highlighted={index <= weekday}
                        current={index == weekday}
                        key={`box-${key}`}
                        onPress={() => handlePress(index)}
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 2
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        margin: 1
    },
    boxText: {
        textAlignVertical: 'center',
        fontSize: 14,
        fontFamily: 'Inter-Medium'
    }
});

export default Weekdays;