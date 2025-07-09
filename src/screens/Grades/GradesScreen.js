// imports regarding general objects
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import GradesMain from './components/MainScreen';
import GradesGradeCalc from './components/GradeCalcScreen';
import GradesMinCalc from './components/MinCalcScreen';
import useHeaderOptions from '../../hooks/useHeaderOptions';
import { useThemes } from '../../context/ThemeContext';
import useScreenOptions from '../../hooks/useScreenOptions';
import { useTranslations } from '../../context/LanguageContext';

const Stack = createStackNavigator();

const GradesScreen = () => {
    const { t } = useTranslations();

    const headerOptions = useHeaderOptions();
    const screenOptions = useScreenOptions();

    return (
        <Stack.Navigator>
            <Stack.Screen name='GradesMain' component={GradesMain} options={{ headerShown: false, ...screenOptions }} />
            <Stack.Screen name='GradesMinCalc' component={GradesMinCalc} options={{
                title: t('gr_calcmin_f'),
                ...headerOptions
            }}/>
            <Stack.Screen name='GradesGradeCalc' component={GradesGradeCalc} options={{
                title: t('gr_calcgrade_f'),
                ...headerOptions
            }}/>
        </Stack.Navigator>
    );
}

export default GradesScreen;