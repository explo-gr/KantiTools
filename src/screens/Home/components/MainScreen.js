// Imports
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useThemes } from '../../../context/ThemeContext';
import ToggleSwitch from '../../../components/common/ToggleSwitch';
import Accordion from '../../../components/common/Accordion';
import ContainerView from '../../../components/common/ContainerView';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';
import { openMenuplanPDF } from '../../../lib/menuplanHelper';
import { useTranslations } from '../../../context/LanguageContext';

// Main Home Screen
const HomeMain = ({ navigation }) => {
    const { t } = useTranslations();
    const { defaultThemedStyles } = useThemes();
    const [state, setState] = useState(false);

    const handleMenuplan = async () => {
        const opened = await openMenuplanPDF();
        if (!opened) Alert.alert(t('hm_men_err'));
    }

    return (
        <ContainerView>
            <Header title={'Home'}/>
            <ToggleSwitch changeState={setState} state={state} />
            <Button title="Go to Details" onPress={() => navigation.navigate('HomeDetails')} />
            <Button title="Go to Menuplan" onPress={handleMenuplan} />
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