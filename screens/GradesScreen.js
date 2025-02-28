// imports regarding general objects
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function GradesScreen() {
    const { defaultThemedStyles } = useContext(ThemeContext);

    return (
        <View style={[styles.container, defaultThemedStyles.view]}>
            <Text style={defaultThemedStyles.text}>GradesScreen</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});