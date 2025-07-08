import React, { useMemo } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useThemes } from '../../context/ThemeContext';
import TranslatedText from '../translations/TranslatedText';

const CustomButton = ({ onPress, title, color, disabled=false }) => {
    const { defaultThemedStyles, colors, theme } = useThemes();
    if (!color) color = colors.blue;

    const themedStyles = useMemo(() => {
        const isDark = theme === 'dark';
        const styles = StyleSheet.create({
            buttonShell: {
                height: 45,
                maxWidth: 200,
                minWidth: 100,
                borderRadius: 20,
                padding: 8,
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
                textAlign: 'center'
            }
        });

        return styles;
    }, [theme]);

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={{
                opacity: disabled ? 0.2 : 1.0,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <View style={themedStyles.buttonShell}>
                <TranslatedText style={themedStyles.text}>
                    {title || 'ok'}
                </TranslatedText>
            </View>
        </TouchableOpacity>
    );
};

export default CustomButton;
