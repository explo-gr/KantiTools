import { TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';
import TranslatedText from '../translations/TranslatedText';
import Feather from '@expo/vector-icons/Feather';
import { useThemes } from '../../context/ThemeContext';


const ActionBoxContainer = ({ children, height, width }) => {
    const { colors, defaultThemedStyles } = useThemes();

    return (
        <View style={[{
            height: height
        }, styles.container]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5,
        width: '100%'
    }
});

export default ActionBoxContainer;