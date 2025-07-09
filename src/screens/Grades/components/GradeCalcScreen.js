// Imports
import AchievedGradeCalculator from './AchievedGradeCalculator';
import Divider from '../../../components/common/Divider';
import ContainerView from '../../../components/common/ContainerView';

// Grade Calculation
const GradesGradeCalc = ({ route }) => {
    //const { gradeData } = route.params;
    return (
        <ContainerView style={{
            gap: 20
        }}>
            <Divider/>
            <AchievedGradeCalculator/>
        </ContainerView>
    );
};

export default GradesGradeCalc;