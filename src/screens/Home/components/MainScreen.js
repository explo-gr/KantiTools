// Imports
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useThemes } from '../../../context/ThemeContext';
import ToggleSwitch from '../../../components/common/ToggleSwitch';
import Accordion from '../../../components/common/Accordion';

// Main Home Screen
const HomeMain = ({ navigation }) => {
    const { defaultThemedStyles } = useThemes();
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeMain;