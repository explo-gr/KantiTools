// Imports
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useThemes } from '../../../context/ThemeContext';
import ToggleSwitch from '../../../components/common/ToggleSwitch';
import Accordion from '../../../components/common/Accordion';
import ContainerView from '../../../components/common/ContainerView';
import Header from '../../../components/common/Header';

// Main Home Screen
const HomeMain = ({ navigation }) => {
    const { defaultThemedStyles } = useThemes();
    const [state, setState] = useState(false);

    return (
        <ContainerView>
            <Header title={'Home'}/>
            <ToggleSwitch changeState={setState} state={state} />
            <Button title="Go to Details" onPress={() => navigation.navigate('HomeDetails')} />
            <Button title="Go to Menuplan" onPress={() => navigation.navigate('HomeMenuplan')} />
        </ContainerView>
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