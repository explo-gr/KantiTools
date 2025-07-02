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
                    backgroundColor: colors.blue
                },
                styles.buttonShell
            ]}>
                <TranslatedText style={{
                    color: colors.generic,
                    marginHorizontal: 3,
                    fontSize: 15
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
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
});

export default CustomButton;
