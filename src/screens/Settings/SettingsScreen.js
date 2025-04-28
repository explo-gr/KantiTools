// imports regarding general objects
import { createStackNavigator } from '@react-navigation/stack';
import SettingsMain from './components/MainScreen';
import SntzAccountManagement from './components/SntzAccountScreen';

const Stack = createStackNavigator();

const GradesScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SettingsMain" component={SettingsMain} options={{ headerShown: false }} />
            <Stack.Screen name="SntzAccountManagement" component={SntzAccountManagement} />
        </Stack.Navigator>
    );
}

export default GradesScreen;