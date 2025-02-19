// imports regarding general objects
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// imports regarding navigation
import TabNavigator from './navigation/BottomTabNavigator.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation } from '@react-navigation/native'

// import regarding screens
import GradesScreen from './screens/GradesScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import ReminderScreen from './screens/ReminderScreen.js';
import SettingsScreen from './screens/SettingsScreen.js';

const BottomTabNavigator = createBottomTabNavigator({
  tabBar: (props) => <TabNavigator {...props} />,
  screens: {
    Home: HomeScreen,
    Grades: GradesScreen,
    Reminder: ReminderScreen,
    Settings: SettingsScreen
  },
});

const Navigation = createStaticNavigation(BottomTabNavigator);

export default function App() {
  return (
      <Navigation/>
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
