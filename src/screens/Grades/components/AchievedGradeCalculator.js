// Imports
import { Text, View, StyleSheet, TextInput } from 'react-native';
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

    const gradeColor = useRef('#000000');

    const calculateOutput = () => {
        const _achievedScore = Number(achievedScore);
        const _maxScore = Number(maxScore);

        if (_maxScore && _achievedScore) {
            const gradeRaw = (_achievedScore / _maxScore) * 5 + 1;
            return Math.round(gradeRaw * 100) / 100;
        }

        return 1;
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
                <View style={[{
                    backgroundColor: colors.blue
                }, styles.inputContainer]}>
                    <TranslatedText style={{
                        color: colors.generic,
                        fontSize: 14
                    }}>gr_grcalc_ach</TranslatedText>
                    <TextInput
                        onChangeText={(input) => setAchievedScore(input.replace(/[^0-9.,]/g))}
                        value={achievedScore}
                        keyboardType='number-pad'
                        placeholder='---'
                        placeholderTextColor={colors.gray}
                        maxLength={5}
                        style={[{
                            color: colors.generic
                        }, styles.input]}
                    />
                </View>
                <View style={[{
                    backgroundColor: colors.blue
                }, styles.inputContainer]}>
                    <TranslatedText style={{
                        color: colors.generic,
                        fontSize: 14
                    }}>gr_grcalc_max</TranslatedText>
                    <TextInput
                        onChangeText={(input) => setMaxScore(input.replace(/[^0-9.,]/g))}
                        value={maxScore}
                        keyboardType='number-pad'
                        placeholder='---'
                        placeholderTextColor={colors.gray}
                        maxLength={5}
                        style={[{
                            color: colors.generic
                        }, styles.input]}
                    />
                </View>
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10
            }}>
                <View style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center'
                }}>
                    <Feather name="bar-chart" size={30} color={colors.hardContrast} />
                    <TranslatedText style={[{
                        fontSize: 25,
                    }, defaultThemedStyles.text]}>
                        gr_grcalc_end
                    </TranslatedText>
                </View>
                <Text style={[{
                    color: gradeColor.current
                }, styles.outputText]}>{ Number(output).toFixed(2) }</Text>
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