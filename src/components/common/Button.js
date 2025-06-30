import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useThemes } from '../../context/ThemeContext';
import TranslatedText from '../translations/TranslatedText';

const CustomButton = ({ onPress, title }) => {
    const { defaultThemedStyles, colors } = useThemes();

    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <View style={[
                {
                    backgroundColor: colors.generic,
                    borderColor: colors.blue,
                },
                styles.buttonShell
            ]}>
                <TranslatedText style={{
                    color: colors.hardContrast,
                    marginHorizontal: 3
                }}>
                    {title || 'ok'}
                </TranslatedText>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonShell: {
        height: 50,
        maxWidth: 200,
        minWidth: 100,
        borderWidth: 2.5,
        borderRadius: 20,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
});

export default CustomButton;
