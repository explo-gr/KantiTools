// Imports
import { createStackNavigator } from '@react-navigation/stack';
import HomeMain from './components/MainScreen'
import useHeaderOptions from '../../hooks/useHeaderOptions';
import useScreenOptions from '../../hooks/useScreenOptions';

// Stack Navigator
const Stack = createStackNavigator();

// Home Screen
const HomeScreen = () => {
    const screenOptions = useScreenOptions();

    return (
        <Stack.Navigator>
            <Stack.Screen name='HomeMain' component={HomeMain} options={{ headerShown: false, ...screenOptions }} />
        </Stack.Navigator>
    );
};

export default HomeScreen;