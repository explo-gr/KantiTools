import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import TranslatedText from '../translations/TranslatedText';
import Feather from '@expo/vector-icons/Feather';
import { useThemes } from '../../context/ThemeContext';

const ActionBox = ({
    onPress = () => null,
    onLongPress = () => null,
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
                backgroundColor: inverted ? colors.generic : colors.blue,
                opacity: disabled ? 0.2 : 1.0,
            }, styles.container]}
            disabled={disabled}
        >
            <Feather name={icon} size={32} color={inverted ? colors.blue : colors.generic}/>
            <TranslatedText style={[{
                color: colors.generic
            }, styles.text]}>
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
        padding: 20
    },
    text: {
        fontSize: 12
    }
});

export default ActionBox;