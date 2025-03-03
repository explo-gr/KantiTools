// Imports
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { createStackNavigator } from '@react-navigation/stack';
import ToggleSwitch from '../components/ToggleSwitch';
import HomeMenuplan from './subscreens/home/menuplan';
import HomeDetails from './subscreens/home/details';

// Main Home Screen
const HomeMain = ({ navigation }) => {
    const { defaultThemedStyles } = useContext(ThemeContext);
    const [state, setState] = useState(false);

    return (
        <View style={[styles.container, defaultThemedStyles.view]}>
            <Text style={defaultThemedStyles.text}>Welcome to Home Screen</Text>
            <ToggleSwitch changeState={setState} state={state} />
            <Button title="Go to Details" onPress={() => navigation.navigate('HomeDetails')} />
            <Button title="Go to Menuplan" onPress={() => navigation.navigate('HomeMenuplan')} />
            <StatusBar style="auto" />
        </View>
    );
};

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

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen;