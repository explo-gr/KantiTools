import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import TranslatedText from '../../../components/translations/TranslatedText';
import { useThemes } from '../../../context/ThemeContext';

const ScoreInput = ({ labelKey, value, onChangeText, inputRef, onPress }) => {
    const { colors } = useThemes();

    return (
        <Pressable 
            onPress={onPress} 
            style={[{ backgroundColor: colors.accent }, styles.inputContainer]}
        >
            <View style={styles.textContainer}>
                <TranslatedText 
                    android_hyphenationFrequency={'normal'} 
                    numberOfLines={2} 
                    style={[{ color: colors.generic }, styles.label]}
                >
                    {labelKey}
                </TranslatedText>
            </View>
            <TextInput
                onChangeText={(input) => onChangeText(input.replace(/[^0-9.,]/g, ''))}
                value={value}
                keyboardType='number-pad'
                placeholder='---'
                textAlign='center'
                placeholderTextColor={`${colors.generic}b3`}
                cursorColor={colors.generic}
                maxLength={5}
                ref={inputRef}
                style={[{ color: colors.generic }, styles.input]}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        borderRadius: 26,
        margin: 10,
        height: 120,
        width: '42%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Inter-Medium'
    },
    input: {
        fontSize: 32,
        fontFamily: 'Inter-Medium',
        padding: 8,
        height: 64,
        textAlignVertical: 'center',
        width: '100%',
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '35%',
        width: '100%',
    }
});

export default ScoreInput;