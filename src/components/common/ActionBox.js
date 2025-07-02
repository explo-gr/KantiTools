import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import TranslatedText from '../translations/TranslatedText';
import Feather from '@expo/vector-icons/Feather';
import { useThemes } from '../../context/ThemeContext';


const ActionBox = ({ onPress = () => null, icon = 'alert-circle' , label }) => {
    const { colors, defaultThemedStyles } = useThemes();

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[{
                backgroundColor: colors.blue
            }, styles.container]}
        >
            <Feather name={icon} size={32} color={colors.generic}/>
            <TranslatedText style={{
                color: colors.generic,
                fontSize: 12
            }}>
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
        borderRadius: 20,
        padding: 20,
    }
});

export default ActionBox;