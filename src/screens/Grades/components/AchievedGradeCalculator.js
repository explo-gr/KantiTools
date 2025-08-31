// Imports
import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { useThemes } from '../../../context/ThemeContext';
import TranslatedText from '../../../components/translations/TranslatedText';
import Feather from '@expo/vector-icons/Feather';

// Color Transition
const getGradeTint = (grade) => {
    if (grade < 1 || grade > 6) {
        return '#000000'
    }

    const red = [255, 0, 0];
    const green = [0, 200, 0];

    const t = (grade - 1) / 5;

    const r = Math.round(red[0] + (green[0] - red[0]) * t);
    const g = Math.round(red[1] + (green[1] - red[1]) * t);
    const b = Math.round(red[2] + (green[2] - red[2]) * t);

    const toHex = (value) => value.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}


// Grade Calculation
const AchievedGradeCalculator = () => {
    const { colors } = useThemes();

    const [ achievedScore, setAchievedScore ] = useState('');
    const [ maxScore, setMaxScore ] = useState('');
    const [ output, setOutput ] = useState('');

    const achievedInputRef = useRef(null);
    const maxInputRef = useRef(null);

    const gradeColor = useRef('#000000');

    const calculateOutput = () => {
        const achievedScoreNum = Number(achievedScore.replaceAll(',', '.'));
        const maxScoreNum = Number(maxScore.replaceAll(',', '.'));

        let output = 1;

        if (maxScoreNum && achievedScoreNum) {
            const gradeRaw = (achievedScoreNum / maxScoreNum) * 5 + 1;
            output = Math.round(gradeRaw * 100) / 100;
        }
        
        if (output > 6) {
            return 6;
        }

        return output;
    };

    const handleAchievFocus = (e) => {
        e.stopPropagation();
        achievedInputRef.current?.focus();
    };

    const handleMaxFocus = (e) => {
        e.stopPropagation();
        maxInputRef.current?.focus();
    };

    useEffect(() =>
        setOutput(_ => {
            const grade = calculateOutput();
            gradeColor.current = getGradeTint(grade);
            return grade;
        })
    , [achievedScore, maxScore]);

    return (
        <View style={styles.wrapper}>
            <View style={styles.row}>
                <Pressable 
                    onPress={handleAchievFocus} 
                    style={[{ backgroundColor: colors.accent }, styles.inputContainer]}
                >
                    <View style={styles.textContainer}>
                        <TranslatedText android_hyphenationFrequency={'normal'} numberOfLines={2} style={[{ color: colors.generic }, styles.label]}>
                            gr_grcalc_ach
                        </TranslatedText>
                    </View>
                    <TextInput
                        onChangeText={(input) => setAchievedScore(input.replace(/[^0-9.,]/g, ''))}
                        value={achievedScore}
                        keyboardType='number-pad'
                        placeholder='---'
                        textAlign='center'
                        placeholderTextColor={`${colors.generic}b3`}
                        cursorColor={colors.generic}
                        maxLength={5}
                        ref={achievedInputRef}
                        style={[{ color: colors.generic }, styles.input]}
                    />
                </Pressable>
                <Pressable
                    onPress={handleMaxFocus}  
                    style={[{ backgroundColor: colors.accent }, styles.inputContainer]}
                >
                    <View style={styles.textContainer}>
                        <TranslatedText android_hyphenationFrequency={'normal'} numberOfLines={2} style={[{ color: colors.generic }, styles.label]}>
                            gr_grcalc_max
                        </TranslatedText>
                    </View>
                    <TextInput
                        onChangeText={(input) => setMaxScore(input.replace(/[^0-9.,]/g, ''))}
                        value={maxScore}
                        keyboardType='number-pad'
                        placeholder='---'
                        textAlign='center'
                        placeholderTextColor={`${colors.generic}b3`}
                        cursorColor={colors.generic}
                        maxLength={5}
                        ref={maxInputRef}
                        style={[{ color: colors.generic }, styles.input]}
                    />
                </Pressable>
            </View>
            <View style={styles.resultWrapper}>
                <View style={styles.resultHeader}>
                    <Feather name='bar-chart' size={30} color={colors.accent} />
                    <TranslatedText style={[{ color: colors.accent }, styles.resultLabel]}>
                        gr_grcalc_end
                    </TranslatedText>
                </View>
                <View style={[{ borderColor: colors.accent }, styles.resultBox]}>
                    <Text style={[{ color: gradeColor.current }, styles.outputText]}>
                        { Number(output).toFixed(2) }
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        flexDirection: 'column',
        gap: 75
    },
    row: {
        flexDirection: 'row',
    },
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
    },
    input: {
        fontSize: 32,
        fontFamily: 'monospace',
        padding: 8,
        height: 64,
        textAlignVertical: 'center',
        width: '100%',
        //borderWidth: 1,
    },
    resultWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    resultHeader: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    resultLabel: {
        fontSize: 25,
    },
    resultBox: {
        borderWidth: 3.5,
        padding: 12,
        borderRadius: 28,
        maxWidth: 230,
        maxHeight: 145,
    },
    outputText: {
        fontSize: 78,
        fontFamily: 'monospace',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    outputContainer: {
        borderWidth: 3,
        borderRadius: 16,
        padding: 10,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '35%',
        width: '100%',
        //borderWidth: 1
    }
});

export default AchievedGradeCalculator;