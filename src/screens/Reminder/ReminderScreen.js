import { createStackNavigator } from '@react-navigation/stack';
import ReminderMain from './components/MainScreen';
import useScreenOptions from '../../hooks/useScreenOptions';

const Stack = createStackNavigator();

const ReminderScreen = () => {
    const screenOptions = useScreenOptions();

    return (
        <Stack.Navigator>
            <Stack.Screen name="SettingsMain" component={ReminderMain} options={{ headerShown: false, ...screenOptions }} />
        </Stack.Navigator>
    );
}

export default ReminderScreen;