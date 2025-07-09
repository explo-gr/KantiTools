// imports regarding general objects
import { createStackNavigator } from '@react-navigation/stack';
import SettingsMain from './components/MainScreen';
import SntzAccountManagement from './components/SntzAccountScreen';
import useHeaderOptions from '../../hooks/useHeaderOptions';
import useScreenOptions from '../../hooks/useScreenOptions';

const Stack = createStackNavigator();

const GradesScreen = () => {
    const headerOptions = useHeaderOptions();
    const screenOptions = useScreenOptions();

    return (
        <Stack.Navigator>
            <Stack.Screen name='SettingsMain' component={SettingsMain} options={{ headerShown: false, ...screenOptions }} />
            <Stack.Screen name='SntzAccountManagement' component={SntzAccountManagement} options={headerOptions} />
        </Stack.Navigator>
    );
}

export default GradesScreen;