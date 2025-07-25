// Imports
import { Text, View, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useThemes } from '../../../context/ThemeContext';
import ToggleSwitch from '../../../components/common/ToggleSwitch';
import ContainerView from '../../../components/common/ContainerView';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';
import { openMenuplanPDF } from '../../../lib/menuplanHelper';
import { useTranslations } from '../../../context/LanguageContext';
import Greeting from './Greeting';
import ActionBoxContainer from '../../../components/common/ActionBoxContainer';
import ActionBox from '../../../components/common/ActionBox';
import Weekdays from './Weekdays';
import Divider from '../../../components/common/Divider';

// Main Home Screen
const HomeMain = ({ navigation }) => {
    const { t } = useTranslations();
    const { defaultThemedStyles, colors } = useThemes();
    const [ state, setState ] = useState(false);
    const [ menDisabled, setMenDisabled ] = useState(false);

    const boxHeight = '25%';

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
            <View style={styles.greetSeperator}/>
            <Greeting/>
            <View style={[{
                borderColor: colors.blue,
            }, styles.abxRootContainer]}>
                <ActionBoxContainer>
                    <ActionBox
                        icon='calendar'
                        label={t('hm_ttbl')}
                    />
                    <ActionBox
                        icon='shopping-cart'
                        label={t('hm_men')}
                        disabled={menDisabled}
                        onPress={handleMenuplan}
                    />
                </ActionBoxContainer>
                <Divider/>
                <ActionBoxContainer>
                    <ActionBox/>
                    <ActionBox/>
                    <ActionBox/>
                </ActionBoxContainer>
            </View>
            {/* <ToggleSwitch changeState={setState} state={state} /> */}
            <View style={styles.greetSeperator}/>
            <View style={styles.greetSeperator}/>
            <Weekdays/>
        </ContainerView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    greetSeperator: {
        marginTop: '15%'
    },
    abxRootContainer: {
        padding: 10,
        margin: 10,
        height: 250,
        borderWidth: 3,
        borderRadius: 25
    }
});

export default HomeMain;