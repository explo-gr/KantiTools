// Imports
import { Text, View, StyleSheet } from 'react-native';
import { useThemes } from '../../../context/ThemeContext';
import MinimumGradeCalculator from './MinimumGradeCalculator';

// Grade Calculation
const GradesMinCalc = ({ route }) => {
    //const { gradeData } = route.params;
    const { defaultThemedStyles } = useThemes();

    return (
        <View style={[styles.container, defaultThemedStyles.view]}>
            <View style={{ marginTop: 50, flex: 1 }}>
                <Text style={defaultThemedStyles.text}>Grade Calculator</Text>
                <MinimumGradeCalculator/>
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
});

export default GradesMinCalc;