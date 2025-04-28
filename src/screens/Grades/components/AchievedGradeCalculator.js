// Imports
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { useThemes } from '../../../context/ThemeContext';

// Grade Calculation
const AchievedGradeCalculator = () => {
    const { defaultThemedStyles } = useThemes();

    const [ achievedScore, setAchievedScore ] = useState('');
    const [ maxScore, setMaxScore ] = useState('');
    const [ output, setOutput ] = useState('');

    const calculateOutput = () => {
        const _achievedScore = Number(achievedScore);
        const _maxScore = Number(maxScore);

        if (_maxScore) {
            const gradeRaw = (_achievedScore / _maxScore) * 5 + 1;
            return Math.round(gradeRaw * 100) / 100;
        }

        return ' ';
    };

    useEffect(() => {
        setOutput(calculateOutput());
    }, [achievedScore, maxScore])

    return (
        <View style={{
            flexDirection: 'row'
        }}>
            <TextInput
                onChangeText={(input) => setAchievedScore(input.replace(/[^0-9.,]/g))}
                value={achievedScore}
                keyboardType="decimal-pad"
                placeholder="achieved"
            />
            <TextInput
                onChangeText={(input) => setMaxScore(input.replace(/[^0-9.,]/g))}
                value={maxScore}
                keyboardType="decimal-pad"
                placeholder="max"
            />
            <Text>{ output }</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {

    }
});

export default AchievedGradeCalculator;