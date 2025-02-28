// imports regarding general objects
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function ReminderScreen() {
    const { defaultThemedStyles } = useContext(ThemeContext);

    return (
        <View style={[styles.container, defaultThemedStyles.view]}>
            <Text style={defaultThemedStyles.text}>ReminderScreen</Text>
            <StatusBar style="auto" />
        </View>
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