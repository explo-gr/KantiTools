// Imports
import { Keyboard, Pressable, StyleSheet } from 'react-native';

import ContainerView from '../../../components/common/ContainerView';
import Divider from '../../../components/common/Divider';
import AchievedGradeCalculator from './calculators/AchievedGradeCalculator';

// Grade Calculation
const GradesGradeCalc = () => {
    return (
        <ContainerView style={{
            gap: 20
        }}>
            <Pressable onPress={Keyboard.dismiss} style={styles.container}>
                <Divider/>
                <AchievedGradeCalculator/>
            </Pressable>
        </ContainerView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default GradesGradeCalc;