// Imports
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TranslatedText from '../../../../components/translations/TranslatedText';
import { useThemes } from '../../../../context/ThemeContext';
import ScoreInput from '../ScoreInput';

// Color Transition
const getGradeTint = (grade) => {
    if (grade < 1 || grade > 6) {
        return '#000000'
    }

    const red = [255, 0, 10];
    const green = [0, 200, 25];

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
                <ScoreInput 
                    labelKey='gr_grcalc_ach'
                    value={achievedScore}
                    onChangeText={setAchievedScore}
                    inputRef={achievedInputRef}
                    onPress={handleAchievFocus}
                />
                <ScoreInput 
                    labelKey='gr_grcalc_max'
                    value={maxScore}
                    onChangeText={setMaxScore}
                    inputRef={maxInputRef}
                    onPress={handleMaxFocus}
                />
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
        fontFamily: 'Inter-Medium'
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
        fontFamily: 'JetBrainsMono-Bold'
    },
});

export default AchievedGradeCalculator;