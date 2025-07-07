// Imports
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet } from 'react-native';
import { useThemes } from '../../../context/ThemeContext';
import AchievedGradeCalculator from './AchievedGradeCalculator';
import Divider from '../../../components/common/Divider';
import ContainerView from '../../../components/common/ContainerView';
import TranslatedText from '../../../components/translations/TranslatedText';

// Grade Calculation
const GradesGradeCalc = ({ route }) => {
    //const { gradeData } = route.params;
    const { defaultThemedStyles } = useThemes();

    return (
        <ContainerView style={{
            gap: 20
        }}>
            <Divider/>
            <AchievedGradeCalculator/>
        </ContainerView>
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