import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';

// Screens
import GradesScreen from '../../screens/Grades/GradesScreen';
import HomeScreen from '../../screens/Home/HomeScreen';
import ReminderScreen from '../../screens/Reminder/ReminderScreen';
import SettingsScreen from '../../screens/Settings/SettingsScreen';

// Tab Bar
import TabNavigator from './BottomTabNavigator';

// Theme
import { useThemes } from '../../context/ThemeContext';

const Tab = createBottomTabNavigator();

const AppTabNavigator = () => {
    const { colors, theme } = useThemes();

    const navigationTheme = useMemo(() => ({
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: colors.generic,
        },
    }), [theme]);

    return (
        <NavigationContainer theme={navigationTheme}>
            <Tab.Navigator
                tabBar={(props) => <TabNavigator {...props} />}
                screenOptions={{
                    headerShown: false,
                    animation: 'fade'
                }}
            >
                <Tab.Screen name='Home' component={HomeScreen}/>
                <Tab.Screen name='Grades' component={GradesScreen} />
                <Tab.Screen name='Reminder' component={ReminderScreen} />
                <Tab.Screen name='Settings' component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppTabNavigator;