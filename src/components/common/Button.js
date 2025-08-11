import React, { useMemo } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useThemes } from '../../context/ThemeContext';
import TranslatedText from '../translations/TranslatedText';
import Feather from '@expo/vector-icons/Feather';

const Button = ({ onPress, title, color, disabled=false, icon, style = {} }) => {
    const { defaultThemedStyles, colors, theme } = useThemes();
    if (!color) color = colors.blue;

    const themedStyles = useMemo(() => {
        const styles = StyleSheet.create({
            buttonShell: {
                height: 45,
                maxWidth: 300,
                minWidth: 100,
                borderRadius: 18,
                padding: 8,
                gap: 3,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: color ? color : colors.blue
            },
            text: {
                //color: isDark ? colors.hardContrast : colors.generic,
                color: colors.generic,
                marginHorizontal: 3,
                fontSize: 15,
                textAlign: 'center',
                fontWeight: 'bolder'
            }
        });

        return styles;
    }, [theme]);

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[{
                opacity: disabled ? 0.2 : 1.0,
                justifyContent: 'center',
                alignItems: 'center'
            }, style]}
        >
            <View style={themedStyles.buttonShell}>
                {icon && (
                    <Feather name={icon} size={20} color={colors.generic}/>
                )}
                <TranslatedText style={themedStyles.text}>
                    {title || 'ok'}
                </TranslatedText>
            </View>
        </TouchableOpacity>
    );
};

export default Button;
