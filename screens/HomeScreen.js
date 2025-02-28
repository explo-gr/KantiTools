// imports regarding general objects
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ToggleSwitch from '../components/ToggleSwitch';
import { useState } from 'react';

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function HomeScreen() {
    const { defaultThemedStyles } = useContext(ThemeContext);
    const [ state, setState ] = useState(false);

    return (
        <View style={[styles.container, defaultThemedStyles.view]}>
            <Text style={defaultThemedStyles.text}>fdasfdsajklösadjklö</Text>
            <ToggleSwitch
                changeState={setState}
                state={state}
            />
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