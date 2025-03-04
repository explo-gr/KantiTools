// Necessary imports
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Import screens
import GradesScreen from './screens/GradesScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import ReminderScreen from './screens/ReminderScreen.js';
import SettingsScreen from './screens/SettingsScreen.js';

// Import context providers
import { LanguageProvider } from './context/LanguageContext.js';
import { ThemeProvider } from './context/ThemeContext.js';

// Import custom tab bar
import TabNavigator from './navigation/BottomTabNavigator.js';
import { SettingsProvider } from './context/SettingsContext.js';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <SettingsProvider>
            <ThemeProvider>
                <LanguageProvider>
                    <NavigationContainer>
                        <Tab.Navigator 
                            tabBar={(props) => <TabNavigator {...props} />} 
                            screenOptions={{ headerShown: false }}
                        >
                            <Tab.Screen name="Home" component={HomeScreen} />
                            <Tab.Screen name="Grades" component={GradesScreen} />
                            <Tab.Screen name="Reminder" component={ReminderScreen} />
                            <Tab.Screen name="Settings" component={SettingsScreen} />
                        </Tab.Navigator>
                    </NavigationContainer>
                </LanguageProvider>
            </ThemeProvider>
        </SettingsProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});