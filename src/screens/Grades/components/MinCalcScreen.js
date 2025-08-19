// Imports
import MinimumGradeCalculator from './MinimumGradeCalculator';
import ContainerView from '../../../components/common/ContainerView';
import Divider from '../../../components/common/Divider';

// Grade Calculation
const GradesMinCalc = ({ route }) => {
    const gradeData = route.params?.gradeData;

    return (
        <ContainerView>
            <Divider/>
            <MinimumGradeCalculator gradeData={gradeData} />
        </ContainerView>
    )
};

export default GradesMinCalc;