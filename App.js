// Necessary imports
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Import screens
import GradesScreen from './src/screens/Grades/GradesScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import ReminderScreen from './src/screens/Reminder/ReminderScreen';
import SettingsScreen from './src/screens/Settings/SettingsScreen';

// Import context providers
import { LanguageProvider } from './src/context/LanguageContext.js';
import { ThemeProvider, useThemes } from './src/context/ThemeContext.js';

// Import custom tab bar
import TabNavigator from './src/navigation/navigators/BottomTabNavigator';
import { SettingsProvider } from './src/context/SettingsContext.js';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <SettingsProvider>
            <ThemeProvider>
                <LanguageProvider>
                    <NavigationContainer>
                        <Tab.Navigator 
                            tabBar={(props) => <TabNavigator {...props} />}
                            screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true      }}
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