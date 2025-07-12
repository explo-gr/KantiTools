// Imports
import { Text, View, StyleSheet } from 'react-native';
import { useThemes } from '../../../context/ThemeContext';
import MinimumGradeCalculator from './MinimumGradeCalculator';
import ContainerView from '../../../components/common/ContainerView';
import Divider from '../../../components/common/Divider';

// Grade Calculation
const GradesMinCalc = ({ route }) => {
    //const { gradeData } = route.params;
    const { defaultThemedStyles } = useThemes();

    return (
        <ContainerView>
            <Text style={defaultThemedStyles.text}>Grade Calculator</Text>
            <Divider/>
            <MinimumGradeCalculator/>
        </ContainerView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default GradesMinCalc;