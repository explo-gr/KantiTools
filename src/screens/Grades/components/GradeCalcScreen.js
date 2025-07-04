// Imports
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet } from 'react-native';
import { useThemes } from '../../../context/ThemeContext';
import AchievedGradeCalculator from './AchievedGradeCalculator';
import Divider from '../../../components/common/Divider';

// Grade Calculation
const GradesGradeCalc = ({ route }) => {
    //const { gradeData } = route.params;
    const { defaultThemedStyles } = useThemes();

    return (
        <View style={[styles.container, defaultThemedStyles.view]}>
            <View style={{ marginTop: 50, flex: 1 }}>
                <Text style={defaultThemedStyles.text}>Grade Calculator</Text>
                <Divider/>
                <AchievedGradeCalculator/>
                <StatusBar style="auto" />
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

export default GradesGradeCalc;