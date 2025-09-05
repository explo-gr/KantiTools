import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemes } from '../../../context/ThemeContext';
import { useCallback } from 'react';

const ExamRow = ({ exam, onPress }) => {
    const { defaultThemedStyles } = useThemes();

    const getGradeText = useCallback((grade) => {
        const num = Number(grade);
        return !grade || isNaN(num) 
            ? '--'
            : num.toFixed(2); 
    }, []);

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress(exam)}
        >
            <Text
                style={[defaultThemedStyles.text, styles.topicText]}
                //numberOfLines={1}
            >
                {exam.topic}
            </Text>
            <Text
                style={[defaultThemedStyles.text, styles.gradeText]}
            >
                {getGradeText(exam.grade)}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%'
    },
    topicText: {
        fontSize: 15,
        maxWidth: '80%',
        overflow: 'hidden'
    },
    gradeText: {
        fontSize: 17,
        fontFamily: 'JetBrainsMono-Medium'
    }
});

export default ExamRow;