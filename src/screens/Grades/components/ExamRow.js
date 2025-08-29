import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemes } from '../../../context/ThemeContext';

const ExamRow = ({ exam, onPress }) => {
    const { defaultThemedStyles } = useThemes();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress(exam)}
        >
            <Text
                style={[styles.topicText, defaultThemedStyles.text]}
                numberOfLines={1}
            >
                {exam.topic}
            </Text>
            <Text
                style={[styles.gradeText, defaultThemedStyles.text]}
            >
                {exam.grade || '-'}
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
        fontSize: 16,
        maxWidth: '90%',
        overflow: 'hidden'
    },
    gradeText: {
        fontSize: 17,
        fontFamily: 'monospace',
        fontWeight: 'bold'
    }
});

export default ExamRow;