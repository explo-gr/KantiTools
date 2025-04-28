// imports regarding general objects
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import GradesMain from './components/MainScreen';
import GradesDebug from './components/DebugScreen';
import GradesCalculator from './components/GradeCalculationScreen';
import GradesGradeCalculation from './components/GradeCalculationScreen';

const Stack = createStackNavigator();

const GradesScreen = () => {
    return (
    <Stack.Navigator>
        <Stack.Screen name="GradesMain" component={GradesMain} options={{ headerShown: false }} />
        <Stack.Screen name="GradesDebug" component={GradesDebug} />
        <Stack.Screen name="GradesGradeCalculation" component={GradesGradeCalculation}/>
    </Stack.Navigator>
    );
}

export default GradesScreen;