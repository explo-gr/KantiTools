// Imports
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeMenuplan from './components/MenuplanScreen';
import HomeDetails from './components/DetailsScreen';
import HomeMain from './components/MainScreen'
import useHeaderOptions from '../../hooks/useHeaderOptions';
import useScreenOptions from '../../hooks/useScreenOptions';

// Stack Navigator
const Stack = createStackNavigator();

// Home Screen
const HomeScreen = () => {
    const headerOptions = useHeaderOptions();
    const screenOptions = useScreenOptions();

    return (
        <Stack.Navigator>
            <Stack.Screen name='HomeMain' component={HomeMain} options={{ headerShown: false, ...screenOptions }} />
            <Stack.Screen 
                name='HomeDetails' 
                component={HomeDetails} 
                options={{
                    title: 'Details',
                    animationEnabled: true,
                    ...headerOptions
                }}
            />
            <Stack.Screen 
                name='HomeMenuplan' 
                component={HomeMenuplan} 
                options={{
                    title: 'Menüplan',
                    animationEnabled: true,
                    ...headerOptions
                }}
            />
        </Stack.Navigator>
    );
};

export default HomeScreen;