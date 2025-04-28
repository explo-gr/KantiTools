// Imports
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeMenuplan from './components/MenuplanScreen';
import HomeDetails from './components/DetailsScreen';
import HomeMain from './components/MainScreen'

// Stack Navigator
const Stack = createStackNavigator();

// Home Screen
const HomeScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeMain" component={HomeMain} options={{ headerShown: false }} />
            <Stack.Screen 
                name="HomeDetails" 
                component={HomeDetails} 
                options={{
                    title: "Details",
                    animationEnabled: true,
                }}
            />
            <Stack.Screen 
                name="HomeMenuplan" 
                component={HomeMenuplan} 
                options={{
                    title: "Menüplan",
                    animationEnabled: true,
                }}
            />
        </Stack.Navigator>
    );
};

export default HomeScreen;