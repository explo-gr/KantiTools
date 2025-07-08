// Imports
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { useRef, useState } from 'react';
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
    const [ state, setState ] = useState(false);
    const [ menDisabled, setMenDisabled ] = useState(false);

    const handleMenuplan = async () => {
        setMenDisabled(true);
        const opened = await openMenuplanPDF();
        if (!opened) {
            Alert.alert(
                t('hm_men_err'),
                t('hm_men_err_msg'),
                [
                    {
                        text: t('retry'),
                        onPress: handleMenuplan,
                    },
                    {
                        text: t('ok'),
                        style: 'cancel',
                    },
                ],
                { cancelable: true }
            );
        }
        setMenDisabled(false);
    };


    return (
        <ContainerView>
            <Header title={'Home'}/>
            <ToggleSwitch changeState={setState} state={state} />
            <Button title="Go to Details" onPress={() => navigation.navigate('HomeDetails')} />
            <Button title="Go to Menuplan" onPress={handleMenuplan} disabled={menDisabled} />
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