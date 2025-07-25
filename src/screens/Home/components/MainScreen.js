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

            <View style={{
                padding: 10,
                margin: 10,
                height: 250,
                borderWidth: 3,
                borderColor: colors.blue,
                borderRadius: 25,
            }}>
                <ActionBoxContainer>
                    <ActionBox />
                    <ActionBox/>
                </ActionBoxContainer>
                <ActionBoxContainer>
                    <ActionBox/>
                    <ActionBox/>
                    <ActionBox/>
                </ActionBoxContainer>
            </View>
            {/* <ToggleSwitch changeState={setState} state={state} /> */}
            <Weekdays/>
            <Button title='Go to Menuplan' onPress={handleMenuplan} disabled={menDisabled} />
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
    rootContainer: {

    }
});

export default HomeMain;