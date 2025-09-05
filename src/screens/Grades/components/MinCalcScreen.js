// Imports
import ContainerView from '../../../components/common/ContainerView';
import Divider from '../../../components/common/Divider';
import useHideTabBarOnFocus from '../../../hooks/useHideTabBarOnFocus';
import MinimumGradeCalculator from './calculators/MinimumGradeCalculator';

// Grade Calculation
const GradesMinCalc = ({ route }) => {
    const gradeData = route.params?.gradeData;
    useHideTabBarOnFocus();

    return (
        <ContainerView>
            <Divider/>
            <MinimumGradeCalculator gradeData={gradeData} />
        </ContainerView>
    )
};

export default GradesMinCalc;