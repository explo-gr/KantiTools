// imports regarding general objects
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import GradesMain from './components/MainScreen';
import GradesDebug from './components/DebugScreen';
import GradesCalculator from './components/GradeCalculationScreen';
import GradesGradeCalculation from './components/GradeCalculationScreen';
import GradesGradeCalc from './components/GradeCalcScreen';
import GradesMinCalc from './components/MinCalcScreen';

const Stack = createStackNavigator();

const GradesScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="GradesMain" component={GradesMain} options={{ headerShown: false }} />
            <Stack.Screen name="GradesDebug" component={GradesDebug} />
            <Stack.Screen name="GradesMinCalc" component={GradesMinCalc}/>
            <Stack.Screen name="GradesGradeCalc" component={GradesGradeCalc}/>
        </Stack.Navigator>
    );
}

export default GradesScreen;