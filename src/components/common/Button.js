import { useMemo } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useThemes } from '../../context/ThemeContext';
import TranslatedText from '../translations/TranslatedText';
import Feather from '@expo/vector-icons/Feather';

const Button = ({
    onPress,
    title,
    color,
    disabled=false,
    icon,
    style = {},
}) => {
    const { colors, theme } = useThemes();
    if (!color) color = colors.blue;

    const themedStyles = useMemo(() => {
        const styles = StyleSheet.create({
            buttonShell: {
                height: 45,
                maxWidth: 200,
                minWidth: title ? 100 : 50,
                borderRadius: 18,
                paddingHorizontal: 10,
                paddingVertical: 4,
                gap: 3,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: color ? color : colors.blue
            },
            text: {
                color: colors.generic,
                marginHorizontal: 3,
                textAlignVertical: 'center',
                fontSize: 15,
                maxWidth: '90%',
                textAlign: 'center',
                fontWeight: 'bolder'
            }
        });

        return styles;
    }, [theme, color]);

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[{
                opacity: disabled ? 0.2 : 1.0,
            }, styles.centerView, style]}
        >
            <View style={themedStyles.buttonShell}>
                {icon && (
                    <View style={styles.centerView}>
                        <Feather name={icon} size={20} color={colors.generic}/>
                    </View>
                )}
                {title && (
                    <TranslatedText numberOfLines={1} style={themedStyles.text}>
                        {title}
                    </TranslatedText>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    centerView: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Button;
