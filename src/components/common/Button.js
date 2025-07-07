import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useThemes } from '../../context/ThemeContext';
import TranslatedText from '../translations/TranslatedText';

const CustomButton = ({ onPress, title, color, disabled=false }) => {
    const { defaultThemedStyles, colors } = useThemes();
    if (!color) color = colors.blue;

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
            <View style={[{
                backgroundColor: color
            }, styles.buttonShell]}>
                <TranslatedText style={{
                    color: colors.generic,
                    marginHorizontal: 3,
                    fontSize: 15,
                    textAlign: 'center'
                }}>
                    {title || 'ok'}
                </TranslatedText>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonShell: {
        height: 45,
        maxWidth: 200,
        minWidth: 100,
        borderRadius: 20,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default CustomButton;
