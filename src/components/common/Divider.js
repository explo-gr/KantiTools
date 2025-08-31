import { useThemes } from '../../context/ThemeContext';
import { StyleSheet, View } from 'react-native';

const Divider = ({ height = 2.8, opacity = 1.0}) => {
    const { colors } = useThemes();
    return (
        <View style={[{
            backgroundColor: colors.accent,
            height,
            opacity
        }, styles.divider]}/>
    );
};
    
const styles = StyleSheet.create({
    divider: {
        width: '100%',
        borderRadius: 1.25,
        marginVertical: 9
    }
});

export default Divider;