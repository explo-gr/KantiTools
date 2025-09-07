import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useThemes } from '../../context/ThemeContext';
import TranslatedText from '../translations/TranslatedText';

const ActionBox = ({
    onPress = () => null,
    onLongPress = () => null,
    useFO = false,
    icon = 'alert-circle',
    label = 'no title',
    inverted, disabled
}) => {
    const { colors } = useThemes();

    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={[{
                backgroundColor: inverted ? colors.generic : colors.accent,
                opacity: disabled ? 0.2 : 1.0
            }, styles.container]}
            disabled={disabled}
        >
            <View style={styles.iconContainer}>
                {useFO ? (<FontAwesome6 name={icon} size={32} color={inverted ? colors.accent : colors.generic}/>) : (<Feather name={icon} size={32} color={inverted ? colors.accent : colors.generic}/>)}
            </View>
            <TranslatedText 
                style={[{
                    color: colors.generic
                }, styles.text]}
                adjustsFontSizeToFit
                numberOfLines={1}
            >
                {label}
            </TranslatedText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        flexDirection: 'column',
        borderRadius: 25,
        padding: 12
    },
    text: {
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'Inter-Medium'
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ActionBox;