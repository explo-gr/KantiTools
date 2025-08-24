// Imports
import AchievedGradeCalculator from './AchievedGradeCalculator';
import Divider from '../../../components/common/Divider';
import ContainerView from '../../../components/common/ContainerView';
import { Pressable, Keyboard, StyleSheet } from 'react-native';

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