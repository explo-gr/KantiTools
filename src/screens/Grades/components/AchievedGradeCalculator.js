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
    const { defaultThemedStyles, colors } = useThemes();

    const [ achievedScore, setAchievedScore ] = useState('');
    const [ maxScore, setMaxScore ] = useState('');
    const [ output, setOutput ] = useState('');

    const achievedInputRef = useRef(null);
    const maxInputRef = useRef(null);

    const gradeColor = useRef('#000000');

    const calculateOutput = () => {
        const _achievedScore = Number(achievedScore);
        const _maxScore = Number(maxScore);

        let output = 1;

        if (_maxScore && _achievedScore) {
            const gradeRaw = (_achievedScore / _maxScore) * 5 + 1;
            output = Math.round(gradeRaw * 100) / 100;
        }
        
        if (output > 6) {
            return 6;
        }

        return output;
    };

    useEffect(() => {
        setOutput(_ => {
            const grade = calculateOutput();
            gradeColor.current = getGradeTint(grade);
            return grade;
        });

    }, [achievedScore, maxScore])

    return (
        <View style={{
            alignItems: 'center',
            flexDirection: 'column',
            gap: 80
        }}>
            <View style={{
                flexDirection: 'row',
            }}>
                <Pressable onPress={() => achievedInputRef.current?.focus()} style={[{
                    backgroundColor: colors.blue
                }, styles.inputContainer]}>
                    <TranslatedText style={{
                        color: colors.generic,
                        fontSize: 14
                    }}>gr_grcalc_ach</TranslatedText>
                    <TextInput
                        onChangeText={(input) => setAchievedScore(input.replace(/[^0-9.,]/g, ''))}
                        value={achievedScore}
                        keyboardType='number-pad'
                        placeholder='---'
                        placeholderTextColor={`${colors.generic}b3`}
                        cursorColor={colors.generic}
                        maxLength={5}
                        ref={achievedInputRef}
                        style={[{
                            color: colors.generic
                        }, styles.input]}
                    />
                </Pressable>
                <Pressable onPress={() => maxInputRef.current?.focus()}  style={[{
                    backgroundColor: colors.blue
                }, styles.inputContainer]}>
                    <TranslatedText style={{
                        color: colors.generic,
                        fontSize: 14
                    }}>gr_grcalc_max</TranslatedText>
                    <TextInput
                        onChangeText={(input) => setMaxScore(input.replace(/[^0-9.,]/g, ''))}
                        value={maxScore}
                        keyboardType='number-pad'
                        placeholder='---'
                        placeholderTextColor={`${colors.generic}b3`}
                        cursorColor={colors.generic}
                        maxLength={5}
                        ref={maxInputRef}
                        style={[{
                            color: colors.generic
                        }, styles.input]}
                    />
                </Pressable>
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
            }}>
                <View style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                }}>
                    <Feather name="bar-chart" size={30} color={colors.blue} />
                    <TranslatedText style={[{
                        fontSize: 25,
                        color: colors.blue
                    }]}>
                        gr_grcalc_end
                    </TranslatedText>
                </View>
                <View style={{
                    borderColor: colors.blue,
                    borderWidth: 3.5,
                    padding: 12,
                    borderRadius: 28,
                    maxWidth: 230,
                    maxHeight: 145,
                    backgroundColor: `${colors.blue}1a`
                }}>
                    <Text style={[{
                        color: gradeColor.current,
                    }, styles.outputText]}>
                        { Number(output).toFixed(2) }
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        borderRadius: 26,
        marginHorizontal: 10,
        width: '42%',
        padding: 10,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        fontSize: 35,
        fontFamily: 'monospace'
    },
    outputText: {
        fontSize: 82,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        //textDecorationLine: 'underline',
    },
    outputContainer: {
        borderWidth: 3,
        borderRadius: 16,
        padding: 10,
    }
});

export default AchievedGradeCalculator;